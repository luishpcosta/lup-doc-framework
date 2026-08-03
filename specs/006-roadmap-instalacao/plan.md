# Plan: Roadmap — implantar o framework num squad com sistemas distribuídos

**Feature ID:** 006-roadmap-instalacao
**Phase:** done
**Spec:** ./spec.md
**Last updated:** 2026-08-02

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

Nova página `docs/roadmap-instalacao.md`, Markdown puro, `sidebar_position: 2` (empurra `guia-agentes-ia-app.md` 2→3, `guia-repositorio-contexto.md` 3→4, `skills.md` 4→5). Formato runbook: 4 seções `##` ("Fase N — ..."), cada uma com um parágrafo curto de contexto seguido de checklist `- [ ]` (Markdown task list, renderizado nativamente pelo Docusaurus como checkbox desabilitado). Blocos de comando em fences ` ``` ` como no resto do site.

## Architecture & Components

- `docs/roadmap-instalacao.md` — novo arquivo, único artefato de conteúdo novo.
- `docs/guia-agentes-ia-app.md`, `docs/guia-repositorio-contexto.md`, `docs/skills.md` — `sidebar_position` incrementado em 1 cada.
- `docs/intro.mdx` — adicionar um link em "Para onde ir a seguir".
- Nenhuma mudança em `sidebars.ts`/`docusaurus.config.ts`.

## Data Model

Não aplicável — conteúdo estático.

## Interfaces / Contracts

- Rota pública: `/docs/roadmap-instalacao` (nova).
- Fonte de verdade do scaffold de pastas e dos exemplos de skill: brief fornecido pelo usuário nesta conversa, com o scaffold reformatado para árvore ASCII consistente (o original tinha indentação irregular).
- `/domain-reconcile` já documentada tecnicamente em `docs/skills.md` — o exemplo faseado desta página é consistente com o "Passo 5" documentado lá (edição só com autorização explícita, passagem por passagem), não inventa comportamento novo.

## Requirement Coverage

| Requirement | Addressed by |
|---|---|
| FR-1 / AC-1 | 4 seções "Fase N", cada uma com checklist `- [ ]` |
| FR-2 / AC-2 | "Fase 1 — Domínio e aplicações" |
| FR-3 / AC-3 | "Fase 2 — Repositório de documentação da squad" (scaffold + `/blueprintfy`) |
| FR-4 / AC-4 | "Fase 3 — Povoar a documentação a partir das aplicações" (`/domain-reconcile` faseado) |
| FR-5 / AC-5 | "Fase 4 — Manter o repositório de contexto atualizado" (link para seção existente) |
| FR-6 / AC-6 | Nenhuma edição em `docs/guia-repositorio-contexto.md` nesta feature |
| FR-7 / AC-7 | `sidebar_position: 2` na nova página; +1 nas 3 páginas existentes; `npm run typecheck`/`build` |
| FR-8 / AC-8 | Link novo em `docs/intro.mdx` |
| FR-9 / AC-9 | Revisão de tom antes de publicar |

## Constitution Compliance

- Princípio 1 (spec before code): feature segue Specify → Plan → Tasks antes da escrita.
- Princípio 5 (fidelidade ao design system): Markdown puro, task lists nativas do Docusaurus, sem CSS customizado.
- Quality Bar: `npm run typecheck` + `npm run build`; verificação visual manual (claro/escuro), com atenção às task lists (`- [ ]`), não usadas em nenhuma página anterior deste site.

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Formato de escrita | Runbook/checklist operacional | Tutorial narrativo por fases; How-To no modelo dos 2 guias | Escolha explícita do usuário entre as 3 opções apresentadas |
| Posição na sidebar | 2 (logo após "Introdução") | Depois dos guias/skills (posição 5) | Pedido explícito do usuário ("abaixo da introdução no menu") |
| Scaffold de pastas | Só nesta página | Também incorporar no guia de repositório de contexto | Escolha explícita do usuário — guia de contexto continua agnóstico de estrutura |
| Título | "Roadmap — implantar o framework num squad com sistemas distribuídos" | Manter o prefixo "Guia —" dos outros 3 documentos | O gênero é diferente (sequenciamento entre guias, não um guia autônomo) — "Roadmap" no título sinaliza isso ao leitor antes mesmo de abrir a página |
