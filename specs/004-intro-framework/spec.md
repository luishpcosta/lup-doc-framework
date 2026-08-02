# Spec: Introdução — o que é o framework híbrido

**Feature ID:** 004-intro-framework
**Phase:** done
**Owner:** luishpcosta
**Last updated:** 2026-08-02

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those para `plan.md`.

## Problem / Motivation

`docs/intro.mdx` hoje é um placeholder (ver `progress.md`, "What's Next" item 1): tem só um parágrafo curto e uma promessa de que "o conteúdo técnico completo ainda precisa ser escrito". Isso já bloqueava a experiência de quem chega no site pela primeira vez — a home (`static/framework-hibrido.html`, embutida via iframe) apresenta o roteiro executivo/técnico completo, mas `/docs/intro`, que é o destino natural de quem quer entender o framework em texto navegável (fora do carrossel), não entrega esse conteúdo. As duas fontes já existem e já foram usadas como referência conceitual nas features anteriores: `static/framework-hibrido.html` (o roteiro completo: situação, complicação, resposta em ciclo, três pilares, decisões) e `as_is_metarepo_sdd_harness.svg` (o estado atual/as-is: o metarepo informa os serviços de forma implícita, sem retorno pós-deploy). Falta consolidar as duas em uma introdução real, cobrindo tanto a visão de **framework** (o que é, tecnicamente: arquitetura, artefatos, harness) quanto a visão de **gestão** (por que existe: o problema atual e as decisões de governança pendentes).

## User Stories

- Como visitante novo do site, quero entender em `/docs/intro`, sem depender do carrossel da home, o que é o framework híbrido e por que ele existe.
- Como leitor com interesse técnico, quero entender a arquitetura do framework — os dois níveis (metarepo de contexto + repositórios de serviço), os artefatos rastreáveis (PB/PRD/ADR/ACs/História) e o harness Speckit SDD — para saber como ele se encaixa no meu trabalho.
- Como leitor com interesse de gestão/governança, quero entender quais decisões organizacionais ainda estão em aberto para colocar o framework em produção.
- Como leitor que já decidiu adotar o framework, quero ser direcionado a partir da introdução para os dois guias práticos já publicados (repositório de aplicação e repositório de contexto).

## Functional Requirements

- FR-1: A página deve abrir com um resumo curto do que é o framework — o ciclo de negócio → técnica → backlog → implementação com IA integrada e rastreabilidade em cada etapa (correspondente à capa e ao slide de resposta/ciclo do rascunho).
- FR-2: A página deve explicar a motivação (visão executiva): a situação atual (cada time usa IA à sua maneira, sem padrão comum) e a complicação que isso gera (decisões que se repetem, contexto que vive só na cabeça das pessoas, IA que erra mais sem contexto rastreável).
- FR-3: A página deve explicar o primeiro pilar (visão de framework): as duas análises em paralelo — negócio (PB → PRD) e técnica (ADR → ACs) — e como elas se encontram numa história única e rastreável, com a cadeia de IDs como mecanismo central.
- FR-4: A página deve explicar o segundo pilar (visão de framework): a contenção de domínio no repositório de contexto — um `CONTEXT-MAP.md` na raiz, um domínio por pasta, cada bounded context com seu próprio glossário e ADRs.
- FR-5: A página deve explicar o terceiro pilar (visão de framework): o harness Speckit SDD (`spec → plan → tasks → verify`) vivendo dentro de cada repositório de serviço, não no metarepo, evoluindo no ritmo de cada time.
- FR-6: A página deve listar as decisões de gestão que a organização ainda precisa tomar para produção: harness padrão, responsáveis pela contextualização, convenção de formato única, e quem julga a entrega.
- FR-7: A página deve manter e adaptar os links já existentes para os dois guias práticos (`guia-agentes-ia-app.md`, `guia-repositorio-contexto.md`) e para a home, deixando claro qual guia serve a qual visão (aplicação vs. contexto).
- FR-8: A página não deve mais conter o texto de placeholder atual nem qualquer promessa de conteúdo futuro sobre este mesmo assunto.

## Acceptance Criteria

- **AC-1** — Given a página publicada, when um leitor lê a abertura, then encontra em poucas frases o que é o framework (ciclo negócio→técnica→backlog→implementação, com IA e rastreabilidade). _(satisfies FR-1)_
- **AC-2** — Given a seção de motivação, when o leitor a lê, then encontra a situação (uso de IA não padronizado entre times) e a complicação (decisões repetidas, contexto perdido, IA sem contexto) descritas de forma reconhecível a partir do rascunho. _(satisfies FR-2)_
- **AC-3** — Given a seção sobre os artefatos, when o leitor a lê, then encontra as duas análises (negócio: PB→PRD; técnica: ADR→ACs) e a explicação de que elas se encontram numa história rastreável via cadeia de IDs. _(satisfies FR-3)_
- **AC-4** — Given a seção sobre o repositório de contexto, when o leitor a lê, then encontra a explicação da contenção de domínio (`CONTEXT-MAP.md`, um domínio por pasta, bounded context com glossário e ADRs próprios). _(satisfies FR-4)_
- **AC-5** — Given a seção sobre o harness, when o leitor a lê, then encontra a explicação de que o Speckit SDD vive no repositório de serviço (não no metarepo) e o pipeline `spec → plan → tasks → verify`. _(satisfies FR-5)_
- **AC-6** — Given a seção final, when o leitor a lê, then encontra as quatro decisões de gestão pendentes (harness padrão, responsáveis pela contextualização, convenção de formato, quem julga a entrega) listadas de forma explícita. _(satisfies FR-6)_
- **AC-7** — Given a página completa, when o leitor busca por onde continuar, then encontra links para `guia-agentes-ia-app.md` e `guia-repositorio-contexto.md`, cada um identificado com a visão que atende (aplicação vs. contexto), e um link de volta para a home. _(satisfies FR-7)_
- **AC-8** — Given o repositório após a implementação, when se busca pelo texto de placeholder original ("Esta página é um placeholder"), then ele não existe mais em `docs/intro.mdx`; `npm run typecheck` e `npm run build` terminam sem erro. _(satisfies FR-8)_

## Edge Cases

- O leitor pode chegar direto em `/docs/intro` pela URL, sem nunca ter visto a home/carrossel — a página não pode assumir que o leitor já viu os slides do `framework-hibrido.html`.
- A página não deve duplicar integralmente os guias práticos (isso é escopo de `002`/`003`) — ela introduz os conceitos e direciona para eles, sem repetir os exemplos de invocação de skill.

## Out of Scope (Non-Goals)

- Não recria visualmente o carrossel/registros "papel"/"blueprint" do `framework-hibrido.html` como componente React — a home já cobre isso via iframe (decisão registrada em `001-tela-inicial`).
- Não lista nem descreve as skills individuais (`/blueprintfy`, `/codefy`, etc.) — isso já é coberto pelos dois guias práticos, referenciados por link.
- Não implementa `/domain-reconcile` nem qualquer mecanismo real de reconciliação — apenas descreve o problema que ele resolve, como contexto.
- Não inclui uma seção dedicada ao estado atual/as-is (`as_is_metarepo_sdd_harness.svg`: elo implícito, sem retorno pós-deploy) — removida a pedido do usuário depois da primeira implementação; esse detalhe continua coberto pelo guia de repositório de contexto (`003-guia-repositorio-contexto`).

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-02 | Escopo do conteúdo geral pedido pelo usuário | Usuário pediu para escrever em `docs/intro` "o conteúdo geral do que é o framework"; interpretado como consolidar as duas visões já validadas em conversa (framework/técnica e gestão), cobrindo o roteiro completo do rascunho (`framework-hibrido.html`) e o estado atual (`as_is_metarepo_sdd_harness.svg`), sem duplicar os guias práticos já publicados. |
| 2026-08-02 | Remover a seção "O problema que ainda não resolvemos" (estado atual/as-is) | Usuário pediu explicitamente para remover essa parte depois da primeira implementação, já publicada e verificada. FR-6/AC-6 originais (estado atual) removidos da spec; FRs/ACs seguintes renumerados (antigos FR-7/8/9 → FR-6/7/8, AC-7/8/9 → AC-6/7/8). |
