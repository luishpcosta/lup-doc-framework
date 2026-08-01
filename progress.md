# Session Progress Log

## Current State

**Last Updated:** 2026-08-01
**Active Feature:** 001-tela-inicial — Tela inicial da documentação
**Active SDD Phase:** Verify (complete)
**Pending Gate:** none — feature closed

## Status

### What's Done

- [x] Repositório git inicializado (`main`), rascunho `framework-hibrido-rascunho.html` versionado
- [x] Projeto Docusaurus (classic, TypeScript) escalado na raiz do repo
- [x] `001-tela-inicial`: home reconstruída a partir do rascunho (capa, problema, ideia central, ciclo), tokens de design centralizados em `src/css/custom.css`, dark mode mapeado para o registro "blueprint"
- [x] `npm run typecheck` e `npm run build` verdes
- [x] Harness SDD instalado via `lup-skills add sdd-harness-creator` e escalado (`CLAUDE.md`, `constitution.md`, `init.sh`, `specs/001-tela-inicial`)
- [x] `constitution.md` preenchida com stack real (TS/React/Docusaurus), regras de teste/build e "design system fidelity"

### What's In Progress

- Nenhuma feature ativa no momento.

### What's Next

1. Abrir `002-*` para substituir o conteúdo tutorial padrão do Docusaurus (`docs/tutorial-basics`, `docs/tutorial-extras`) pela documentação real do framework híbrido (blueprint técnico: PB/PRD/ADR/AC, contenção de domínio, harness Speckit SDD — slides 7 a 11 do rascunho).
2. Avaliar se a home deve ganhar as seções restantes do rascunho (benefícios, transição) como página própria em `/docs` em vez de crescer ainda mais a home.

## Open Clarifications

Nenhuma pendente.

## Blockers / Risks

- Fontes (Archivo/Inter/IBM Plex Mono) carregadas via `@import` do Google Fonts em `custom.css` — dependência de rede em build/runtime; ver Risks em `specs/001-tela-inicial/plan.md`.

## Decisions Made

- **Home como seções scrolláveis, não slides paginados**: reaproveita só capa + 3 primeiras seções do rascunho, sem a paginação por JS do slide deck original.
  - Context: home de site de docs precisa ser scrollável/indexável; paginação por slide não é padrão de navegação de documentação.
  - Constitution impact: nenhuma — consistente com o princípio 5 (fidelidade ao design system, não ao mecanismo de navegação).
- **Claro = "papel", escuro = "blueprint"**: o alternador de tema nativo do Docusaurus assume os dois registros visuais do rascunho.
  - Context: reaproveita o toggle já existente do Docusaurus (`[data-theme='dark']`) em vez de construir um novo.
  - Constitution impact: nenhuma.

## Evidence of Completion

- [x] AC-1 verified: captura de tela `home-top.png` (viewport 1440x700) — eyebrow, barra, título e subtítulo idênticos ao `#s1` do rascunho, fundo `--navy`
- [x] AC-2 verified: captura de tela `home-mid.png` (viewport 1440x1200) — 3 cards numerados ("O problema") e 2 painéis ("A ideia central") com o texto do rascunho
- [x] AC-3 verified: `index.module.css` revisado manualmente — todas as cores via `var(--...)`, nenhum hex hardcoded
- [x] AC-4 verified: `grep -o '\[data-theme=.dark.\]' build/assets/css/*.css` e `grep -o "2b0a13" build/assets/css/*.css` confirmam que as regras e a cor `--blue-bg` do registro "blueprint" estão no CSS compilado
- [x] AC-5 verified: `Hero` renderiza `Link to="/docs/intro"` (x2); rota existe em `docs/intro.mdx`
- [x] Coverage check clean: todas as ACs de `specs/001-tela-inicial/tasks.md` têm ≥1 task e toda task referencia uma AC

## Notes for Next Session

`./init.sh` roda `npm run typecheck` + `npm run build` — nenhum test runner configurado de propósito (site de conteúdo, ver `constitution.md`). Para a próxima feature, comece por `specs/002-<slug>/spec.md` seguindo o mesmo formato; não pule o gate de Tasks antes de tocar em `docs/tutorial-*`.
