# Spec: Guia — preparar e usar o repositório com agentes de IA de desenvolvimento

**Feature ID:** 002-guia-agentes-ia
**Phase:** done
**Owner:** luishpcosta
**Last updated:** 2026-08-01

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those para `plan.md`.

## Problem / Motivation

Times que adotam ferramentas de IA para assistência/automação de programação — operando como agentes de engenharia de software — precisam de uma referência única sobre como preparar um repositório para esse fluxo e como operá-lo no dia a dia. Sem uma página consolidada, esse conhecimento fica implícito (na cabeça de quem já usou as skills) e cada repositório novo reaprende os mesmos passos por tentativa e erro. Esta feature cria essa referência como uma página "how-to" única na documentação.

## User Stories

- Como responsável por avaliar a adoção de agentes de IA num projeto, quero um resumo executivo de uma página que explique o que o processo envolve e quais skills participam, para decidir rapidamente se e como adotar.
- Como desenvolvedor preparando um repositório existente (brownfield), quero um passo a passo com exemplos concretos de invocação das skills de setup, para não precisar adivinhar a forma certa de pedir.
- Como desenvolvedor no dia a dia, quero exemplos de pedidos em linguagem natural e alto nível, para saber como me comunicar com o agente sem precisar conhecer a mecânica interna do harness.
- Como mantenedor do `AGENTS.md`/`CLAUDE.md` do projeto, quero sugestões prontas de modos de trabalho e automações (review de PR), para estender o harness sem reprojetá-lo do zero.

## Functional Requirements

- FR-1: A página deve conter um resumo executivo que explique o propósito do guia e liste as skills de IA envolvidas (`/codefy`, `/blueprintfy`, `/sdd-harness-creator`), cada uma com uma descrição de uma linha do seu papel no fluxo.
- FR-2: A página deve documentar o processo de preparação do repositório via `/sdd-harness-creator`, distinguindo o caminho **brownfield** (repositório já existente, com código/histórico) do caminho **greenfield** (repositório novo), e recomendando o uso de um modelo de IA de raciocínio forte (ex.: Opus) no caminho brownfield para a etapa de recuperação de informação e montagem inicial do harness.
- FR-3: A página deve incluir pelo menos 2 exemplos de invocação de `/sdd-harness-creator` para setup de projeto (cobrindo o cenário brownfield).
- FR-4: A página deve documentar o uso contínuo de `/codefy`, ainda em contexto brownfield, para criar uma cadeia de rastreabilidade entre os documentos de especificação existentes e para propor/adicionar regras em `AGENTS.md`/`CLAUDE.md`, com pelo menos 2 exemplos de invocação.
- FR-5: A página deve incluir pelo menos 5 exemplos de uso do dia a dia, escritos como pedidos em linguagem natural de alto nível (não como comandos técnicos), cobrindo tanto planejamento (spec/plan) quanto skills como `/codefy`.
- FR-6: A página deve conter uma seção de dicas de adições ao `AGENTS.md`/`CLAUDE.md` cobrindo, no mínimo:
  - a) **Modos de trabalho** — um modo rápido (implementação completa numa única passada) e um modo faseado (produz `spec.md`/`plan.md`/`tasks.md`, aguarda aprovação e levanta ambiguidades antes de prosseguir; só após aprovação implementa código, testes e abre PR).
  - b) **Review automático de PR** — aciona uma skill de review via hook, usando um modelo específico para essa tarefa; se o agente não souber como configurar isso, deve perguntar ao usuário/investigar em vez de assumir uma solução.
- FR-7: A página deve ser única (uma só página, não uma seção multi-página), em português, seguindo o estilo "how-to" e os tokens visuais já definidos no projeto (ver `constitution.md`, princípio 5).
- FR-8: A página não deve citar nominalmente nenhum repositório externo de onde as skills `/codefy`/`/blueprintfy` vêm — elas são apresentadas como skills disponíveis ao agente, sem apontar sua origem.

## Acceptance Criteria

- **AC-1** — Given a página publicada, when um leitor lê a primeira seção, then encontra um resumo executivo e uma lista das três skills (`/codefy`, `/blueprintfy`, `/sdd-harness-creator`) cada uma com seu papel descrito em uma linha. _(satisfies FR-1)_
- **AC-2** — Given a seção de preparação do repositório, when o leitor busca orientação sobre repositório existente vs. novo, then encontra os dois caminhos (brownfield/greenfield) claramente diferenciados, com a recomendação de modelo forte (ex. Opus) associada explicitamente ao caminho brownfield. _(satisfies FR-2)_
- **AC-3** — Given a seção de preparação, when o leitor procura por exemplos de comando, then encontra ao menos 2 blocos de exemplo chamando `/sdd-harness-creator` para setup de projeto. _(satisfies FR-3)_
- **AC-4** — Given a seção de preparação, when o leitor chega à parte sobre encadear specs e atualizar `AGENTS.md`/`CLAUDE.md`, then encontra a explicação do processo com `/codefy` e ao menos 2 exemplos de invocação. _(satisfies FR-4)_
- **AC-5** — Given a seção de uso do dia a dia, when o leitor conta os exemplos, then encontra 5 ou mais exemplos em linguagem natural de alto nível. _(satisfies FR-5)_
- **AC-6** — Given a seção de dicas para `AGENTS.md`/`CLAUDE.md`, when o leitor busca os dois subtópicos, then encontra (a) a proposta de modos de trabalho rápido/faseado descrita de forma acionável (copiável para um `CLAUDE.md`) e (b) a proposta de review automático de PR via hook + modelo específico, incluindo a orientação de perguntar quando não souber configurar. _(satisfies FR-6)_
- **AC-7** — Given o repositório após a implementação, when se roda `npm run typecheck` e `npm run build`, then ambos terminam sem erro e a nova página aparece navegável a partir da sidebar/navbar do site, em uma única rota. _(satisfies FR-7)_
- **AC-8** — Given o conteúdo publicado, when se busca por menções a repositórios externos de skills, then nenhuma URL, nome de organização ou nome de repositório de origem das skills `/codefy`/`/blueprintfy` aparece no texto. _(satisfies FR-8)_

## Edge Cases

- As skills `/codefy` e `/blueprintfy` podem não estar instaladas na sessão atual do agente que gera esta documentação — a página documenta o uso pretendido de qualquer forma; é conteúdo informativo, não depende de execução ao vivo das skills.
- O repositório-alvo do guia pode ser greenfield (sem código prévio) — a página não pode assumir que brownfield é o único caminho; ambos devem estar cobertos (ver FR-2).
- Um leitor pode copiar os exemplos de comando literalmente — os exemplos devem ser plausíveis e coerentes com os nomes reais das skills mencionadas, mesmo que os detalhes do repositório-alvo variem.

## Out of Scope (Non-Goals)

- Não documenta como instalar/configurar as skills em si (assume-se que já estão disponíveis no ambiente do Claude Code do leitor).
- Não cria uma página de referência por skill — é uma visão consolidada de uso, não a documentação de cada skill individualmente.
- Não implementa de fato o hook de review automático de PR neste repositório — apenas documenta a sugestão para ser aplicada pelo leitor em seu próprio `AGENTS.md`/`CLAUDE.md`.

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-01 | O guia deve referenciar o repositório de origem das skills `/codefy`/`/blueprintfy`? | Não — pedido explícito do usuário para não referenciar esse repositório nesta documentação (FR-8/AC-8). |
