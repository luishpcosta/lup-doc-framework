# Session Progress Log

## Current State

**Last Updated:** 2026-08-02
**Active Feature:** 003-guia-repositorio-contexto — Guia — preparar e usar um repositório de contexto (seção 5 adicionada)
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

1. Se o projeto voltar a precisar de blog no futuro, reativar via `blog: {...}` no preset (hoje `blog: false`) com conteúdo real, não os posts de exemplo.
2. **`/codefy` em `docs/guia-agentes-ia-app.md` — discrepância avaliada e decisão registrada (2026-08-02).** `ai-lup-skills/skills/codefy/SKILL.md` descreve `/codefy` como "camada fina" que repassa/relay para o Modo 1 (bootstrap) do `/blueprintfy` — o usuário confirmou que é assim mesmo que deve ser usado a partir de um repositório de aplicação (o usuário do framework não precisa saber que por baixo existe um `/blueprintfy`; a skill cobre explicitamente o cenário brownfield "código em produção"). Decisão: **manter a descrição atual no guia de aplicação como está** — não mover nem reescrever. Única nuance ainda não reconciliada: o `SKILL.md` descreve o trabalho como bootstrap **único** ("Fim do trabalho do Codefy": sem papel depois que `CONTEXT-MAP.md` existe, não precisa ser invocado de novo), enquanto o guia descreve como "processo contínuo, brownfield" — não bloqueante, não alterado por decisão explícita do usuário.

### 002-guia-agentes-ia — concluída

- [x] Nova página única `docs/guia-agentes-ia-app.md` ("Guia — preparar e usar um repositório de aplicação", renomeada a partir de `guia-agentes-ia.md` para deixar o escopo explícito): resumo executivo + tabela de skills (`/sdd-harness-creator`, `/codefy`), preparação do repositório (brownfield/greenfield, recomendação de modelo forte no brownfield, exemplos de invocação), encadeamento de specs com `/codefy`, exemplos de uso do dia a dia, e dicas para `AGENTS.md`/`CLAUDE.md` (modos de trabalho rápido/faseado, review automático de PR via hook)
- [x] `docs/intro.mdx` linkado para a nova página
- [x] `npm run typecheck` e `npm run build` verdes
- [x] Verificação visual em modo claro e escuro via captura de tela (Chrome headless + CDP `Emulation.setEmulatedMedia`, já que `respectPrefersColorScheme: true` não é afetado por flags de linha de comando comuns) — paleta/tipografia do design system aplicadas corretamente, sem footer, sidebar/TOC corretos em ambos os modos
- [x] Revisão de texto: nenhuma URL/nome de repositório de origem das skills `/codefy`/`/blueprintfy` citado (pedido explícito do usuário)
- [x] Reescrita no modelo **How-To Guide (Diátaxis) + minimalismo instrucional (Carroll)**: usuário pediu opções de técnica de escrita/método de documentação; apresentadas 3 opções de framework (Diátaxis How-To, Runbook, Reference) × 3 técnicas (minimalismo, pirâmide invertida, progressive disclosure); usuário escolheu Diátaxis How-To + minimalismo. "1. Resumo" virou parágrafo curto + lista de definição (era tabela com células longas), "2. Preparação do repositório" → "2. Como preparar o repositório", bullets de brownfield/greenfield encurtados, e "Review automático de PR" ganhou bloco de comando copiável (era só prosa) — página caiu de ~1030 para ~750 palavras. `npm run typecheck`/`build` verdes; verificado em claro e escuro
- [x] "Review automático de PR" passou a nomear explicitamente a skill `/review-pr` (antes só descrevia "uma skill de review" sem nome) — descrição conferida contra `ai-lup-skills/skills/review-pr/SKILL.md`

### 003-guia-repositorio-contexto — concluída

- [x] Nova página irmã `docs/guia-repositorio-contexto.md` ("Guia — preparar e usar um repositório de contexto"), mesmo modelo How-To/minimalista do guia de aplicação: resumo com 7 skills (`/blueprintfy`, `/prd-to-adr`, `/issue-to-adr`, `/make-diagram`, `/pm-create-pb`, `/pm-create-prd`, `/domain-reconcile`), preparação (bootstrap do `CONTEXT-MAP.md` via `/blueprintfy`, com/sem docs prévios), manutenção contínua (um exemplo por skill de documentação + subseção opcional de análise de negócio com PM), e reconciliação com repositórios de aplicação via `/domain-reconcile`
- [x] Conteúdo conceitual baseado em `static/framework-hibrido.html` (slides 6–9, pilares "duas análises quatro artefatos" e "contenção de domínio") e em `as_is_metarepo_sdd_harness.svg` (estado atual: metarepo informa serviços de forma implícita, sem retorno pós-deploy — é o problema que `/domain-reconcile` resolve)
- [x] Nome da skill de reconciliação: usuário pediu por "repo-reconcile", mas a skill real no `ai-lup-skills` se chama `domain-reconcile` — usado o nome real (mesma regra do guia irmão: não inventar/usar nome de skill que não existe no ambiente)
- [x] `/codefy` deliberadamente **não** incluída nesta feature (usuário não a listou), embora na prática prepare o terreno para o bootstrap do `/blueprintfy` — ver nota em "What's Next" sobre a descrição desatualizada de `/codefy` no guia de aplicação
- [x] Links cruzados: `docs/guia-agentes-ia-app.md` ↔ `docs/guia-repositorio-contexto.md`, e `docs/intro.mdx` linkando para as duas
- [x] `npm run typecheck` e `npm run build` verdes; verificação visual em claro e escuro (capturas `contexto-light.png`/`contexto-dark.png`)
- [x] **Seção 5 adicionada** ("Dicas para AGENTS.md/CLAUDE.md", FR-9/AC-9): "Mapear as skills para o agente" (bloco copiável associando cada uma das 7 skills à situação/frase-gatilho que deve acioná-la) e "Manter o repositório saudável" (bloco copiável: rodar `/domain-reconcile` depois de deploy relevante num repo de aplicação, confirmar `CONTEXT-MAP.md` atualizado antes de novo PRD/ADR, nunca deixar divergência encontrada sem resposta) — mesmo padrão do guia irmão. `npm run typecheck`/`build` verdes; verificado em claro e escuro (`contexto2-light.png`/`contexto2-dark.png`)

### 004-intro-framework — concluída

- [x] `docs/intro.mdx` reescrito por completo, substituindo o placeholder: abertura (o que é o framework), "Por que o framework existe" (proposta de valor, 3 benefícios), "Duas análises, uma história" (PB→PRD, ADR→ACs, cadeia de IDs), "Onde o contexto vive" (contenção de domínio), "Como o código é gerado" (harness Speckit SDD, pipeline spec→plan→tasks→verify), "Como cada squad personaliza o framework" (4 dimensões de customização), "Para onde ir a seguir" (links rotulados para os 2 guias + home)
- [x] Conteúdo consolida `static/framework-hibrido.html` (roteiro completo, slides 1–10); `as_is_metarepo_sdd_harness.svg` foi lido como referência, mas não gerou uma seção própria nesta página — ver nota abaixo
- [x] **Seção "O problema que ainda não resolvemos" (estado atual/as-is) escrita, verificada visualmente e depois removida a pedido explícito do usuário**, após a primeira rodada de verificação. `spec.md`/`plan.md`/`tasks.md` atualizados: FR-6/AC-6 originais removidos, requisitos seguintes renumerados; task correspondente (`T-6`) marcada `superseded` (não deletada, mantida para histórico). O conteúdo sobre o elo implícito/sem retorno pós-deploy continua coberto por `docs/guia-repositorio-contexto.md` (`003`)
- [x] **Revalidação de tom (2026-08-02): usuário pediu para garantir que nada na página "desabonasse" o projeto**, esclarecendo que a intenção é uma visão de produto/pitch de solução personalizada por squad, não um documento interno de problemas/governança. Duas seções reescritas: "Por que o framework existe" (situação/complicação com linguagem de crítica implícita — "cada time usa IA à sua maneira", "IA sem contexto erra mais" — virou proposta de valor com 3 benefícios, sem citar disfunção); "O que falta decidir" (soava como o framework estar incompleto) virou "Como cada squad personaliza o framework" (mesmas 4 dimensões, reenquadradas como customização, não lacuna). Frase "Sem essa cadeia não dá para provar..." trocada por afirmação positiva. `spec.md`/`plan.md`/`tasks.md` atualizados (FR-2/FR-6 reescritos, AC-2/AC-6 reescritos, T-2/T-7 marcadas `superseded`, T-11/T-12 novas)
- [x] `npm run typecheck` e `npm run build` verdes (rodado 3x: implementação inicial, remoção da seção as-is, revalidação de tom); `grep` confirma que o texto de placeholder original não existe mais
- [x] Verificação visual em modo claro e escuro, 3 rodadas: sem `chrome-remote-interface`/CDP disponível desta vez, alternativa via flag `--blink-settings=preferredColorScheme=0|1` do Chrome headless (0=dark, 1=light — testado e confirmado via `matchMedia` antes de usar) + `--user-data-dir` isolado por captura (evita tema salvo de uma run vazar para a próxima); capturas finais `intro-tone-light.png`/`intro-tone-dark.png` — paleta/tipografia corretas, sem footer, TOC/sidebar corretos (seção renomeada aparece corretamente na TOC), pagination "Próxima" funcionando

### 001-tela-inicial — revisão de tom em `framework-hibrido.html` (amendment, 2026-08-02)

- [x] **Depois de validar o tom de `docs/intro.mdx`, usuário pediu para avaliar se a landing page (mesmo arquivo, embutido via iframe na home) também tinha tom que pudesse "prejudicar a imagem do framework".** `FR-12`/`AC-12` adicionados a `specs/001-tela-inicial/spec.md` (feature que é dona de `static/framework-hibrido.html`); `T-17`/`T-18` adicionadas a `tasks.md`
- [x] 4 pontos corrigidos em `static/framework-hibrido.html`: slide 3 título ("Quando não estruturamos o uso de IA, a operação perde o controle" → "Sem uma estrutura comum, o potencial da IA fica limitado") e card 3 ("IA sem contexto erra mais... tomam atalhos que parecem certos e não são" → "IA sem contexto perde precisão... precisam de mais retrabalho" — a frase original solapava a confiança na própria IA, tecnologia central do pitch); slide 7 legenda da cadeia de IDs (frase negativa condicional → afirmação positiva, mesmo padrão de `004`); slide 10 título ("O que precisa ser decidido" → "Como cada squad personaliza o framework") e os 4 cards reenquadrados como customização por squad em vez de pendência de gestão
- [x] Slides 2, 5, 6, 8, 9 avaliados e mantidos sem alteração — tom já neutro/factual ou positivo, sem risco identificado
- [x] `npm run typecheck`/`build` verdes; verificação visual dos 3 slides alterados via cópias temporárias com `goTo(N)` forçado (arquivo é standalone, sem parâmetro de URL para escolher slide) + Chrome headless — layout intacto, cards não estouram com o texto novo, capturas `fh-s3.png`/`fh-s7.png`/`fh-s10.png` descartadas após conferência (não fazem parte do repositório)
- [x] **Pedido de acompanhamento: usuário pediu especificamente para reescrever o card 1 do slide 2** ("IA entra em cada etapa" / "Agentes já ajudam a escrever documentos, montar backlog e gerar código.") para remeter que a IA hoje é usada apenas para performance pessoal/individual, não de forma estruturada. Reescrito para "IA usada para performance pessoal" / "Cada profissional já usa agentes no dia a dia para escrever documentos, gerar código e ganhar produtividade individual." `T-19` adicionada a `tasks.md`; `npm run typecheck`/`build` verdes; captura `fh-s2.png` confirma layout intacto
- [x] **Durante a sessão, `as_is_metarepo_sdd_harness.svg` foi encontrado deletado do disco sem nenhum comando de exclusão identificável nas próprias ações.** Investigado (não achada causa nas ações realizadas) e restaurado via `git restore` antes de prosseguir — vale o usuário conferir a integridade do arquivo na cópia local
- [x] Commit deste amendment inclui, inevitavelmente, uma mudança pré-existente e não relacionada no mesmo arquivo (linha "Link de board": "Jira, Linear ou equivalente" → "board de gestão ágil", já modificada antes desta sessão começar) — não é possível separar por linha dentro do mesmo `git add`; mudança é de baixo risco (mesma categoria: generalização de nomenclatura)
- [x] **Pedido de acompanhamento: usuário reportou que o dot ativo (`<button class="dot active" aria-label="Ir para slide 1">`) deveria ser branco no primeiro slide.** Mesma classe de bug já corrigida em `.nav-btn` (ver acima): `.dot.active` usa `background:var(--navy)`, e `#s1` também tem `background:var(--navy)` — o dot ativo desaparecia contra o próprio fundo na capa. Corrigido com `body.cover .dot.active{ background:#fff; }`, reaproveitando a classe `body.cover` já existente. FR-13/AC-13/T-20 adicionados a `specs/001-tela-inicial`. `npm run typecheck`/`build` verdes; captura `home-dot-fix.png` confirma o dot em branco contra o fundo navy

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
