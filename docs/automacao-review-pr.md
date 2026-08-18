---
sidebar_position: 7
title: Automação — review de PR disparado por push
sidebar_label: Automação de Review de PR
---

# Automação — review de PR disparado por push

Depois de um `git push` numa branch `feature/*`, alguém precisa lembrar de voltar, checar se a CI
passou, e só então pedir a revisão do PR. Esse passo manual é o que mais atrasa o feedback de
revisão — e é fácil de esquecer. Este repositório usa um hook de plataforma agêntica para fechar esse
ciclo sozinho: ele detecta o push, acompanha a CI em segundo plano, e — dependendo do resultado —
abre uma sessão já pedindo a revisão, ou avisa que algo não deu certo. Tudo isso sem travar a sessão
de quem fez o push. A plataforma que dispara e a que faz a revisão são configuráveis — testado com
Claude Code, com um exemplo de configuração para Devin CLI também disponível.

Esta página explica como o mecanismo funciona neste repositório e como replicá-lo em outro projeto,
com qualquer plataforma agêntica compatível. A especificação completa (requisitos, decisões técnicas,
tarefas e evidência) está em `specs/007-automacao-review-pr-push/`, na raiz deste repositório.

## O padrão, em 3 peças

O mecanismo não é específico deste repositório — é um padrão genérico que se aplica a qualquer
automação que precise reagir a uma ação do desenvolvedor sem travar a sessão dele:

1. **Gatilho da plataforma** — um hook (`PostToolUse`, aqui) observa uma ferramenta específica
   (`Bash`) e filtra pelo conteúdo do comando (`git push`). O hook em si só faz um gate rápido e
   dispara o próximo passo — nunca carrega lógica pesada.
2. **Processo externo assíncrono** — a lógica de verdade roda fora da sessão do agente, em
   background (`nohup … & disown`), para não bloquear quem disparou o gatilho. Esse processo pode
   demorar minutos (esperando uma CI, por exemplo) sem custar nada à sessão original.
3. **Decisão em estados finais distintos** — o processo externo termina em um de poucos estados bem
   definidos, cada um com sua própria ação. Misturar "falhou" com "não sei" é o erro mais comum
   desse tipo de automação — os dois pedem reações humanas diferentes.

## Como funciona aqui

```
push em feature/*
       │
       ▼
 hook PostToolUse (Bash, filtro "git push")
       │  gate: branch é feature/*? automação está habilitada?
       │  (se não, para aqui — sem log se não é feature/*, log discreto se é mas está desligada)
       ▼
 processo em background: resolve repo/commit/branch via git,
 detecta o ambiente (WSL2 / Git Bash), faz long-polling da CI
       │
       ├──▶ CI passou ─────────▶ abre Git Bash na pasta da skill, já invocada na PR
       ├──▶ CI falhou ─────────▶ abre Git Bash só informativo, aponta o link da falha
       └──▶ sem resposta a tempo ▶ abre Git Bash informativo distinto — estado indeterminado,
                                    não é rejeição da CI
```

- O **hook**, registrado em `.claude/settings.json` deste repositório, aponta para um caminho **fora
  do repositório**: `~/development/tools/automate-review/hooks/post-push-review.sh` — o gate rápido.
- Todo o resto da automação — `lib.sh`, `poll-and-review.sh` (o poller), `open-terminal.sh` e os
  testes — vive nessa mesma pasta compartilhada, `~/development/tools/automate-review/hooks/`, **fora
  de qualquer repositório**. Isso não é um detalhe cosmético: é o que permite um único local por
  máquina servir vários repositórios ao mesmo tempo, cada um só precisando registrar o hook apontando
  pra lá.
- O **poller** resolve o contexto via `git`/`gh` (o payload do hook não expõe branch/commit/remoto,
  só o texto do comando e o diretório de trabalho), consulta os check-runs do commit via `gh api`, e
  decide o estado final.
- A abertura de janela é **sempre o Git Bash nativo do Windows** (`bash.exe`/MINGW64) — nunca uma aba
  de WSL2. Quando a automação roda de dentro do WSL2 (como aqui), isso exige traduzir os caminhos
  envolvidos para o formato de rede `\\wsl.localhost\<distro>\...`, já que o Git Bash nativo não
  enxerga o filesystem do WSL diretamente — é o que `to_native_path()` faz em `lib.sh`.
- A janela final **sempre abre em `~/development/tools/automate-review`** (a pasta da skill), nunca
  no repositório onde o push aconteceu — a skill fica empacotada lá em
  `.claude/skills/review-pr/`, a convenção padrão de descoberta de skills do Claude Code, então o
  `claude '/review-pr …'` disparado ali a descobre sozinho.
- Cada tentativa de polling fica registrada em `.claude/logs/pr-review-<feature>.log`, **dentro do
  repositório onde o push aconteceu** (não versionado), e o conteúdo desse log é exibido na janela
  final, antes da ação — para dar contexto de quanto tempo a CI levou e quantas tentativas foram
  feitas.

### Configuração (desligada por padrão)

A automação é configurada por um arquivo — `~/development/tools/automate-review/config.env` —
editável diretamente, sem precisar exportar nada no shell. `hooks/lib.sh` carrega esse arquivo
automaticamente sempre que qualquer script da automação roda. Se uma variável já estiver exportada
no ambiente de quem chamou o script, ela vence sobre o valor do arquivo — útil para um override
pontual de teste sem editar o arquivo.

A automação só age se `AGENT_PR_REVIEW_ENABLED=true` estiver no `config.env` (ou exportada). As
demais variáveis têm default e são opcionais:

| Variável | Default | Papel |
|---|---|---|
| `AGENT_PR_REVIEW_ENABLED` | `false` | Liga/desliga a automação |
| `AGENT_PR_REVIEW_POLL_INTERVAL_SEC` | `30` | Intervalo entre tentativas de polling |
| `AGENT_PR_REVIEW_POLL_MAX_ATTEMPTS` | `20` | Tentativas antes de declarar estado indeterminado |
| `AGENT_PR_REVIEW_SKILL_PATH` | `~/development/tools/automate-review` | Pasta onde a janela final abre (skill incluída) |
| `AGENT_PR_REVIEW_TERMINAL_CMD` | `('C:\Program Files\Git\usr\bin\bash.exe' -i -l)` | Programa + flags do terminal, como **array bash** (não string) — troque para usar outro terminal/shell compatível com bash |
| `AGENT_PR_REVIEW_PLATFORM_CMD` | `(claude '/review-pr faça revisão ... {pr_url} ...')` | Programa + prompt da plataforma agêntica a invocar no estado SUCCESS, também um **array bash** — troque para usar Devin CLI ou outra |

### Outra plataforma além de Claude Code (ex.: Devin CLI)

`post-push-review.sh` não assume nada específico de uma plataforma: ele confere ele mesmo, pelo texto
do comando recebido no payload do hook, se é um `git push` — não depende só do filtro da plataforma
(o Claude Code filtra por conteúdo via `if`; o matcher do Devin CLI, por exemplo, só filtra por nome
da ferramenta). Um exemplo pronto de hook para Devin CLI
(`~/development/tools/automate-review/examples/devin-hooks.json`) e a explicação completa do que está
confirmado/não confirmado sobre a compatibilidade ficam no `README.md` dessa pasta.

Um exemplo pronto de `.claude/settings.json` (o bloco `hooks.PostToolUse` para copiar num novo
repositório) e a documentação completa de cada variável ficam em
`~/development/tools/automate-review/README.md` — fora deste repositório, já que vive num local
compartilhado por máquina, não por repositório de aplicação.

## Como replicar em outro repositório

A pasta `~/development/tools/automate-review/` já é o local compartilhado — não precisa copiar nada
por repositório, só apontar pra ela:

1. **Instale (uma vez por máquina).** `~/development/tools/automate-review/hooks/` não tem
   dependência do conteúdo de nenhum repositório específico — só de `git`, `gh` e bash. Se ainda não
   existe nesta máquina, copie de outro repositório que já a use — incluindo o `config.env` na raiz
   de `automate-review/`, que é o único lugar que precisa de ajuste manual por máquina (ex.: caminho
   do Git Bash instalado, se for diferente do default).
2. **Registre o hook no novo repositório.** Copie
   `~/development/tools/automate-review/examples/claude-settings.json` (ou o bloco `hooks.PostToolUse`
   de `.claude/settings.json` deste repositório) para o `.claude/settings.json` do novo projeto — o
   `command` já aponta para o caminho compartilhado (`$HOME/development/tools/automate-review/hooks/post-push-review.sh`),
   não precisa de ajuste por repositório.
3. **Troque o que é específico da skill, se for o caso.** `poll-and-review.sh` monta
   `claude '/review-pr …'` no estado de sucesso — se outro repositório quiser uma skill diferente,
   é a única mudança de código necessária (afeta todos os repositórios que apontam pra esse mesmo
   local compartilhado, então avalie se cada projeto precisa de uma pasta `automate-review` própria
   ou se todos usam a mesma skill).
4. **Confirme que a CI do novo repositório expõe check-runs via a API do GitHub** (`gh api
   repos/{owner}/{repo}/commits/{sha}/check-runs`) — é o único requisito do lado da CI; qualquer
   workflow do GitHub Actions já satisfaz isso.
5. **Ajuste o filtro do gatilho, se necessário.** Aqui o filtro é `feature/*` (`is_feature_branch()`
   em `lib.sh`); troque a condição se o seu fluxo usa outro prefixo de branch.
6. **Mantenha a automação desligada por padrão.** Não versione a variável de habilitação — cada
   pessoa que quiser usar a automação a liga no seu próprio ambiente.

## O que fica de fora, por decisão

- Não há suporte a outro provedor de CI além do GitHub Actions (via `gh api`) nesta versão.
- O terminal final é sempre o Git Bash nativo do Windows — não há suporte a outro emulador
  (Windows Terminal abrindo uma aba de WSL2, ConEmu, Alacritty, etc.) nesta versão.
- Um novo push na mesma branch não cancela um polling anterior ainda em andamento — cada push corre
  isolado.
- Um timeout não é retomado automaticamente — a pessoa decide o próximo passo manualmente.

Essas decisões (e o raciocínio por trás de cada uma) estão detalhadas em
`specs/007-automacao-review-pr-push/plan.md`.
