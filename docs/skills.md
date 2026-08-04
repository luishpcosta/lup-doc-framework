---
sidebar_position: 6
title: Skills do framework
---

# Skills do framework

Os dois guias práticos mostram *como* usar as skills dentro de um fluxo de trabalho. Esta página é diferente: é uma referência técnica por skill — o que cada uma produz, como funciona por dentro, e os erros mais comuns. Use-a para decidir se uma skill resolve o seu problema antes de instalar, ou para lembrar rápido o que uma skill específica faz.

## Instalação

As skills vivem no repositório [ai-lup-skills](https://github.com/luishpcosta/ai-lup-skills), no GitHub. Instale qualquer uma delas no seu projeto com:

```
lup-skills add <nome-da-skill>
```

O CLI pergunta para quais agentes instalar (Claude, Devin, ou ambos) e copia a skill para `.claude/skills/<nome>/` e/ou `.agents/skills/<nome>/`.

## Skills do repositório de aplicação

Usadas no dia a dia de um repositório de serviço/código — ver o [guia de repositório de aplicação](./guia-agentes-ia-app.md).

### `/sdd-harness-creator`

Monta o harness de desenvolvimento orientado por especificação (SDD) num repositório: `constitution.md`, `spec.md`/`plan.md`/`tasks.md` por feature, gates de fase, rastreabilidade de critério de aceite.

**Uso básico**

```
/sdd-harness-creator faça a engenharia reversa deste repositório e monte
o harness SDD
```

Gera o harness completo a partir do código existente.

<details>
<summary>Formato de saída</summary>

Arquivos: `AGENTS.md`/`CLAUDE.md`, `constitution.md`, `specs/NNN-slug/{spec,plan,tasks}.md`, `progress.md`, `init.sh`. Sem saída alternativa em JSON.

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Roda uma vez por repositório — a autoria de spec/plan/tasks por feature acontece depois, dentro do próprio repo, seguindo o `AGENTS.md` gerado.
2. O fluxo tem 6 fases (Specify → Clarify → Plan → Tasks → Implement → Verify), cada uma com gate explícito antes de avançar.
3. Em brownfield, varre os módulos-fonte e deriva critérios de aceite a partir de testes existentes (ou símbolos exportados, se não houver teste), marcando as specs geradas como `**Origin:** reverse-engineered`.

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| Overwrite indesejado de harness existente | Reexecução sobrescrevendo sem confirmação | Só sobrescrever depois de confirmar explicitamente com quem está pedindo |
| Specs retro-geradas descrevem comportamento errado | A engenharia reversa captura o comportamento *atual*, não o *intencional* | Revisar cada spec retro-gerada manualmente antes de aceitá-la como base |

</details>

### `/codefy`

Ponto de entrada estável para modelagem de domínio num repositório de aplicação — nunca modela por conta própria, sempre repassa para o `/blueprintfy`, preparando o terreno ao ler as convenções que o repositório já usa.

**Uso básico**

```
/codefy analise minhas docs em docs/adr/ e specs/ e faça o mapeamento do
contexto: identifique decisões técnicas que ainda não estão refletidas em
nenhuma spec e liste-as como specs pendentes.
```

Mapeia decisões que ainda não viraram spec e regras que o código já segue mas não estão documentadas.

<details>
<summary>Formato de saída</summary>

Não aplicável diretamente — os arquivos (`CONTEXT-MAP.md`, `CONTEXT.md`, ADRs) são gerados pelo `/blueprintfy`, que o `/codefy` aciona.

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Garante que o `/blueprintfy` está instalado; se não estiver, instala sozinho (com confirmação antes) a partir do catálogo de skills.
2. Sem `CONTEXT-MAP.md`: varre o repositório por sinais de convenção (onde vivem specs/PRDs/ADRs, idioma, formato de ID) antes de repassar ao bootstrap do `/blueprintfy` — chega com uma hipótese pronta em vez de perguntar às cegas.
3. Com `CONTEXT-MAP.md` já existente: repassa direto para a sessão contínua do `/blueprintfy`, sem repetir a varredura.
4. Nunca substitui a entrevista do `/blueprintfy` nem pula uma pergunta do checklist dele.

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| Skill trava sem `/blueprintfy` instalado | Instalação automática recusada | Sem a instalação real, o `/codefy` não segue adiante — nunca reproduz o comportamento do `/blueprintfy` de memória |
| Instalação automática sobrescreve pasta existente | Destino já existia | O processo para e avisa, em vez de sobrescrever |

</details>

### `/review-pr`

Revisão de código completa (Angular, Go, TypeScript, Python, Java, C#/.NET) — bugs, arquitetura, performance e segurança — com feedback priorizado por severidade, publicável direto no GitHub.

**Uso básico**

```
Revise o PR #482 com foco em segurança.
```

Aciona mesmo sem citar "code review" explicitamente — retorna uma revisão estruturada, e pergunta antes de publicar no GitHub.

<details>
<summary>Formato de saída</summary>

Revisão estruturada em markdown, com marcadores de severidade `[bloqueante]`/`[importante]`/`[nit]` (e não bloqueantes `[sugestão]`/`[aprendizado]`/`[elogio]`); opcionalmente publicada como revisão no GitHub via `gh` CLI, nunca comentário a comentário.

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Coleta de contexto (tamanho do PR, CI) → revisão de alto nível (arquitetura, performance) → revisão linha a linha (lógica, segurança, manutenibilidade) → resumo e decisão → publicação opcional.
2. Para diffs grandes, tria a complexidade antes de ler o código linha a linha.
3. Não revisa manualmente o que um linter já cobre (formatação, imports) — foca em lógica, arquitetura e segurança.
4. Publicação no GitHub só acontece depois de aprovação explícita de quem pediu a revisão.

</details>

## Skills do repositório de contexto

Usadas no dia a dia do metarepo documental (PB, PRD, ADR, mapa de domínio) — ver o [guia de repositório de contexto](./guia-repositorio-contexto.md).

### `/blueprintfy`

Constrói e afia o modelo de domínio de um projeto: entrevista implacável para estressar plano/design, glossário da linguagem onipresente e ADRs, num fluxo contínuo — cobre também o bootstrap inicial de um repositório sem `CONTEXT-MAP.md`.

**Uso básico**

```
/blueprintfy isso é uma Order ou uma Invoice mesmo? Vamos estressar essa decisão.
```

Estressa a decisão contra o modelo de domínio já registrado, com resposta recomendada a cada pergunta.

<details>
<summary>Formato de saída</summary>

Arquivos markdown: `CONTEXT-MAP.md` (raiz), `CONTEXT.md` por contexto (com seção `## Linguagem`), ADRs em `adr/ADR-<id>-titulo.md` com front matter de relação (`contextos`/`afeta`/`supera`/`depende_de`); opcionalmente aciona `/make-diagram` para gerar o PNG da decisão.

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Dois modos: bootstrap inicial (checklist de 3 perguntas: já existem docs de negócio? já existem ADRs? há múltiplos domínios?) e sessão contínua (entrevista uma pergunta por vez, sempre com resposta recomendada).
2. `CONTEXT-MAP.md` é o único ponto de entrada de navegação — documentos fora do mapa não existem para o modelo.
3. Usa um script de consulta ao grafo de dependências (derivado do front matter dos documentos) para checar decisões vigentes e impacto, em vez de reler todas as ADRs à mão.
4. Só propõe criar uma ADR quando a decisão é difícil de reverter, surpreendente sem contexto, e resultado de um trade-off real.

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| Grafo retorna vazio mesmo havendo tensões reais | Repositório brownfield sem front matter nos documentos | Grafo vazio não é o mesmo que "sem tensões" — ler as ADRs diretamente antes de concluir |
| `CONTEXT.md` criado sem o `CONTEXT-MAP.md` referenciar | Documento criado fora do gate de criação | `CONTEXT.md` e a entrada no mapa nascem juntos — nunca um sem o outro |
| ADR antiga editada por engano ao ser superada | Confusão sobre como `supera:` funciona | `supera:` é declarado só na ADR nova; a antiga nunca é editada à mão |

</details>

### `/prd-to-adr`

Transforma um PRD em proposta de arquitetura registrada como ADR, decomposta em atividades por componente com critérios de aceite rastreáveis.

**Uso básico**

```
/prd-to-adr aqui está o PRD de parcelamento — gera a arquitetura, o ADR
e os critérios de aceite.
```

Produz a ADR, a decomposição em atividades e os critérios de aceite, em sequência.

<details>
<summary>Formato de saída</summary>

Arquivos: `adr/ADR-XXX-titulo.md`, `adr/ADR-XXX-acs.md`, e `adr/ADR-XXX-diagrama.png` (se `/make-diagram` estiver disponível).

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Extrai requisitos funcionais e não-funcionais do PRD, depois propõe de 1 a 3 opções de arquitetura com trade-offs.
2. Antes de escrever os critérios de aceite, elicita o contrato de payload (REST ou mensageria: campos, tipos, contrato de erro, idempotência).
3. Decompõe em atividades por componente, cada uma com seu critério de aceite rastreável.
4. Termina com um checkpoint humano obrigatório, que não pode ser pulado.

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| Critério de aceite genérico sobre um contrato ("deve funcionar") | Etapa de elicitação de contrato pulada | Toda atividade com integração REST/mensageria exige um critério descrevendo o contrato explicitamente |
| Checkpoint final pulado | Pressa em fechar a ADR | O checkpoint humano é obrigatório antes de considerar a ADR pronta |

</details>

### `/issue-to-adr`

Mesmo resultado do `/prd-to-adr` — ADR e critérios de aceite —, mas a partir de uma demanda informal (ticket curto, mensagem de chat), sem PRD escrito.

**Uso básico**

```
/issue-to-adr o suporte pediu bloqueio de conta após 3 logins falhos —
não tem PRD, só esse ticket.
```

Elicita o que falta antes de propor a arquitetura, em vez de assumir.

<details>
<summary>Formato de saída</summary>

Os mesmos arquivos do `/prd-to-adr`: `adr/ADR-XXX-titulo.md`, `adr/ADR-XXX-acs.md`, `adr/ADR-XXX-diagrama.png` (opcional).

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Elicitação ativa e priorizada — objetivo, criticidade, volume, escopo — em lotes pequenos, no máximo 2 rodadas de perguntas.
2. O que ainda estiver em aberto depois de 2 rodadas vira uma assunção explícita registrada na ADR, em vez de travar a demanda.
3. Depois da elicitação, segue o mesmo fluxo do `/prd-to-adr`: arquitetura, contrato de payload, atividades, checkpoint humano.

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| Skill trava esperando uma informação que ninguém tem | Mais de 2 rodadas insistindo na mesma lacuna | Depois de 2 rodadas, a lacuna vira assunção explícita registrada — não bloqueia |
| ADR não deixa claro que partiu de uma suposição | Assunções não destacadas na seção de contexto | A seção de contexto cita a origem informal e lista as assunções registradas |

</details>

### `/make-diagram`

Gera diagramas de arquitetura como imagem (PNG) a partir de texto livre ou Mermaid — cobre AWS, Kubernetes, C4, GCP, Azure e topologias on-premises.

**Uso básico**

```
/make-diagram desenha a arquitetura do contexto de cobrança recorrente.
```

Pergunta onde salvar, gera o diagrama, e confirma o PNG resultante.

<details>
<summary>Formato de saída</summary>

Um arquivo `.py` editável/regenerável (`<slug>_diagram.py`) e a imagem PNG correspondente, no diretório escolhido por quem pediu.

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Extrai componentes, conexões e agrupamentos do texto ou do Mermaid de origem.
2. Verifica se as dependências (biblioteca de diagramas + Graphviz) estão instaladas antes de gerar, oferecendo instalar o que faltar.
3. Escreve o `.py` usando só classes de nó confirmadas na biblioteca — nunca inventa um componente que não existe no provider escolhido.
4. Gera o PNG e confirma o resultado.

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| Script trava tentando abrir uma janela | Geração configurada para exibir a imagem num ambiente sem display | Gerar sempre sem abrir janela |
| Import de um componente que não existe | Nome de nó inventado sem checar a biblioteca | Só usar classes de nó confirmadas na referência do provider |
| Texto de um nó C4 estoura a caixa | Caixa no tamanho padrão, pequena demais para o texto | Usar uma caixa maior para nós com descrição longa |

</details>

### `/pm-create-pb`

Transforma uma ideia, demanda ou ticket solto em um Product Brief (PB) ancorado no modelo de domínio existente — cruza a ideia com o que já está decidido antes de perguntar qualquer coisa.

**Uso básico**

```
/pm-create-pb chegou essa demanda do cliente — formaliza um Product Brief.
```

Também aciona sozinho quando alguém chega com "tive uma ideia" ou "quero tirar esse ticket do papel", mesmo sem citar "PB".

<details>
<summary>Formato de saída</summary>

Arquivo `PRODUCT_BRIEF.md` (caminho por contexto/funcionalidade), front matter com `id`, `status`, `contextos`, `afeta`; corpo com 8 seções — Resumo executivo, O Problema, A Solução, O que torna Isto Diferente, Quem Isto Serve, Critérios de Sucesso, Escopo, Visão.

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Lê o `CONTEXT-MAP.md` antes de qualquer pergunta, identifica contextos candidatos e ADRs vigentes.
2. Se a ideia já conflita visivelmente com uma ADR vigente, pula direto para argumentação + checkpoint humano — antes mesmo de abrir a entrevista.
3. Entrevista de impacto, uma pergunta por vez, sempre com resposta recomendada: estende contexto existente ou sugere um novo? mexe em contrato publicado? quem mais é afetado? precisa de termo novo no glossário?
4. Classifica o impacto como contido (segue direto) ou amplo/conflitante (exige checkpoint humano antes de gravar o arquivo).

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| Brief gravado com escopo errado | Checkpoint humano pulado num caso amplo/conflitante | O arquivo nunca é gravado antes desse checkpoint, quando ele se aplica |
| Grafo vazio interpretado como "sem conflito" | Repositório brownfield sem front matter nos documentos | Ler as ADRs diretamente antes de concluir que não há tensão |
| Sem `CONTEXT-MAP.md` no repositório | O repositório ainda não é um repositório de contexto | A skill avisa a limitação e segue sem grafo, sinalizando isso no brief |

</details>

### `/pm-create-prd`

Converte um Product Brief aprovado em um ou mais PRDs completos, decidindo a quebra pelo tamanho real do impacto — não pelo tamanho do texto.

**Uso básico**

```
/pm-create-prd aqui está o Product Brief aprovado — quebra em PRD(s).
```

Avalia o impacto e propõe 1 PRD ou uma quebra em vários, encadeados, antes de gerar qualquer arquivo.

<details>
<summary>Formato de saída</summary>

Um ou mais arquivos `NNN-<slug-da-capacidade>-PRD.md`, na mesma pasta do brief de origem; front matter referenciando o PB; corpo com 10 seções e requisitos com ID (`RF-01`, `RNF-01`...).

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Localiza e valida o Product Brief de origem a partir do `CONTEXT-MAP.md`.
2. Avalia 4 critérios de escala — contextos tocados, atores envolvidos, dependência entre capacidades, reversibilidade — e mostra essa avaliação antes de decidir.
3. Um contexto com capacidades acopladas e poucos atores vira 1 PRD direto; qualquer outro arranjo é proposto como quebra em PRDs encadeados.
4. Nenhum arquivo é criado antes de um checkpoint humano confirmar a quebra proposta.

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| PRD vira um monólito que ninguém entrega incrementalmente | Brief multi-contexto detalhado num documento único | A avaliação de escala decide quando quebrar em PRDs separados |
| Quebra em PRDs demais para uma ideia pequena | Brief atômico quebrado sem necessidade | A mesma avaliação evita fragmentar capacidades acopladas |

</details>

### `/domain-reconcile`

Busca informação num repositório GitHub externo (um commit ou documento numa branch) e concilia contra o que já está documentado no domínio — nunca edita nada sem autorização explícita, passagem por passagem.

**Uso básico**

```
/domain-reconcile confere se o commit mais recente do repositório de
pagamentos ainda bate com a ADR-012 de cobrança recorrente.
```

Traz as divergências encontradas uma de cada vez, e só edita o que for autorizado explicitamente.

<details>
<summary>Formato de saída</summary>

Não gera um arquivo de "relatório" — atualiza critérios/requisitos existentes e ADRs (com autorização), e sempre atualiza um arquivo de mapeamento na raiz com o de-para entre repositório e contexto e o último commit conciliado.

</details>

<details>
<summary>Como funciona por dentro</summary>

1. Exige autenticação com o GitHub e um `CONTEXT-MAP.md` na raiz do repositório de contexto antes de prosseguir.
2. Pergunta uma coisa de cada vez — qual repositório, qual commit/branch, a qual contexto pertence — nunca assume.
3. Faz um clone temporário e raso do repositório externo, sempre removido ao final, mesmo em erro.
4. Cruza candidatos a divergência com os critérios de aceite do contexto, um de cada vez, até eliminar ambiguidade.
5. Só edita um documento com autorização explícita daquela passagem específica — atualizar tudo de uma vez não é permitido.

</details>

<details>
<summary>Erros comuns</summary>

| Sintoma | Causa provável | Solução |
|---|---|---|
| Skill trava na busca ao repositório externo | Autenticação com o GitHub ausente | Autenticar antes de pedir a reconciliação |
| "Nada para conciliar" | Repositório de contexto sem `CONTEXT-MAP.md` | A skill avisa e oferece o bootstrap do modelo de domínio antes de continuar |
| Clone temporário sobrando de uma sessão anterior | Sessão anterior travou antes de limpar | Nunca reaproveitar um clone antigo às cegas — buscar de novo |

</details>

## Para onde ir a seguir

- Para o passo a passo de como usar essas skills num **repositório de aplicação**, veja o [guia de repositório de aplicação](./guia-agentes-ia-app.md).
- Para o passo a passo de como usar essas skills num **repositório de contexto**, veja o [guia de repositório de contexto](./guia-repositorio-contexto.md).

Volte para a [introdução](./intro.mdx) para a visão de produto do framework.
