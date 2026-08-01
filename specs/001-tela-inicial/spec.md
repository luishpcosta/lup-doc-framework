# Spec: Tela inicial da documentação

**Feature ID:** 001-tela-inicial
**Phase:** done
**Owner:** luishpcosta
**Last updated:** 2026-08-01

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those for `plan.md`.

## Problem / Motivation

A documentação do framework híbrido precisa de uma porta de entrada que transmita, já na primeira tela, a mesma identidade visual e a mesma narrativa (executivo → blueprint técnico) usadas em `framework-hibrido-rascunho.html`. Sem isso, a documentação nasce genérica (template padrão do Docusaurus) e desconectada do material que já foi validado com o negócio.

## User Stories

- Como visitante executivo, quero abrir a documentação e reconhecer imediatamente a mesma linguagem visual e o mesmo pitch do rascunho, para confiar que é a mesma iniciativa.
- Como membro técnico, quero que a tela inicial já aponte para a documentação detalhada (`/docs/intro`), para não precisar procurar onde o conteúdo técnico começa.
- Como qualquer visitante, quero poder alternar entre modo claro e escuro sem que a identidade visual (paleta, tipografia) se quebre.

## Functional Requirements

- FR-1: A tela inicial deve reproduzir a capa do rascunho: eyebrow, barra de título, título principal e subtítulo, com o mesmo texto e a mesma paleta bordô (`--navy`).
- FR-2: A tela inicial deve apresentar, abaixo da capa, ao menos as seções "O problema" e "A ideia central" do rascunho, com o mesmo texto.
- FR-3: A paleta, tipografia (Archivo/Inter/IBM Plex Mono) e os tokens de cor do rascunho devem estar disponíveis globalmente para reutilização em outras páginas.
- FR-4: O alternador de tema nativo do Docusaurus deve mapear para os dois registros do rascunho ("papel" no claro, "blueprint" no escuro).
- FR-5: A tela inicial deve oferecer um caminho claro (CTA) para a documentação em `/docs/intro`.
- FR-6: A promessa da capa ("da visão executiva ao blueprint técnico") precisa ser visível e cumprida na própria home, não apenas em texto: um indicador de registro (gauge) fixo no topo deve mostrar em qual ponto do espectro executivo→blueprint o visitante está.
- FR-7: A home deve incluir, além do conteúdo executivo (capa, problema, ideia central, ciclo), uma seção real em registro "blueprint técnico" (fundo escuro, grid, cor de destaque), reproduzindo a transição e a primeira seção técnica do rascunho — não apenas uma menção textual.
- FR-8: O site não deve conter o scaffolding de demonstração padrão do `create-docusaurus` (blog de exemplo, tutorial docs, página markdown de exemplo, imagens/logo/favicon genéricos do Docusaurus).

## Acceptance Criteria

- **AC-1** — Given a tela inicial carregada em modo claro, when o visitante observa a capa, then eyebrow, barra de título, `h1` e subtítulo aparecem com o texto e a paleta bordô idênticos ao `#s1` do rascunho. _(satisfies FR-1)_
- **AC-2** — Given a tela inicial, when o visitante rola a página, then as seções "O problema" (3 cards numerados) e "A ideia central" (dois painéis) aparecem com o mesmo texto do rascunho. _(satisfies FR-2)_
- **AC-3** — Given qualquer outra página do site, when ela referencia uma cor ou fonte da identidade visual, then ela usa uma custom property definida em `src/css/custom.css`, nunca um valor hardcoded. _(satisfies FR-3)_
- **AC-4** — Given o visitante alterna para o tema escuro, when a página re-renderiza, then o plano de fundo das seções de conteúdo muda para os tons do registro "blueprint" (`--blue-bg`, `--blue-card`) sem quebrar contraste. _(satisfies FR-4)_
- **AC-5** — Given a tela inicial, when o visitante clica em "Começar a leitura" ou "Ver o blueprint técnico", then é levado para `/docs/intro`. _(satisfies FR-5)_
- **AC-6** — Given a home carregada, when o visitante olha para o topo (abaixo da navbar), then vê uma barra com rótulos "Visão executiva" / "Blueprint técnico" e um marcador que se move conforme o scroll da página. _(satisfies FR-6)_
- **AC-7** — Given o visitante rola até o fim da home, when a seção de blueprint técnico entra na tela, then o fundo muda para o registro escuro (`--blue-bg` + grid) independente do tema claro/escuro do site, mostrando os pipelines PB→PRD e ADR→ACs, e o marcador do gauge assume o rótulo "Blueprint técnico". _(satisfies FR-6, FR-7)_
- **AC-8** — Given o repositório após o setup inicial, when se lista `blog/`, `docs/tutorial-basics/`, `docs/tutorial-extras/`, `src/pages/markdown-page.mdx` e as imagens `undraw_*`/`docusaurus.png`/`docusaurus-social-card.jpg`/`favicon.ico`/`logo.svg` originais, then nenhum desses existe mais no repositório. _(satisfies FR-8)_

## Edge Cases

- Viewport estreito (mobile): cards e painéis empilham em coluna única (`flex-wrap: wrap`) sem overflow horizontal.
- `prefers-reduced-motion` ou ausência de JS: o conteúdo estático deve permanecer legível (sem animação obrigatória para revelar texto); o marcador do gauge simplesmente não se move sem JS, mas os rótulos estáticos continuam legíveis.
- SSR/build estático: o gauge depende de `window`/`IntersectionObserver`, só roda em `useEffect` (client-side); o build (`docusaurus build`) não pode quebrar por isso.

## Out of Scope (Non-Goals)

- Não é objetivo desta feature clonar as 11 slides completas do rascunho (árvore de repositório, harness Speckit SDD, decisões finais) — capa + problema + ideia central + ciclo + transição + a primeira seção blueprint (duas análises) foram trazidos como abertura. Slides restantes (8 a 11) viram conteúdo de `/docs`, não da home.
- Não escreve o conteúdo real de `/docs/intro` (documentação técnica completa) — fica como placeholder apontando para o que falta; é feature futura.
- Não reintroduz um blog: o preset foi desligado (`blog: false`) em vez de deixado com conteúdo de exemplo. Reativar blog com conteúdo real é decisão futura, não coberta aqui.

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-01 | Clonar a apresentação de 11 slides inteira ou só a abertura? | Só a abertura (capa + problema + ideia central + ciclo); o restante vira conteúdo de `/docs` em feature futura. |
| 2026-08-01 | A capa perdeu a referência ao "blueprint técnico" — o que fazer? | A promessa textual da capa não bastava: adicionar um indicador de registro (gauge) sempre visível + uma seção de conteúdo real em registro blueprint (transição + duas análises), para a home efetivamente ir do executivo ao técnico, não só mencionar isso em uma frase. |
| 2026-08-01 | Remover o scaffolding padrão do Docusaurus — o que inclui? | Blog de exemplo (posts, authors.yml, tags.yml) desligado via `blog: false`; docs tutorial-basics/tutorial-extras removidos; `markdown-page.mdx` removido; imagens/logo/favicon genéricos do Docusaurus substituídos por um logo/favicon mínimo na paleta do projeto. |
