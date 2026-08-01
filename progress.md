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
- [x] `001-tela-inicial`: home reconstruída a partir do rascunho — capa, problema, ideia central, ciclo, **transição e seção blueprint técnico (duas análises)**, mais o **indicador de registro (gauge)** ligado ao scroll
- [x] Tokens de design centralizados em `src/css/custom.css`; registro blueprint da home é sempre escuro (não depende do dark mode do site) — corrige a promessa "da visão executiva ao blueprint técnico" da capa, que antes não se cumpria
- [x] `npm run typecheck` e `npm run build` verdes
- [x] Harness SDD instalado via `lup-skills add sdd-harness-creator` e escalado (`CLAUDE.md`, `constitution.md`, `init.sh`, `specs/001-tela-inicial`)
- [x] `constitution.md` preenchida com stack real (TS/React/Docusaurus), regras de teste/build e "design system fidelity"
- [x] Scaffolding padrão do `create-docusaurus` removido: `blog/` (posts de exemplo), `docs/tutorial-basics/`, `docs/tutorial-extras/`, `src/pages/markdown-page.mdx`, imagens `undraw_*`/`docusaurus.png`/`docusaurus-social-card.jpg`/`favicon.ico`/`logo.svg` padrão; `blog: false` em `docusaurus.config.ts`; logo/favicon mínimos próprios em `static/img/`

### What's In Progress

- Nenhuma feature ativa no momento.

### What's Next

1. Abrir `002-*` para escrever o conteúdo real de `/docs/intro` e o restante do blueprint técnico (contenção de domínio, harness Speckit SDD, decisões finais — slides 8 a 11 do rascunho), hoje só um placeholder.
2. Se o projeto voltar a precisar de blog no futuro, reativar via `blog: {...}` no preset (hoje `blog: false`) com conteúdo real, não os posts de exemplo.

## Open Clarifications

Nenhuma pendente.

## Blockers / Risks

- Fontes (Archivo/Inter/IBM Plex Mono) carregadas via `@import` do Google Fonts em `custom.css` — dependência de rede em build/runtime; ver Risks em `specs/001-tela-inicial/plan.md`.
- `RegisterGauge` depende de `window`/`IntersectionObserver`, roda só em `useEffect` (client-side) — não afeta o build estático, mas sem JS o marcador fica parado em 0%.

## Decisions Made

- **Home como seções scrolláveis, não slides paginados**: reaproveita capa + seções de abertura do rascunho, sem a paginação por JS do slide deck original.
  - Context: home de site de docs precisa ser scrollável/indexável; paginação por slide não é padrão de navegação de documentação.
  - Constitution impact: nenhuma — consistente com o princípio 5 (fidelidade ao design system, não ao mecanismo de navegação).
- **Claro = "papel", escuro = "blueprint" (dark mode do site)** — mas **a seção de blueprint técnico da home é sempre escura, independente do dark mode**: são duas coisas diferentes. O dark mode é preferência do usuário (acessibilidade); o registro blueprint é conteúdo (como no rascunho, onde o slide muda de registro independente de qualquer toggle).
  - Context: a primeira versão só tinha conteúdo "papel" na home — a maioria dos visitantes (tema claro, padrão) nunca via nada em registro blueprint, quebrando a promessa da capa.
  - Constitution impact: nenhuma.
- **Blog desligado (`blog: false`), não só esvaziado**: remove a rota `/blog` inteira em vez de deixar o plugin ativo sem posts.
  - Context: usuário pediu para remover o scaffolding padrão do Docusaurus; um blog vazio ainda é scaffolding inacabado.
  - Constitution impact: nenhuma; reversível com uma linha quando houver conteúdo de blog real.

## Evidence of Completion

- [x] AC-1 verified: captura de tela `home-top3.png` — eyebrow, barra, título e subtítulo idênticos ao `#s1` do rascunho, fundo `--navy`
- [x] AC-2 verified: captura de tela `home-full.png` — 3 cards numerados ("O problema") e 2 painéis ("A ideia central") com o texto do rascunho
- [x] AC-3 verified: `index.module.css` revisado manualmente — todas as cores via `var(--...)`, nenhum hex hardcoded
- [x] AC-4 verified: `grep -o '\[data-theme=.dark.\]' build/assets/css/*.css` e `grep -o "2b0a13" build/assets/css/*.css` confirmam que as regras e a cor `--blue-bg` do registro "blueprint" estão no CSS compilado
- [x] AC-5 verified: `Hero` renderiza `Link to="/docs/intro"` (x2); rota existe em `docs/intro.mdx`
- [x] AC-6 verified: captura de tela `home-top3.png` mostra a barra "Visão executiva / Executivo / Blueprint técnico" com marcador visível abaixo da navbar
- [x] AC-7 verified: captura de tela `home-full.png` mostra "Por dentro do framework" (transição) e "Duas análises, quatro artefatos" com fundo escuro, grid e pipelines PB→PRD / ADR→ACs
- [x] AC-8 verified: `find docs static/img src/pages -type f` não lista mais nenhum arquivo de demonstração do Docusaurus; `curl -s http://localhost:3000/blog` cai na página "not found" renderizada no client (rota `/blog` não existe mais)
- [x] Coverage check clean: todas as ACs de `specs/001-tela-inicial/tasks.md` têm ≥1 task e toda task referencia uma AC

## Notes for Next Session

`./init.sh` roda `npm run typecheck` + `npm run build` — nenhum test runner configurado de propósito (site de conteúdo, ver `constitution.md`). Para a próxima feature, comece por `specs/002-<slug>/spec.md` seguindo o mesmo formato. Lembrete importante: `npm start` (dev server) é client-side-only (sem SSR) — para ver a página renderizada de verdade em screenshot headless, é preciso esperar o JS hidratar (`--virtual-time-budget`) ou usar o output de `npm run build` + `serve`, que já vem com o HTML totalmente renderizado.
