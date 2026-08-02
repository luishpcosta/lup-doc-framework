# Session Progress Log

## Current State

**Last Updated:** 2026-08-01
**Active Feature:** 002-guia-agentes-ia — Guia: preparar e usar um repositório de aplicação com agentes de IA de desenvolvimento
**Active SDD Phase:** Verify (complete)
**Pending Gate:** none — feature closed

## Status

### What's Done

- [x] Repositório git inicializado (`main`), rascunho `framework-hibrido.html` versionado
- [x] Projeto Docusaurus (classic, TypeScript) escalado na raiz do repo
- [x] `001-tela-inicial`: **três iterações.** v1 recriou a capa em React; v2 tentou consertar a v1 adicionando um gauge e uma seção blueprint feitos à mão; **v3 (atual) abandonou a recriação** — a home agora embute `framework-hibrido.html` via `<iframe>` (fidelidade garantida por ser o mesmo arquivo)
- [x] Footer removido de `themeConfig` (nenhuma página do site mostra rodapé)
- [x] Fontes do rascunho (Archivo/Inter/IBM Plex Mono) confirmadas aplicadas em todo o site via `--ifm-*-font-family` em `custom.css` (já cascateava, não só na home)
- [x] `npm run typecheck` e `npm run build` verdes
- [x] Harness SDD instalado via `lup-skills add sdd-harness-creator` e escalado (`CLAUDE.md`, `constitution.md`, `init.sh`, `specs/001-tela-inicial`)
- [x] `constitution.md` preenchida com stack real (TS/React/Docusaurus), regras de teste/build e "design system fidelity"
- [x] Scaffolding padrão do `create-docusaurus` removido: `blog/` (posts de exemplo), `docs/tutorial-basics/`, `docs/tutorial-extras/`, `src/pages/markdown-page.mdx`, imagens `undraw_*`/`docusaurus.png`/`docusaurus-social-card.jpg`/`favicon.ico`/`logo.svg` padrão; `blog: false` em `docusaurus.config.ts`; logo/favicon mínimos próprios em `static/img/`
- [x] Arquivo de referência consolidado numa cópia só: `framework-hibrido.html` agora vive **apenas** em `static/` (a cópia na raiz do repo foi removida) — resolve o risco de "duas cópias divergindo" registrado antes
- [x] Marcador do gauge (`.gauge-marker`) ajustado para dourado fixo (`var(--purple)`) — feito por diagnóstico inicial errado (achando que era o marcador que sumia); mudança mantida (não revertida), mas **não** era o bug real
- [x] **Bug real, corrigido**: a trilha do gauge (`.gauge-track`) usava `var(--blue-bg)` na metade escura — a mesma cor exata do fundo do body nos slides de registro blueprint, então essa metade da trilha desaparecia contra o próprio fundo ("começa clara, depois fica com a cor muito próxima da do fundo", nas palavras do usuário). Corrigido trocando para `var(--blue-card)` + uma borda dourada sutil sempre visível
- [x] Botões de navegação (`.nav-btn`, ‹ ›) na capa corrigidos: usavam `color:inherit`, herdando o `--paper-ink` escuro do body contra o fundo `--navy` de `#s1` — quase invisíveis. Adicionada classe `body.cover` (só ativa quando o slide `#s1` está ativo) forçando `color:#fff` nos botões

### What's In Progress

- Nenhuma feature ativa no momento.

### What's Next

1. Escrever o conteúdo técnico completo do blueprint (contenção de domínio, harness Speckit SDD, decisões finais — slides 8 a 11 do rascunho) em `/docs/intro`, como Markdown/MDX nativo do Docusaurus (não como mais um HTML embutido). `/docs/intro` continua um placeholder.
2. Se o projeto voltar a precisar de blog no futuro, reativar via `blog: {...}` no preset (hoje `blog: false`) com conteúdo real, não os posts de exemplo.

### 002-guia-agentes-ia — concluída

- [x] Nova página única `docs/guia-agentes-ia-app.md` ("Guia — preparar e usar um repositório de aplicação com agentes de IA de desenvolvimento", renomeada a partir de `guia-agentes-ia.md` para deixar o escopo explícito): resumo executivo + tabela de skills (`/sdd-harness-creator`, `/codefy`), preparação do repositório (brownfield/greenfield, recomendação de modelo forte no brownfield, exemplos de invocação), encadeamento de specs com `/codefy`, exemplos de uso do dia a dia, e dicas para `AGENTS.md`/`CLAUDE.md` (modos de trabalho rápido/faseado, review automático de PR via hook)
- [x] `docs/intro.mdx` linkado para a nova página
- [x] `npm run typecheck` e `npm run build` verdes
- [x] Verificação visual em modo claro e escuro via captura de tela (Chrome headless + CDP `Emulation.setEmulatedMedia`, já que `respectPrefersColorScheme: true` não é afetado por flags de linha de comando comuns) — paleta/tipografia do design system aplicadas corretamente, sem footer, sidebar/TOC corretos em ambos os modos
- [x] Revisão de texto: nenhuma URL/nome de repositório de origem das skills `/codefy`/`/blueprintfy` citado (pedido explícito do usuário)

## Open Clarifications

Nenhuma pendente.

## Blockers / Risks

- Iframe é pior para SEO/acessibilidade do que HTML nativo da página — aceito conscientemente para priorizar fidelidade visual; ver Risks em `specs/001-tela-inicial/plan.md`.
- Fontes carregadas via `@import` do Google Fonts em `custom.css` — dependência de rede em build/runtime.

## Decisions Made

- **Parar de recriar a capa em React; embutir o HTML original via `<iframe>`.**
  - Context: duas rodadas de recriação manual (v1: capa/problema/ideia central/ciclo; v2: + gauge + seção blueprint) ainda não bateram com o original na avaliação do usuário ("ainda não ficou bom"). Embutir o arquivo elimina a categoria de bug "a réplica diverge do original" por definição.
  - Constitution impact: nenhuma. Os componentes React da recriação (`Hero`, `ProblemSection`, `CentralIdeaSection`, `CycleSection`, `TransitionSection`, `BlueprintSection`, `RegisterGauge`) foram deletados do código, não deixados como dead code.
- **Footer removido sitewide**, não só na home.
  - Context: pedido explícito do usuário; `themeConfig.footer` é global no Docusaurus classic theme, então "remover o footer" só é possível globalmente sem swizzle de componente.
  - Constitution impact: nenhuma.
- **Fontes: nenhuma mudança de código**, só verificação.
  - Context: `--ifm-font-family-base`/`--ifm-heading-font-family`/`--ifm-font-family-monospace` já estavam em `:root` desde a v1 e o Infima já as aplica globalmente (navbar, sidebar, docs); o pedido do usuário foi satisfeito confirmando isso via captura de tela de `/docs/intro`, não escrevendo CSS novo.
  - Constitution impact: nenhuma.
- **Consolidar `framework-hibrido.html` numa cópia só, em `static/`** (arquivo removido da raiz do repo).
  - Context: resolve o risco "duas cópias podem divergir" registrado na iteração anterior deste plano — agora `static/framework-hibrido.html` é a única fonte de verdade.
  - Constitution impact: nenhuma.
- **Gauge-marker: cor dourada fixa (`var(--purple)`), sem transição de cor.**
  - Context: primeira reação ao "o ponto parece flutuando" — diagnóstico que se mostrou **errado** (ver decisão seguinte). Mantida mesmo assim (usuário não pediu para reverter, e não piora nada), mas essa mudança sozinha não resolveu a reclamação original.
  - Constitution impact: nenhuma.
- **Gauge-track: `var(--blue-card)` em vez de `var(--blue-bg)` na metade escura, + borda dourada sutil sempre visível.**
  - Context: o usuário corrigiu meu diagnóstico — "me referia na transição do traço que começa claro depois fica com a cor muito próxima com a do fundo, a bolinha já estava certa". A trilha (não o marcador) usava `var(--blue-bg)` no lado escuro, exatamente a cor do fundo do body nos slides de registro blueprint — a trilha sumia contra o próprio fundo assim que o visitante entrava nesse registro. `--blue-card` é um tom distinto o suficiente de `--blue-bg` para nunca coincidir com o fundo da página.
  - Constitution impact: nenhuma. FR-10/AC-10 em `spec.md` foram reescritos para descrever a trilha corretamente (estavam descrevendo o marcador, por causa do diagnóstico errado inicial).
- **`.nav-btn` na capa: classe `body.cover` (JS, ligada a `slides[idx].id === 's1'`) forçando `color:#fff`.**
  - Context: pedido explícito do usuário ("esse botão na primeira página precisa ser claro branco"). Causa raiz: `.nav-btn` usa `color:inherit`/`border:1px solid currentColor` sem override — funciona nos outros slides (herdam `--paper-ink`/`--blue-ink` conforme o registro, ambos com contraste OK contra `--paper-bg`/`--blue-bg`), mas `#s1` tem um fundo `--navy` especial fora desse esquema claro/escuro, então o botão herdava uma cor escura contra um fundo também escuro. `nav-left`/`.dot` já tinham cor explícita (`--paper-muted`), não sofriam do mesmo bug — por isso o fix ficou restrito só ao botão, como pedido.
  - Constitution impact: nenhuma.

## Evidence of Completion

- [x] AC-1 verified: captura de tela `home-iframe.png` — capa é pixel-idêntica ao arquivo original (mesmo arquivo, via iframe), incluindo gauge nativo e "01/11 · ← → para navegar"
- [x] AC-3 verified: captura de tela `docs-intro.png` — título "Introdução" em Archivo, corpo em Inter, em `/docs/intro` (fora da home)
- [x] AC-5 verified: navegação nativa do arquivo embutido (setas/dots) + navbar do site para `/docs/intro`
- [x] AC-8 verified: `find docs static/img src/pages -type f` não lista nenhum arquivo de demonstração do Docusaurus; `curl -s http://localhost:3000/blog` cai na página "not found" client-side
- [x] AC-9 verified: captura de tela `docs-intro.png` não mostra nenhum rodapé abaixo do conteúdo
- [x] AC-10 verified: captura de tela de um arquivo de teste com o slide 7 (registro blueprint) forçado ativo mostra a trilha do gauge visível em toda a extensão contra o fundo `--blue-bg`
- [x] AC-11 verified: captura de tela `nav-btn-fix.png` mostra o botão "›" em branco na capa, contraste claro contra o fundo `--navy`
- [x] Coverage check clean: todas as ACs atuais (`specs/001-tela-inicial/tasks.md`, tabela "Tasks (atuais)") têm ≥1 task e toda task referencia uma AC; tasks da v1/v2 marcadas `superseded`, mantidas só para histórico

### 002-guia-agentes-ia

- [x] AC-1 verified: `docs/guia-agentes-ia-app.md` seção "1. Resumo" — capturas `guia-full-light.png`/`guia-full-dark.png`/`guia-app-top.png`
- [x] AC-2 verified: subseção "Brownfield vs. greenfield" com recomendação explícita de Opus no caminho brownfield
- [x] AC-3 verified: 3 blocos de exemplo `/sdd-harness-creator` (2 brownfield + 1 greenfield)
- [x] AC-4 verified: subseção "Encadeando specs com `/codefy`" com 2 blocos de exemplo
- [x] AC-5 verified: seção "3. Uso no dia a dia" com 6 exemplos numerados
- [x] AC-6 verified: seção "4. Dicas para AGENTS.md/CLAUDE.md" com os dois subtópicos pedidos
- [x] AC-7 verified: `npm run typecheck` e `npm run build` verdes; rota `/docs/guia-agentes-ia-app` alcançável pela sidebar autogerada e linkada de `docs/intro.mdx`
- [x] AC-8 verified: revisão manual do texto final — nenhuma URL/nome de repositório de origem das skills
- [x] AC-9 verified: usuário observou que o guia é específico para repositório de aplicação; arquivo renomeado (`git mv`) para `guia-agentes-ia-app.md`, título/H1 e frase de abertura deixam o escopo explícito; captura `guia-app-top.png` confirma título/breadcrumb/sidebar
- [x] Coverage check clean: `specs/002-guia-agentes-ia/tasks.md` — toda AC tem ≥1 task, toda task referencia uma AC

## Notes for Next Session

`./init.sh` roda `npm run typecheck` + `npm run build` — nenhum test runner configurado de propósito (site de conteúdo, ver `constitution.md`). Para a próxima feature, comece por `specs/003-<slug>/spec.md` seguindo o mesmo formato.

Para verificar dark mode em captura de tela headless: `docusaurus.config.ts` tem `colorMode.respectPrefersColorScheme: true`, mas flags de CLI do Chrome (`--blink-settings=preferredColorScheme=N`) não afetam esse `matchMedia` de forma confiável nesta versão do Chrome. O que funcionou: abrir `--remote-debugging-port`, conectar via WebSocket nativo do Node (`node >=22`, sem dependência externa) e chamar `Emulation.setEmulatedMedia` com `{name: 'prefers-color-scheme', value: 'dark'}` antes de `Page.navigate` + `Page.captureScreenshot`. Script de referência descartável ficou em `/tmp` (scratchpad da sessão), não versionado.

Lembretes importantes desta sessão:
- `npm start` (dev server) é client-side-only (sem SSR) — para ver a página renderizada de verdade em screenshot headless, é preciso esperar o JS hidratar (`--virtual-time-budget=8000 --run-all-compositor-stages-before-draw`) ou usar o output de `npm run build` + `serve`, que já vem com o HTML totalmente renderizado.
- **Não tente recriar `framework-hibrido.html` em React de novo.** Já foram duas tentativas rejeitadas. Se a capa precisar mudar, edite o HTML original e copie para `static/`, ou (melhor, se/quando isso incomodar) migre o conteúdo do HTML para Markdown/MDX nativo do Docusaurus — mas isso é uma decisão consciente futura, não um retorno silencioso à recriação manual.
