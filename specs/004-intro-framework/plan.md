# Plan: Introdução — visão de produto do framework híbrido

**Feature ID:** 004-intro-framework
**Phase:** tasks
**Spec:** ./spec.md
**Last updated:** 2026-08-02

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

Reescrever `docs/intro.mdx` por completo (front matter `sidebar_position: 1` e H1 "Introdução" mantidos — não muda a rota nem o link do navbar/sidebar), substituindo as seções técnicas/arquiteturais da rodada anterior desta feature pelas 8 seções do template de Product Brief da skill `pm-create-pb` (`references/pb-template.md`), preenchidas com as respostas da entrevista registrada no Clarifications Log de `spec.md`: Resumo executivo, O Problema, A Solução, O que torna isto diferente, Quem isto serve, Critérios de sucesso, Escopo, Visão. A seção final de navegação ("Para onde ir a seguir") é mantida, é a única parte da página que pode citar termos técnicos (PB/PRD/ADR/AC, harness), porque aponta para onde esse detalhe vive — não o explica.

Markdown/MDX puro, sem componentes React novos, sem CSS hardcoded (constitution, princípio 5).

Nota pós-implementação: usuário esclareceu que o mecanismo não é chamada manual de agentes — é um agente orquestrador, equipado com habilidades por papel, entregando output padronizado. "A Solução", "O que torna isto diferente" e "Visão" ajustadas para tornar isso explícito (agente orquestrador, resultado padronizado, caminho para automações futuras); "Resumo executivo" e "Quem isto serve" ajustadas por consistência. Ver Clarifications Log em `spec.md`.

## Architecture & Components

- `docs/intro.mdx` — reescrito por completo; único artefato de conteúdo desta feature.
- Nenhuma mudança em `sidebars.ts`, `docusaurus.config.ts`, `src/`, `static/`, ou nos dois guias práticos.
- Nenhum `PRODUCT_BRIEF.md` gerado — ver Out of Scope em `spec.md`. Os tópicos do template da skill (`pb-template.md`) foram usados só como estrutura de seções da página, não como um documento formal com front matter/ID/gate de `CONTEXT-MAP.md`.

## Data Model

Não aplicável — conteúdo estático.

## Interfaces / Contracts

- Rota pública: `/docs/intro` (inalterada).
- Fonte de verdade estrutural: `.claude/skills/pm-create-pb/references/pb-template.md` (8 seções do PB) e `.claude/skills/pm-create-pb/references/entrevista-de-impacto.md` (disciplina da entrevista — adaptada, sem grafo/`CONTEXT-MAP.md`).
- Fonte de verdade de conteúdo: respostas do usuário à entrevista, registradas no Clarifications Log de `spec.md`.

## Requirement Coverage

| Requirement | Addressed by |
|---|---|
| FR-1 / AC-1 | Seção "Resumo executivo" |
| FR-2 / AC-2 | Seção "O Problema" |
| FR-3 / AC-3 | Seção "A Solução" — agente orquestrador + resultado padronizado |
| FR-4 / AC-4 | Seção "O que torna isto diferente" — contraste com chamada manual sem orquestração |
| FR-5 / AC-5 | Seção "Quem isto serve" |
| FR-6 / AC-6 | Seção "Critérios de sucesso" |
| FR-7 / AC-7 | Seção "Escopo" |
| FR-8 / AC-8 | Seção "Visão" |
| FR-9 / AC-9 | Seção final "Para onde ir a seguir" — links para os 2 guias + home |
| FR-10 / AC-10 | Revisão de texto (`grep`) confirmando ausência de termos técnicos fora da seção de links |
| FR-11 / AC-11 | Revisão de tom, mesmo critério das rodadas anteriores desta feature |

## Constitution Compliance

- Princípio 1 (spec before code): feature segue Specify → Plan → Tasks antes da escrita.
- Princípio 5 (fidelidade ao design system): Markdown/MDX puro, sem CSS/cores hardcoded.
- Quality Bar: `npm run typecheck` + `npm run build`; verificação visual manual (claro/escuro) via `npm run build && npm run serve`.

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Conteúdo técnico anterior (3 pilares + customização por squad) | Removido de `/docs/intro`, não mantido em paralelo | Manter como seção "detalhe técnico" abaixo da visão de produto | Usuário escolheu explicitamente substituição completa: esse conteúdo já vive, com fidelidade visual total, na home (`framework-hibrido.html`) — mantê-lo duplicado em duas páginas não agregava leitura nova |
| Estrutura da página | 8 seções do template de PB da skill `pm-create-pb`, usadas como estrutura de conteúdo | Gerar um `PRODUCT_BRIEF.md` formal e linkar/embutir | Não há `CONTEXT-MAP.md` neste repositório nem convenção de `docs/refinamento/` — forçar o formato completo (front matter, ID, gate) criaria um artefato sem lugar coerente no repositório; os tópicos servem bem como estrutura de página sem precisar do aparato completo |
| Termos técnicos (PB/PRD/ADR/AC/harness) | Confinados à seção final de links | Proibir totalmente, até nos links | Os links de saída (`guia-agentes-ia-app.md`, `guia-repositorio-contexto.md`) já usam esses termos nos próprios títulos/descrições — proibir aqui também exigiria reescrever os guias, fora do escopo desta feature |
