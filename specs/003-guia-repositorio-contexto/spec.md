# Spec: Guia — preparar e usar um repositório de contexto

**Feature ID:** 003-guia-repositorio-contexto
**Phase:** done
**Owner:** luishpcosta
**Last updated:** 2026-08-02

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those para `plan.md`.

## Problem / Motivation

A feature `002-guia-agentes-ia` cobriu como preparar e usar um **repositório de aplicação** com agentes de IA. Mas no framework híbrido (`static/framework-hibrido.html`, slides 6–9) o contexto de negócio e técnico — Product Brief, PRD, ADR, critérios de aceite e o mapa de domínio — vive num **repositório de contexto** separado (um metarepo documental), que informa um ou mais repositórios de aplicação. Hoje (ver `as_is_metarepo_sdd_harness.svg`) esse elo é implícito e unidirecional: o metarepo informa os serviços, mas não há retorno depois do deploy — o código pode divergir do que está documentado sem que ninguém perceba. Falta uma referência única sobre como preparar esse repositório de contexto, mantê-lo atualizado no dia a dia, e reconciliá-lo com o que os repositórios de aplicação realmente fazem.

## User Stories

- Como responsável por um domínio de negócio, quero preparar um repositório de contexto — do zero ou a partir de documentos já espalhados — para ter um mapa de domínio único e rastreável (`CONTEXT-MAP.md`).
- Como mantenedor do repositório de contexto, quero saber quais skills usar no dia a dia para manter glossário, ADRs e diagramas atualizados conforme o domínio evolui.
- Como time técnico, quero conduzir a análise de negócio junto com o Product Manager (ou área correlata) quando a demanda exigir, sem sair do fluxo documentado.
- Como responsável por manter o contexto fiel ao que foi implementado, quero reconciliar periodicamente o que os repositórios de aplicação realmente fizeram contra o que está documentado aqui, fechando o loop hoje implícito e sem retorno pós-deploy.

## Functional Requirements

- FR-1: A página deve conter um resumo executivo curto listando as skills usadas (`/blueprintfy`, `/prd-to-adr`, `/issue-to-adr`, `/make-diagram`, `/pm-create-pb`, `/pm-create-prd`, `/domain-reconcile`), cada uma com uma descrição de uma linha do seu papel.
- FR-2: A página deve documentar como preparar o repositório de contexto (bootstrap do `CONTEXT-MAP.md`) via `/blueprintfy`, cobrindo tanto um repositório sem nenhuma documentação de domínio quanto um repositório com PB/PRD/ADR já espalhados mas sem mapa, com pelo menos 2 exemplos de invocação.
- FR-3: A página deve documentar o uso contínuo para manter o repositório atualizado — `/blueprintfy` (manutenção do modelo/glossário via entrevista), `/prd-to-adr`, `/issue-to-adr` e `/make-diagram` — cada skill com pelo menos 1 exemplo de invocação.
- FR-4: A página deve documentar, como subseção explicitamente opcional, o uso de `/pm-create-pb` e `/pm-create-prd` para quando o time técnico precisa conduzir a análise de negócio em conjunto com o Product Manager/área correlata, com pelo menos 1 exemplo de invocação cada.
- FR-5: A página deve documentar o uso de `/domain-reconcile` para reconciliar o repositório de contexto com mudanças feitas nos repositórios de aplicação, explicitando o problema que resolve (elo implícito, sem retorno pós-deploy — ver `as_is_metarepo_sdd_harness.svg`), com pelo menos 1 exemplo de invocação.
- FR-6: A página deve seguir o mesmo modelo de escrita do guia irmão (`002-guia-agentes-ia`): How-To Guide (Diátaxis) + minimalismo instrucional (Carroll) — orientação inicial curta, títulos de seção orientados a objetivo, todo exemplo em bloco de comando copiável, sem prosa longa desacompanhada de uma ação.
- FR-7: A página deve ser única (uma só página), em português, visualmente consistente com o design system do projeto (`constitution.md`, princípio 5), e deve linkar bidirecionalmente com o guia irmão (`docs/guia-agentes-ia-app.md`) e ser referenciada a partir de `docs/intro.mdx`.
- FR-8: A página não deve citar nominalmente nenhum repositório externo de onde as skills vêm — mesma regra do guia irmão (FR-8 de `002-guia-agentes-ia`).

## Acceptance Criteria

- **AC-1** — Given a página publicada, when um leitor lê a primeira seção, then encontra um resumo executivo e uma lista com as 7 skills, cada uma com seu papel descrito em uma linha. _(satisfies FR-1)_
- **AC-2** — Given a seção de preparação, when o leitor busca orientação sobre repositório sem `CONTEXT-MAP.md` vs. com documentos dispersos, then encontra os dois cenários diferenciados e ao menos 2 exemplos de invocação de `/blueprintfy` para bootstrap. _(satisfies FR-2)_
- **AC-3** — Given a seção de manutenção contínua, when o leitor procura por exemplos, then encontra ao menos 1 exemplo de invocação para cada uma de `/blueprintfy` (manutenção), `/prd-to-adr`, `/issue-to-adr` e `/make-diagram`. _(satisfies FR-3)_
- **AC-4** — Given a subseção de análise de negócio conjunta, when o leitor a localiza, then ela está marcada como opcional e traz ao menos 1 exemplo de `/pm-create-pb` e 1 de `/pm-create-prd`. _(satisfies FR-4)_
- **AC-5** — Given a seção de reconciliação, when o leitor a lê, then encontra a explicação do problema (elo implícito, sem retorno pós-deploy) e ao menos 1 exemplo de invocação de `/domain-reconcile`. _(satisfies FR-5)_
- **AC-6** — Given a página completa, when comparada ao guia irmão, then segue o mesmo padrão: resumo curto + lista de definição (não tabela longa), títulos de seção orientados a objetivo, e nenhuma seção com prosa explicativa sem ação/exemplo associado. _(satisfies FR-6)_
- **AC-7** — Given o repositório após a implementação, when se roda `npm run typecheck` e `npm run build`, then ambos terminam sem erro; a página é navegável a partir da sidebar numa única rota; `docs/guia-agentes-ia-app.md` e `docs/guia-repositorio-contexto.md` linkam um para o outro; `docs/intro.mdx` referencia a nova página. _(satisfies FR-7)_
- **AC-8** — Given o conteúdo publicado, when se busca por menções a repositórios externos de skills, then nenhuma URL/nome de organização/repositório de origem aparece no texto. _(satisfies FR-8)_

## Edge Cases

- O repositório de contexto pode não ter nenhum documento ainda (bootstrap do zero) ou já ter PB/PRD/ADR espalhados sem `CONTEXT-MAP.md` — ambos os cenários precisam de orientação (FR-2).
- A análise de negócio conjunta com PM (`/pm-create-pb`/`/pm-create-prd`) é opcional — nem toda mudança de domínio exige essa etapa; a página não pode apresentá-la como obrigatória.
- `/domain-reconcile` depende de acesso a um repositório GitHub externo via `gh` CLI — a página não duplica a documentação da skill, só mostra como pedir a reconciliação.

## Out of Scope (Non-Goals)

- Não documenta como instalar/configurar as skills em si (mesma premissa do guia irmão).
- Não recria o conteúdo completo do framework híbrido (slides do `framework-hibrido.html`) — isso é conteúdo futuro de `/docs/intro`, já registrado como pendência em `progress.md`.
- Não implementa de fato uma reconciliação `/domain-reconcile` neste repositório — `lup-doc-framework` é um site de conteúdo, não um repositório de contexto no sentido do framework; o guia é só a referência de uso.
- Não inclui a skill `/codefy` — apesar de existir e de preparar o terreno para o bootstrap do `/blueprintfy`, o usuário não a incluiu na lista de skills desta feature; ver nota em `progress.md` sobre a divergência encontrada entre o papel real de `/codefy` e sua descrição atual em `docs/guia-agentes-ia-app.md`.

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-02 | Quais skills entram nesta feature? | Lista fornecida explicitamente pelo usuário: `/blueprintfy` (manter o repo atualizado), `/prd-to-adr`/`/issue-to-adr`/`/make-diagram` (criação de documentação), `/pm-create-pb`/`/pm-create-prd` (opcional, análise de negócio conjunta com PM), e a skill de reconciliação (usuário disse "repo-reconcile"; a skill real no repositório de skills se chama `domain-reconcile` — usado esse nome, ver progress.md). |
