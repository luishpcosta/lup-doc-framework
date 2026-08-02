# Plan: Introdução — o que é o framework híbrido

**Feature ID:** 004-intro-framework
**Phase:** done
**Spec:** ./spec.md
**Last updated:** 2026-08-02

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

Reescrever `docs/intro.mdx` (arquivo já existente, front matter `sidebar_position: 1` mantido) substituindo o placeholder por conteúdo real em Markdown/MDX nativo do Docusaurus — sem componentes React novos, sem CSS hardcoded (constitution, princípio 5). Estrutura em seções curtas, cada uma mapeada 1:1 a uma FR, misturando visão de framework (arquitetura/artefatos/harness) e visão de gestão (motivação/decisões) na ordem em que um leitor sem contexto prévio consegue acompanhar: o que é → por que existe → como funciona (3 pilares) → o que falta decidir → para onde ir a seguir.

Nota pós-implementação (1): a seção "O problema que ainda não resolvemos" (estado atual/as-is, `as_is_metarepo_sdd_harness.svg`) foi escrita, verificada e depois removida a pedido explícito do usuário — ver Clarifications Log em `spec.md`.

Nota pós-implementação (2): usuário pediu validação de tom — a página deve ler como pitch de produto/solução personalizada por squad, não como documento interno de problemas/governança. Duas seções reescritas: "Por que o framework existe" (situação/complicação → proposta de valor) e "O que falta decidir" → renomeada "Como cada squad personaliza o framework" (pendência de gestão → dimensão de customização). Ver Clarifications Log em `spec.md`.

Nota pós-implementação (3): usuário apontou que a seção "Duas análises, uma história" descrevia "paralelo" como único modo de execução do Pilar 1. Reescrita para cobrir os 3 modos (paralelo, sequencial, início direto pela técnica em demandas puramente técnicas) — mudança de escopo "só texto" (Opção A, entre 3 opções apresentadas), replicada também em `framework-hibrido.html` (slides 5/6) e `docs/guia-repositorio-contexto.md`, fora do escopo desta feature mas parte do mesmo pedido. Ver Clarifications Log em `spec.md`.

Título do H1 mantido como "Introdução" (não muda a rota `/docs/intro`, nem o nome do link no navbar/sidebar).

## Architecture & Components

- `docs/intro.mdx` — reescrito por completo; único artefato de conteúdo desta feature.
- Nenhuma mudança em `sidebars.ts`, `docusaurus.config.ts`, `src/`, `static/`, ou nos dois guias práticos — os links de `docs/intro.mdx` para eles já existem (adicionados em `002`/`003`) e serão mantidos, só reposicionados dentro da nova estrutura.
- Nenhum diagrama/imagem nova — o SVG (`as_is_metarepo_sdd_harness.svg`) é usado só como fonte conceitual do texto, não embutido como imagem (mesma decisão implícita de `003`, que também só leu o SVG como referência).

## Data Model

Não aplicável — conteúdo estático.

## Interfaces / Contracts

- Rota pública: `/docs/intro` (inalterada).
- Fonte de verdade conceitual: `static/framework-hibrido.html` (slides 1–10, todos os `data-register`) e `as_is_metarepo_sdd_harness.svg` (estado atual/as-is, arquivo removido do repositório em 2026-08-02 a pedido do usuário — ver `progress.md`) — ambos lidos diretamente, não citados como arquivo no texto publicado (o leitor do site não precisa saber que a fonte é um rascunho HTML/SVG).

## Requirement Coverage

| Requirement | Addressed by |
|---|---|
| FR-1 / AC-1 | Parágrafo de abertura (substitui o parágrafo placeholder atual) |
| FR-2 / AC-2 | Seção "Por que o framework existe" — proposta de valor (3 benefícios) |
| FR-3 / AC-3 | Seção "Duas análises, uma história" — PB→PRD, ADR→ACs, os 3 modos de execução (paralelo/sequencial/técnico-first), cadeia de IDs |
| FR-4 / AC-4 | Seção "Onde o contexto vive" — contenção de domínio, `CONTEXT-MAP.md` |
| FR-5 / AC-5 | Seção "Como o código é gerado" — harness Speckit SDD no repo de serviço |
| FR-6 / AC-6 | Seção "Como cada squad personaliza o framework" — 4 dimensões de customização |
| FR-7 / AC-7 | Seção final "Para onde ir a seguir" — links para os dois guias + home |
| FR-8 / AC-8 | Reescrita completa do arquivo remove o placeholder por construção; verificado por `grep` + build |

## Constitution Compliance

- Princípio 1 (spec before code): feature segue Specify → Plan → Tasks antes da escrita, como `002`/`003`.
- Princípio 5 (fidelidade ao design system): Markdown/MDX puro, sem CSS/cores hardcoded — herda tokens de `src/css/custom.css` como as outras páginas de `docs/`.
- Quality Bar: `npm run typecheck` + `npm run build`; verificação visual manual (claro/escuro) via `npm run build && npm run serve`, mesmo processo de `002`/`003`.

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Formato do arquivo | Manter `.mdx` (já existente) | Renomear para `.md` puro como os guias | Trocar a extensão sem necessidade quebraria a URL/gerência do arquivo à toa; `.mdx` já funciona e não há necessidade de JSX embutido, mas não há razão para renomear um arquivo existente e estável |
| Nível de detalhe técnico | Introdutório — explica os 3 pilares em prosa curta, sem repetir exemplos de invocação de skill | Reproduzir os exemplos completos dos guias práticos aqui também | Duplicaria conteúdo já coberto por `002`/`003` e desalinha do papel da introdução (situar, não ensinar passo a passo) — Out of Scope explícito na spec |
| Imagem do SVG as-is | Não embutir a imagem, só descrever o problema em texto | Adicionar o SVG como imagem na página | SVG tem estilos inline pensados para o contexto em que foi gerado (fundo claro fixo), sem verificação prévia de como se comportaria em dark mode; manter como fonte conceitual (mesmo tratamento dado em `003`) evita esse risco sem perder a informação, que já é textual na spec |
