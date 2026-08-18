# Spec: Automação assíncrona de review de PR após push em branch `feature/*`

**Feature ID:** 007-automacao-review-pr-push
**Phase:** done
**Owner:** luishpcosta
**Last updated:** 2026-08-15

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those para `plan.md`.

## Problem / Motivation

Depois de um `git push` numa branch `feature/*`, o desenvolvedor precisa lembrar manualmente de
voltar à CI, checar se ela passou, e só então invocar a skill de revisão de PR (`review-pr`) — um
passo que costuma ser adiado ou esquecido, atrasando o feedback de revisão. É preciso um mecanismo
que dispare essa checagem sozinho, sem travar a sessão do desenvolvedor enquanto a CI roda, e que
avise com clareza qual dos três desfechos possíveis ocorreu (CI passou, CI falhou, ou a CI não deu
resposta a tempo) — porque cada um pede uma ação humana diferente.

Este repositório é o piloto: além de implementar a automação aqui, o objetivo secundário é deixar
documentado *como* ela funciona, para que a mesma estratégia (hook de plataforma → processo externo
assíncrono → decisão em 3 estados) possa ser replicada em outros repositórios que também usam
Claude Code.

## User Stories

- Como desenvolvedor que acabou de dar `git push` numa branch `feature/*`, quero que a checagem da
  CI e a abertura da revisão de PR aconteçam sozinhas em segundo plano, sem travar minha sessão
  atual, para poder continuar trabalhando enquanto a CI roda.
- Como desenvolvedor, quando a CI passa, quero que uma nova sessão já apareça pronta, invocando a
  skill `review-pr` sobre a PR correspondente, para não ter que lembrar de fazer isso manualmente.
- Como desenvolvedor, quando a CI falha, quero um aviso claro e imediato de que a automação de
  review **não** rodou por causa da falha — sem abrir uma sessão de revisão sobre código que ainda
  não passou na CI.
- Como desenvolvedor, quando a CI não responde dentro do tempo esperado, quero um aviso distinto de
  "falha", que deixe claro que o resultado é indeterminado (não sei se passou ou não), para
  investigar manualmente sem presumir que o código está quebrado.
- Como desenvolvedor que não quer essa automação ligada em todo repositório, quero que ela venha
  desligada por padrão e só rode nos repositórios onde eu explicitamente optar por ativá-la.
- Como mantenedor de outro repositório com Claude Code, quero uma documentação que explique a
  estratégia usada aqui (gatilho + processo externo + decisão em 3 estados) de forma genérica o
  suficiente para replicá-la no meu próprio projeto.

## Functional Requirements

- FR-1: Um `git push` bem-sucedido numa branch com prefixo `feature/` deve disparar, de forma
  assíncrona e sem bloquear a sessão em uso, uma verificação do resultado da CI para aquele push.
- FR-2: A automação deve ser desligada por padrão em qualquer repositório; só passa a agir depois
  de uma escolha explícita de habilitá-la, feita fora do versionamento do projeto (configuração
  local ao ambiente, não um arquivo commitado).
- FR-3: Quando a automação está desligada e ocorre um push em `feature/*`, nada deve interromper ou
  ficar visível para o desenvolvedor na sessão atual; deve, no entanto, ficar um registro discreto
  (não interativo) de que o push ocorreu e a automação estava desligada, para depuração futura.
- FR-4: A verificação do resultado da CI deve ser feita por repetição (polling) com limite máximo
  de tentativas e intervalo entre elas — nunca indefinidamente.
- FR-5: O resultado da verificação deve terminar em exatamente um de três estados finais,
  mutuamente exclusivos, cada um com uma ação e mensagem própria e distinguível dos outros dois:
  **CI passou**, **CI falhou**, **CI não respondeu a tempo (indeterminado)**.
- FR-6: Quando a CI passa, a automação deve abrir uma nova sessão interativa já invocando a skill de
  revisão de PR sobre a PR correspondente ao push.
- FR-7: Quando a CI falha, a automação deve abrir uma janela apenas informativa (sem nova sessão de
  revisão), deixando claro que a revisão não foi executada por causa da falha, com um link/apontamento
  para os detalhes da falha.
- FR-8: Quando a verificação atinge o limite de tentativas sem uma resposta definitiva, a automação
  deve abrir uma janela apenas informativa com uma mensagem distinta da de falha, deixando claro que
  o resultado é indeterminado (não é rejeição da CI) e que a verificação foi encerrada — sem
  retomada automática em segundo plano.
- FR-9: Cada tentativa de verificação deve ficar registrada num log persistente e legível
  posteriormente, e o conteúdo desse log deve ficar visível na janela aberta ao final do processo,
  para que o desenvolvedor consiga inspecionar o histórico do polling.
- FR-10: A automação deve funcionar tanto quando a sessão do desenvolvedor roda dentro do WSL2
  quanto quando roda em Git Bash nativo do Windows, detectando automaticamente qual dos dois
  ambientes está em uso.
- FR-11: Se nenhum dos dois ambientes suportados for identificado, a automação deve abortar antes
  de iniciar a verificação da CI, com um erro explícito — nunca falhar silenciosamente nesse caso.
- FR-12: Deve existir uma nova página de documentação no site explicando, de forma didática, como a
  estratégia funciona ponta a ponta (gatilho da plataforma → processo externo assíncrono → decisão
  em 3 estados) e orientando como replicá-la em outro repositório que use Claude Code — cobrindo o
  que muda de um repositório para outro (skill invocada, comandos de CI, ambiente) e o que é comum
  ao padrão.
- FR-13: A nova página de documentação deve seguir o sistema visual e o tom já validados no restante
  do site (sem linguagem alarmista, proposta prática) e deve ficar acessível a partir da navegação
  do site.

## Acceptance Criteria

- **AC-1** — Given uma branch `feature/*` com a automação habilitada, when ocorre um `git push`
  bem-sucedido nela, then uma verificação assíncrona da CI é disparada e a sessão atual continua
  utilizável imediatamente, sem esperar o resultado. _(satisfies FR-1)_
- **AC-2** — Given um repositório sem a variável de habilitação definida (ou definida com valor
  diferente do de "ligado"), when ocorre um push em `feature/*`, then nenhuma verificação de CI é
  disparada e nenhuma janela/sessão é aberta. _(satisfies FR-2)_
- **AC-3** — Given a automação desligada, when ocorre um push em `feature/*`, then existe depois um
  registro em arquivo (não interativo) desse push, sem qualquer interrupção visível na sessão do
  desenvolvedor. _(satisfies FR-3)_
- **AC-4** — Given a verificação em andamento, when o número de tentativas atinge o limite
  configurado sem resposta definitiva, then a verificação para e o estado final é "indeterminado",
  não "falha". _(satisfies FR-4, FR-8)_
- **AC-5** — Given uma verificação concluída, when se observa o desfecho, then ele é exatamente um
  entre CI passou / CI falhou / indeterminado, nunca mais de um e nunca nenhum. _(satisfies FR-5)_
- **AC-6** — Given a CI passou para o commit do push, when a automação conclui a verificação, then
  uma nova sessão interativa é aberta com a skill de revisão de PR já invocada sobre a PR
  correspondente. _(satisfies FR-6)_
- **AC-7** — Given a CI falhou para o commit do push, when a automação conclui a verificação, then
  uma janela informativa é aberta (sem nova sessão de revisão) com mensagem indicando falha e um
  apontamento para os detalhes. _(satisfies FR-7)_
- **AC-8** — Given a verificação atingiu o limite de tentativas sem sucesso nem falha, when a
  automação conclui, then uma janela informativa é aberta com mensagem de estado indeterminado,
  visivelmente distinta do texto usado no caso de falha. _(satisfies FR-8)_
- **AC-9** — Given qualquer desfecho da verificação, when a janela final é aberta, then o conteúdo
  do log de tentativas realizado até ali está visível nela. _(satisfies FR-9)_
- **AC-10** — Given uma sessão rodando em WSL2, when a automação dispara, then ela reconhece o
  ambiente como WSL2 automaticamente, sem configuração manual do usuário; o mesmo vale para uma
  sessão em Git Bash nativo. _(satisfies FR-10)_
- **AC-11** — Given um ambiente que não é nem WSL2 nem Git Bash reconhecível, when a automação
  dispara, then ela aborta antes de iniciar o polling, com uma mensagem de erro explícita registrada
  em log. _(satisfies FR-11)_
- **AC-12** — Given a página de documentação publicada, when o leitor a navega, then encontra a
  explicação do fluxo completo (gatilho → processo externo → 3 estados) e uma seção específica de
  "como replicar em outro repositório", incluindo o que precisa ser adaptado. _(satisfies FR-12)_
- **AC-13** — Given a nova página, when comparada às páginas existentes do site, then usa os mesmos
  tokens visuais (`src/css/custom.css`) e tom de voz, e está alcançável a partir da navegação
  (sidebar). _(satisfies FR-13)_

## Edge Cases

- Push em branch que **não** começa com `feature/` — a automação não deve reagir de forma alguma
  (nem log, nem verificação).
- Nenhum check-run é encontrado para o commit em nenhuma tentativa do polling — tratado como
  **indeterminado** (mesmo caminho do timeout), nunca como erro fatal do script nem como falha.
- Dois pushes seguidos na mesma branch `feature/*` antes do primeiro polling terminar — fora de
  escopo desta versão; cada push inicia sua própria verificação independente (ver Non-Goals).
- Push feito sem que as ferramentas externas necessárias (ex.: CLI de CI autenticada) estejam
  disponíveis no host — a automação aborta rápido com erro explícito, mesma lógica do FR-11.

## Out of Scope (Non-Goals)

- Não há deduplicação/cancelamento de uma verificação anterior quando um novo push chega na mesma
  branch antes do fim do polling anterior — cada push corre isolado.
- Não há retomada automática em segundo plano depois de um timeout — o usuário decide manualmente o
  próximo passo.
- Suporte a provedores de CI além do já usado no repositório (GitHub Actions) não está no escopo
  desta versão.
- Suporte a emuladores de terminal além dos já disponíveis no ambiente do desenvolvedor (WSL2 +
  Windows Terminal, ou Git Bash nativo) não está no escopo desta versão.
- Esta spec não altera o conteúdo/comportamento da skill `review-pr` em si — apenas a invoca.

## Open Questions

Nenhum marcador pendente — os pontos levantados na entrevista original (extração de
commit/branch/remoto, verbosidade do log quando desligado, emulador de terminal alvo, formato do
payload do hook, local do arquivo de log) foram resolvidos por investigação direta do ambiente e da
documentação oficial da plataforma antes da fase de Plan; ver `plan.md` → Key Decisions.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-15 | O hook consegue extrair `commit_sha`/branch/remoto do comando interceptado, ou o script resolve isso sozinho via `git` local? | Resolvido pelo script via `git` no `cwd` recebido do hook — o payload documentado do `PostToolUse` não expõe branch/sha/remoto diretamente, só o texto do comando e o `cwd`. |
| 2026-08-15 | "Desligado" deve ser 100% silencioso ou deixar um log discreto? | Log discreto em arquivo, sem qualquer interrupção da sessão (FR-3/AC-3). |
| 2026-08-15 | Qual emulador de terminal é o alvo real? | Windows Terminal (`wt.exe`, acessível a partir do WSL2 neste ambiente) como alvo primário, com Git Bash nativo como segundo ambiente suportado — confirmado disponível no host antes de assumir a decisão. |
| 2026-08-15 | Qual é o payload real que o hook consegue passar adiante? | Confirmado contra a documentação oficial de hooks da plataforma: `PostToolUse` em `Bash` expõe `cwd`, `tool_input.command`, `session_id`, entre outros — sem branch/sha; suporta `async`/`asyncRewake` para execução em segundo plano sem bloquear a sessão. |
