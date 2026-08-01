# Tasks: Tela inicial da documentação

**Feature ID:** 001-tela-inicial
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-01

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks (histórico — T-1 a T-9, recriação em React)

Superseded por T-10 a T-13 abaixo. Mantidas para histórico/auditoria — não refletem o código atual.

| ID | Task | Satisfies (histórico) | Status | Evidence |
|---|---|---|---|---|
| T-1 | Extrair tokens de cor/fonte do rascunho para `src/css/custom.css` | ~~AC-3~~, ~~AC-4~~ | superseded | tokens de cor mantidos em `custom.css`; mapeamento `[data-theme='dark']` → "blueprint" não é mais usado pela capa (agora é iframe) |
| T-2 | Construir `Hero` (capa) em React | ~~AC-1~~ | superseded | componente deletado — capa agora é `<iframe>` |
| T-3 | Construir `ProblemSection`/`CentralIdeaSection` em React | ~~AC-2~~ | superseded | componentes deletados — conteúdo já existe no arquivo embutido |
| T-4 | CTAs na capa React apontando para `/docs/intro` | ~~AC-5~~ | superseded | ver T-12 (navegação agora é nativa do arquivo + navbar) |
| T-5 | Verificar ausência de cor hardcoded na v1 | ~~AC-3~~ | superseded | não aplicável ao iframe |
| T-6 | Construir `RegisterGauge` (scroll + `IntersectionObserver`) | ~~AC-6~~, ~~AC-7~~ | superseded | componente deletado — o arquivo embutido tem seu próprio gauge nativo |
| T-7 | Construir `TransitionSection`/`BlueprintSection` à mão | ~~AC-7~~ | superseded | componentes deletados — conteúdo já existe no arquivo embutido |
| T-8 | Remover scaffolding padrão do Docusaurus | AC-8 | done | ver evidência em T-11 (ainda válida) |
| T-9 | Reverificar build/typecheck (v2) | — | superseded | ver T-13 |

## Tasks (atuais — embed via iframe, footer, fontes sitewide)

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-10 | Copiar `framework-hibrido.html` para `static/` e reescrever `index.tsx`/`index.module.css` para embutir via `<iframe>` em tela cheia; deletar os componentes React da recriação anterior | AC-1 | done | `static/framework-hibrido.html` existe; `src/pages/index.tsx` só renderiza `<iframe>`; captura `home-iframe.png` é pixel-idêntica ao arquivo original aberto direto |
| T-11 | Remover scaffolding padrão do Docusaurus (blog, tutorial docs, markdown-page, imagens/logo/favicon) | AC-8 | done | `find docs static/img src/pages -type f` não lista mais nenhum arquivo de demonstração do Docusaurus |
| T-12 | Remover `footer` de `themeConfig` em `docusaurus.config.ts` | AC-9 | done | captura `docs-intro.png` não mostra nenhum rodapé abaixo do conteúdo |
| T-13 | Confirmar que as fontes (Archivo/Inter/IBM Plex Mono) já se aplicam fora da home; rodar `npm run typecheck` + `npm run build` | AC-3 | done | captura `docs-intro.png` mostra título em Archivo e corpo em Inter em `/docs/intro`; `./init.sh` verde |
| T-14 | Ajustar `.gauge-marker` em `static/framework-hibrido.html`: tentativa 1 (anel `box-shadow` escuro+claro mantendo navy/branco) rejeitada pelo usuário; trocado para `background` fixo dourado (`var(--purple)`), sem transição de cor. **Nota:** diagnóstico incorreto — o marcador não era o problema real (ver T-15); mudança mantida (usuário não pediu reversão), mas o bug reportado só foi corrigido em T-15 | ~~AC-10~~ (retirado; ver T-15) | done | captura `gauge-gold.png` mostra o marcador como ponto dourado sólido |
| T-15 | Corrigir `.gauge-track`: metade escura usava `var(--blue-bg)`, a mesma cor exata do fundo do body nos slides de registro blueprint — a trilha desaparecia contra o próprio fundo. Trocado para `var(--blue-card)` + borda dourada sutil (`box-shadow`) sempre visível | AC-10 | done | captura `track-fix-s7.png` (arquivo de teste com slide 7 forçado ativo) mostra a trilha visível em toda a extensão contra o fundo `--blue-bg`; `npm run build` verde |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-10, AC-3: T-13, AC-5: T-10 (navegação nativa do arquivo) + navbar existente, AC-8: T-11, AC-9: T-12, AC-10: T-15 (T-14 mantida como diagnóstico incorreto, não satisfaz AC-10)
- Every task linked to an AC? yes (tasks históricas T-1–T-9 marcadas `superseded` e ligadas aos ACs que tinham antes de serem retirados da spec)
