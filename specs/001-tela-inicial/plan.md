# Plan: Tela inicial da documentação

**Feature ID:** 001-tela-inicial
**Phase:** done
**Spec:** ./spec.md
**Last updated:** 2026-08-01

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

Reaproveitar o preset `classic` do Docusaurus (React + CSS Modules) em vez de portar o HTML/CSS/JS do rascunho (slide deck com paginação) tal e qual. Os tokens de design (cores, fontes, clip-paths) do rascunho são extraídos para `src/css/custom.css` como custom properties globais; a home (`src/pages/index.tsx`) consome esses tokens via CSS Modules (`index.module.css`) para reconstruir capa, "O problema", "A ideia central", "O ciclo", a transição e a primeira seção de blueprint técnico como seções empilhadas (scroll), não como slides navegáveis — a home de um site de docs precisa ser scrollável e indexável, diferente de uma apresentação.

A primeira versão só reaproveitava conteúdo em registro "papel" (executivo); a capa prometia "da visão executiva ao blueprint técnico" sem a home nunca de fato chegar lá. Correção: (a) um indicador de registro fixo (`RegisterGauge`) sempre visível, cujo marcador acompanha o scroll e cujo rótulo central troca para "Blueprint técnico" via `IntersectionObserver`; (b) uma seção sempre-blueprint (`BlueprintSection`, cor `--blue-bg` fixa, independente do tema claro/escuro do site) que reproduz a transição (slide 6) e a primeira seção técnica (slide 7 — duas análises, quatro artefatos).

Scaffolding padrão do `create-docusaurus` (blog de exemplo, tutorial docs, página markdown de exemplo, branding genérico) foi removido para que o repositório não misture conteúdo de demonstração com o conteúdo real do projeto.

## Architecture & Components

- `src/css/custom.css` — importa as fontes (Archivo/Inter/IBM Plex Mono) e define as custom properties de cor do rascunho (`--paper-*`, `--blue-*`, `--navy`, `--purple`, `--teal`, `--coral`). Mapeia o modo escuro do Docusaurus (`[data-theme='dark']`) para o registro "blueprint" do rascunho, e o modo claro (`:root`) para o registro "papel"/capa.
- `src/pages/index.tsx` — componente da home; `RegisterGauge` (indicador de registro, client-only via `useEffect`), `Hero` (capa), `ProblemSection`, `CentralIdeaSection`, `CycleSection`, `TransitionSection`, `BlueprintSection`, cada um lendo texto fixo (copiado do rascunho) e classes de `index.module.css`.
- `src/pages/index.module.css` — réplica em CSS Modules dos seletores `.eyebrow`, `.title-rule`, `.card`, `.panel`, `.cycle-step`, `.gauge-*`, `.pipe-*`, `.nest-label` etc. do rascunho, adaptados para variáveis globais em vez de valores fixos. As classes `.blueprint*` usam `--blue-*` diretamente (sempre escuras), diferente de `.section`/`.card`, que só ficam escuras via `[data-theme='dark']`.
- `docusaurus.config.ts` — título, tagline, idioma (`pt-BR`) e navbar/footer atualizados para refletir o projeto real; `blog: false`; `favicon: 'img/favicon.svg'`; `image` (social card) removido até existir um real.
- `static/img/logo.svg`, `static/img/favicon.svg` — marca mínima ("L" sobre `--navy`) substituindo o dinossauro/logo padrão do Docusaurus.

## Data Model

Não aplicável — conteúdo estático, sem entidades de dados.

## Interfaces / Contracts

Não aplicável — sem API. Único contrato relevante é o conjunto de custom properties CSS em `:root` / `[data-theme='dark']`, que qualquer página futura deve consumir (ver `constitution.md`, princípio 5).

## Requirement Coverage

| Requirement | Addressed by |
|---|---|
| FR-1 / AC-1 | `Hero` em `index.tsx` + `.hero`/`.eyebrow`/`.titleRule`/`.heroTitle`/`.heroSub` em `index.module.css`, usando `--navy`/`--navy-ink` |
| FR-2 / AC-2 | `ProblemSection` e `CentralIdeaSection` em `index.tsx`, com texto idêntico ao rascunho (`#s2`, `#s3`) |
| FR-3 / AC-3 | Custom properties centralizadas em `src/css/custom.css`; nenhuma cor hardcoded nos módulos de página |
| FR-4 / AC-4 | Seletor `[data-theme='dark']` em `custom.css` e em `index.module.css` (`.section`, `.card`, `.cycleStepA` etc.) sobrepõe os tokens "blueprint" |
| FR-5 / AC-5 | Botões `Link` para `/docs/intro` em `Hero` |
| FR-6 / AC-6, AC-7 | `RegisterGauge` em `index.tsx` (scroll listener + `IntersectionObserver` no `#blueprint-register`) + `.gaugeWrap`/`.gaugeTrack`/`.gaugeMarker`/`.gaugeLabels` em `index.module.css` |
| FR-7 / AC-7 | `TransitionSection` + `BlueprintSection` em `index.tsx`, com `.blueprintSection`/`.pipeline`/`.pipeNode`/`.nestLabel` (sempre `--blue-*`, não depende de `[data-theme='dark']`) |
| FR-8 / AC-8 | Remoção de `blog/`, `docs/tutorial-basics/`, `docs/tutorial-extras/`, `src/pages/markdown-page.mdx`, imagens `undraw_*`/`docusaurus.png`/`docusaurus-social-card.jpg`; `blog: false` em `docusaurus.config.ts`; `static/img/logo.svg` e `favicon.svg` substituídos |

## Constitution Compliance

- Princípio 5 (fidelidade ao design system): todas as cores/fontes usadas na home vêm de `custom.css`; nenhum valor hex é redefinido em `index.module.css`.
- Quality Bar: `npm run typecheck` e `npm run build` executados após a implementação (ver Evidence em `tasks.md`); verificação visual manual feita via captura de tela em modo claro (topo e seções) e confirmação de que as regras `[data-theme='dark']` estão presentes no CSS final compilado.

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Estrutura da home | Seções empilhadas (scroll) reaproveitando só capa + 3 slides de abertura | Clonar as 11 slides com paginação por JS idêntica ao rascunho | Home de site de docs precisa ser scrollável/indexável (SEO, leitores de tela); paginação por slide não é um padrão de navegação de documentação |
| Mapeamento de tema | Claro = registro "papel", escuro = registro "blueprint" | Um único registro fixo (ignorar dark mode do Docusaurus) | Reaproveita o alternador nativo do Docusaurus e preserva a dualidade conceitual do rascunho (executivo vs. técnico) sem JS extra |
| Fonte de verdade de cor | Custom properties em `custom.css`, herdadas 1:1 do rascunho | Reimplementar como tema JS (`themeConfig` customizado) | Custom properties é o mecanismo padrão do Infima/Docusaurus para overrides de tema; menor superfície de manutenção |
| Registro blueprint na home | Seção sempre escura (`--blue-*` fixo), independente do `[data-theme='dark']` do site | Só depender do dark mode do usuário para "revelar" o registro blueprint | O rascunho original alterna registro por conteúdo (por slide), não por preferência do usuário; se o registro blueprint só aparecesse no dark mode, a maioria dos visitantes (tema claro) nunca veria a seção — quebra a promessa da capa |
| Indicador de progresso | Gauge com marcador ligado ao scroll (`window.scrollY`) + `IntersectionObserver` para o rótulo central | Marcador estático / sem indicador | Sem paginação por slide, scroll é o único sinal de "onde o visitante está"; reaproveita a ideia do gauge original de forma nativa para uma página rolável |
| Blog do scaffolding | Desligado via `blog: false` no preset | Deletar só o conteúdo de exemplo, deixando o plugin ativo e vazio | Um blog ativo sem nenhum post é uma rota morta e sinaliza scaffolding inacabado; `blog: false` é reversível (uma linha) quando houver conteúdo real |

## Risks

- **Fontes do Google Fonts via `@import` no CSS**: adiciona uma dependência de rede em build/runtime. Mitigação: são as mesmas fontes já usadas no rascunho aprovado; se performance virar problema, trocar por self-hosting é uma mudança isolada em `custom.css`.
- **`RegisterGauge` depende de `window`/`IntersectionObserver`**: só pode rodar client-side. Mitigação: toda a lógica está em `useEffect` (não roda durante SSR/build), então `docusaurus build` não quebra; o pior caso sem JS é o marcador parado em 0%, sem impacto no conteúdo.
- **Conteúdo real de `/docs/intro` ainda não escrito**: a home aponta para `/docs/intro`, mas o conteúdo lá é só um placeholder — precisa virar uma feature própria (fora de escopo aqui, ver Non-Goals em `spec.md`).
