# Tasks: Tela inicial da documentação

**Feature ID:** 001-tela-inicial
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-02

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
| T-16 | Corrigir `.nav-btn` (botões ‹ ›) na capa: usava `color:inherit`, herdando a cor escura do body (`--paper-ink`) contra o fundo `--navy` de `#s1`, quase invisível. Adicionada classe `body.cover` (toggled em `goTo()` quando `slides[idx].id === 's1'`) com `.nav-btn{ color:#fff }` | AC-11 | done | captura `nav-btn-fix.png` mostra o botão "›" em branco, com contraste claro contra o fundo navy; `npm run build` verde |
| T-17 | Revisar o texto dos 10 slides de `framework-hibrido.html` procurando tom que pudesse prejudicar a imagem do framework; reescrever slide 3 (título + card 3), legenda da cadeia de IDs no slide 7, e título/cards do slide 10 | AC-12 | done | diff de `static/framework-hibrido.html` mostra só as 4 mudanças textuais identificadas (slides 3, 7, 10); slides 2/5/6/8/9 avaliados e mantidos |
| T-18 | Rodar `npm run typecheck` + `npm run build`; verificação visual dos slides 3, 7 e 10 forçando cada um ativo (`goTo(N)`) via Chrome headless | AC-12 | done | `npm run typecheck`/`build` verdes; capturas `fh-s3.png`/`fh-s7.png`/`fh-s10.png` — layout intacto (cards não estouram), texto novo renderizado corretamente em ambos os registros (papel/blueprint) |
| T-19 | Reescrever card 1 do slide 2 ("IA entra em cada etapa" → "IA usada para performance pessoal"), a pedido explícito do usuário, para remeter ao uso individual/não estruturado de IA hoje; rodar `npm run typecheck` + `npm run build`; verificação visual do slide 2 forçando `goTo(1)` | AC-12 | done | `npm run typecheck`/`build` verdes; captura `fh-s2.png` — layout do card intacto, texto novo renderizado corretamente |
| T-20 | Corrigir `.dot.active` na capa: usava `background:var(--navy)`, a mesma cor do fundo de `#s1` — o dot do slide ativo desaparecia contra o próprio fundo. Adicionada regra `body.cover .dot.active{ background:#fff; }`, mesma técnica já usada pelo `.nav-btn` (T-16) | AC-13 | done | captura `home-dot-fix.png` mostra o primeiro dot em branco, com contraste claro contra o fundo navy da capa; `npm run typecheck`/`build` verdes |
| T-21 | Reescrever slide 6 (subtítulo + `rule-note`) para citar os 3 modos de execução das duas análises (paralelo/sequencial/técnico-first), a pedido do usuário — Opção A (só texto, sem novo elemento visual, slide 5/diagrama `⇄` não alterado) | AC-14 | done | `static/framework-hibrido.html` slide 6: `p.slide-sub` e `p.rule-note` reescritos |
| T-22 | Rodar `npm run typecheck` + `npm run build` após T-21 | AC-14 | done | `npm run typecheck`/`build` verdes |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-10, AC-3: T-13, AC-5: T-10 (navegação nativa do arquivo) + navbar existente, AC-8: T-11, AC-9: T-12, AC-10: T-15 (T-14 mantida como diagnóstico incorreto, não satisfaz AC-10), AC-11: T-16, AC-12: T-17/T-18/T-19, AC-13: T-20, AC-14: T-21/T-22
- Every task linked to an AC? yes (tasks históricas T-1–T-9 marcadas `superseded` e ligadas aos ACs que tinham antes de serem retirados da spec)
