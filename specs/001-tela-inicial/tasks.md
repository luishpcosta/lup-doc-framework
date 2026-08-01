# Tasks: Tela inicial da documentação

**Feature ID:** 001-tela-inicial
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-01

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-1 | Extrair tokens de cor/fonte do rascunho para `src/css/custom.css`, com `[data-theme='dark']` mapeando para o registro "blueprint" | AC-3, AC-4 | done | `src/css/custom.css`; `grep -o "data-theme=[^]]*]" build/assets/css/*.css` confirma seletores `light`/`dark` no CSS compilado; `2b0a13` (blue-bg) presente no bundle |
| T-2 | Construir `Hero` (capa) em `index.tsx`/`index.module.css` com eyebrow, barra, título e subtítulo do rascunho | AC-1 | done | `npm run build` sem erros; captura de tela `home-top.png` confere texto/paleta idênticos ao `#s1` do rascunho |
| T-3 | Construir `ProblemSection` e `CentralIdeaSection` com o texto exato do rascunho | AC-2 | done | captura de tela `home-mid.png` mostra os 3 cards numerados e os 2 painéis com o texto do rascunho |
| T-4 | Adicionar CTAs na capa apontando para `/docs/intro` | AC-5 | done | `Hero` em `index.tsx` renderiza dois `Link` para `/docs/intro`; rota existe (`docs/intro.mdx`) |
| T-5 | Rodar verificação completa e confirmar que nenhuma cor é hardcoded fora de `custom.css` | AC-3 | done | `npm run typecheck` e `npm run build` (via `./init.sh`) passam; revisão manual de `index.module.css` confirma uso exclusivo de `var(--...)` |
| T-6 | Construir `RegisterGauge` (marcador ligado ao scroll + `IntersectionObserver`) e inserir no topo da home | AC-6, AC-7 | done | captura de tela `home-top3.png` mostra a barra "Visão executiva / Executivo / Blueprint técnico" com marcador na posição inicial |
| T-7 | Construir `TransitionSection` e `BlueprintSection` (registro sempre escuro, pipelines PB→PRD e ADR→ACs) e inseri-las após `CycleSection` | AC-7 | done | captura de tela `home-full.png` mostra "Por dentro do framework" e "Duas análises, quatro artefatos" renderizados com fundo `--blue-bg` e grid |
| T-8 | Remover blog de exemplo, docs tutorial-basics/tutorial-extras, `markdown-page.mdx` e imagens/branding padrão do Docusaurus; desligar `blog: false`; trocar logo/favicon | AC-8 | done | `find docs static/img src/pages -type f` não lista mais `tutorial-*`, `markdown-page.mdx` nem `undraw_*`/`docusaurus.png`/`favicon.ico`/social-card antigos; `curl localhost:3000/blog` cai na página "not found" client-side |
| T-9 | Reverificar build/typecheck após todas as mudanças acima | AC-1 a AC-8 | done | `npm run typecheck` e `npm run build` verdes (ver `./init.sh`) |

Status values: `todo` → `doing` → `done`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-2, AC-2: T-3, AC-3: T-1 + T-5, AC-4: T-1, AC-5: T-4, AC-6: T-6, AC-7: T-6 + T-7, AC-8: T-8
- Every task linked to an AC? yes
