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

## Acceptance Criteria

- **AC-1** — Given a tela inicial carregada em modo claro, when o visitante observa a capa, then eyebrow, barra de título, `h1` e subtítulo aparecem com o texto e a paleta bordô idênticos ao `#s1` do rascunho. _(satisfies FR-1)_
- **AC-2** — Given a tela inicial, when o visitante rola a página, then as seções "O problema" (3 cards numerados) e "A ideia central" (dois painéis) aparecem com o mesmo texto do rascunho. _(satisfies FR-2)_
- **AC-3** — Given qualquer outra página do site, when ela referencia uma cor ou fonte da identidade visual, then ela usa uma custom property definida em `src/css/custom.css`, nunca um valor hardcoded. _(satisfies FR-3)_
- **AC-4** — Given o visitante alterna para o tema escuro, when a página re-renderiza, then o plano de fundo das seções de conteúdo muda para os tons do registro "blueprint" (`--blue-bg`, `--blue-card`) sem quebrar contraste. _(satisfies FR-4)_
- **AC-5** — Given a tela inicial, when o visitante clica em "Começar a leitura" ou "Ver o blueprint técnico", then é levado para `/docs/intro`. _(satisfies FR-5)_

## Edge Cases

- Viewport estreito (mobile): cards e painéis empilham em coluna única (`flex-wrap: wrap`) sem overflow horizontal.
- `prefers-reduced-motion` ou ausência de JS: o conteúdo estático deve permanecer legível (sem animação obrigatória para revelar texto).

## Out of Scope (Non-Goals)

- Não é objetivo desta feature clonar as 11 slides completas do rascunho (ciclo, pipeline técnico, árvore de repositório, decisões finais) — apenas capa + problema + ideia central + ciclo foram trazidos como abertura. Slides adicionais viram conteúdo de `/docs`, não da home.
- Não altera o conteúdo tutorial padrão do Docusaurus em `docs/tutorial-basics` e `docs/tutorial-extras` (fora de escopo; feature futura substitui pelo conteúdo real).

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-01 | Clonar a apresentação de 11 slides inteira ou só a abertura? | Só a abertura (capa + problema + ideia central + ciclo); o restante vira conteúdo de `/docs` em feature futura. |
