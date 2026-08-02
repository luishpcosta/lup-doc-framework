---
sidebar_position: 2
title: Guia — preparar e usar um repositório de aplicação
---

# Guia — preparar e usar um repositório de aplicação

Este guia mostra como preparar um repositório e como operá-lo no dia a dia usando ferramentas de Inteligência Artificial voltadas para assistência e automação de programação — agentes que operam como engenheiros de software, lendo o código, produzindo especificações, implementando e abrindo PRs. É escrito com foco em **repositórios de aplicação/código** (os exemplos citam módulos, PRs e arquivos de código) — para um repositório de conteúdo/documentação, adapte os exemplos ao seu tipo de artefato.

## 1. Resumo

Leia na ordem: prepare o repositório (seção 2), depois use no dia a dia (seções 3–4). Duas skills sustentam isso:

- `/sdd-harness-creator` — monta o harness SDD (`constitution.md`, `spec.md`/`plan.md`/`tasks.md`, gates de fase). Ponto de partida.
- `/codefy` — depois que o harness existe, mantém specs e `AGENTS.md`/`CLAUDE.md` atualizados conforme o repositório muda.

## 2. Como preparar o repositório

### Brownfield vs. greenfield

- **Brownfield (repositório existente)** — use um modelo de raciocínio forte (ex.: **Opus**) na primeira rodada: `/sdd-harness-creator` precisa ler o código e inferir princípios implícitos antes de montar `constitution.md` e a primeira spec, e erros aqui se propagam para o resto. Depois que o harness está de pé, volte a um modelo mais rápido para o trabalho rotineiro.
- **Greenfield (repositório novo)** — monte o harness direto a partir do brief e dos princípios do kickoff, sem etapa de recuperação.

### Exemplos chamando `/sdd-harness-creator`

**Exemplo 1 — brownfield, engenharia reversa completa:**

```
/sdd-harness-creator faça a engenharia reversa deste repositório e monte
o harness SDD
```

**Exemplo 2 — brownfield, escopo restrito a um módulo:**

```
/sdd-harness-creator monte o harness SDD só para o módulo de pagamentos
(src/payments/), a partir do que o código atual já satisfaz.
```

**Exemplo 3 — greenfield:**

```
/sdd-harness-creator este repositório é novo. Monte o harness SDD incial
```

### Encadeando specs com `/codefy` (processo contínuo, brownfield)

Depois que o harness existe, use `/codefy` para manter specs e `AGENTS.md`/`CLAUDE.md` atualizados: ele mapeia decisões que ainda não viraram spec e regras que o código já segue mas ainda não estão documentadas.

**Exemplo 1 — mapear contexto a partir de documentação dispersa:**

```
/codefy analise minhas docs em docs/adr/ e specs/ e faça o mapeamento do
contexto: identifique decisões técnicas que ainda não estão refletidas em
nenhuma spec e liste-as como specs pendentes.
```

**Exemplo 2 — extrair regras implícitas do código para o AGENTS.md/CLAUDE.md:**

```
/codefy compare specs/003-checkout/spec.md com src/checkout/ e adicione
ao CLAUDE.md as regras implícitas no código que ainda não estão
documentadas.
```

## 3. Uso no dia a dia

Peça em linguagem natural de alto nível — o agente traduz para o fluxo SDD (spec → plan → tasks → implementação) ou para a skill certa:

```
Leia a ADR-125 e planeje a alteração.
```

```
/codefy planeje o parcelamento no módulo de pagamentos.
```

```
Comece a ADR-004 no modo faseado.
```

```
Ajuste o adapter contratos para usar a rota x modo rápido, já abra o PR.
```

```
Revise o PR #482 com foco em segurança.
```

## 4. Dicas para `AGENTS.md`/`CLAUDE.md`

### Modos de trabalho

Cole isto no `AGENTS.md`/`CLAUDE.md` do repositório para declarar os modos de operação do agente:

```markdown
## Modos de trabalho

**Modo rápido (`fast`)** — para mudanças pequenas, bem definidas e de baixo
risco: implemente a mudança completa (código + testes) numa única passada,
sem parar para aprovação intermediária.

**Modo faseado (`phased`, padrão quando o escopo não estiver claro)** —
para mudanças de escopo médio/alto ou ambíguas: primeiro produza `spec.md`
(o quê/por quê, critérios de aceite) e aguarde aprovação; qualquer
ambiguidade é levantada como pergunta explícita antes de prosseguir. Após
aprovação da spec, produza `plan.md` + `tasks.md` e aguarde uma segunda
aprovação. Só então implemente código, escreva/rode os testes e abra o PR.

Regra prática: se o modo não estiver explícito no pedido, pergunte qual
usar. É sempre permitido escalar de `fast` para `phased` no meio do
trabalho ao perceber que o escopo é maior do que parecia — nunca o
contrário sem avisar antes.
```

### Review automático de PR

Use a skill `/review-pr` — cobre bugs, arquitetura, performance e segurança, e publica a revisão no GitHub via `gh` CLI. Configure um hook que a aciona a cada PR aberto, com um modelo de orçamento de raciocínio mais alto que o da implementação do dia a dia. Se não souber como montar o hook, peça:

```
Configure um hook que acione a skill /review-pr a cada PR aberto, usando o modelo X para o review.
```

O agente deve investigar as opções do seu ambiente (hooks, modelo, gatilho de evento) em vez de assumir uma solução pronta.
