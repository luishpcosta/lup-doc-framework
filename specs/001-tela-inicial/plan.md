# Plan: Tela inicial da documentação

**Feature ID:** 001-tela-inicial
**Phase:** done
**Spec:** ./spec.md
**Last updated:** 2026-08-01

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

Reaproveitar o preset `classic` do Docusaurus (React + CSS Modules) em vez de portar o HTML/CSS/JS do rascunho (slide deck com paginação) tal e qual. Os tokens de design (cores, fontes, clip-paths) do rascunho são extraídos para `src/css/custom.css` como custom properties globais; a home (`src/pages/index.tsx`) consome esses tokens via CSS Modules (`index.module.css`) para reconstruir capa, "O problema", "A ideia central" e "O ciclo" como seções empilhadas (scroll), não como slides navegáveis — a home de um site de docs precisa ser scrollável e indexável, diferente de uma apresentação.

## Architecture & Components

- `src/css/custom.css` — importa as fontes (Archivo/Inter/IBM Plex Mono) e define as custom properties de cor do rascunho (`--paper-*`, `--blue-*`, `--navy`, `--purple`, `--teal`, `--coral`). Mapeia o modo escuro do Docusaurus (`[data-theme='dark']`) para o registro "blueprint" do rascunho, e o modo claro (`:root`) para o registro "papel"/capa.
- `src/pages/index.tsx` — componente da home; `Hero` (capa), `ProblemSection`, `CentralIdeaSection`, `CycleSection`, cada um lendo texto fixo (copiado do rascunho) e classes de `index.module.css`.
- `src/pages/index.module.css` — réplica em CSS Modules dos seletores `.eyebrow`, `.title-rule`, `.card`, `.panel`, `.cycle-step` etc. do rascunho, adaptados para variáveis globais em vez de valores fixos.
- `docusaurus.config.ts` — título, tagline, idioma (`pt-BR`) e navbar/footer atualizados para refletir o projeto real (removida a marca padrão do Docusaurus/Facebook).

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

## Constitution Compliance

- Princípio 5 (fidelidade ao design system): todas as cores/fontes usadas na home vêm de `custom.css`; nenhum valor hex é redefinido em `index.module.css`.
- Quality Bar: `npm run typecheck` e `npm run build` executados após a implementação (ver Evidence em `tasks.md`); verificação visual manual feita via captura de tela em modo claro (topo e seções) e confirmação de que as regras `[data-theme='dark']` estão presentes no CSS final compilado.

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Estrutura da home | Seções empilhadas (scroll) reaproveitando só capa + 3 slides de abertura | Clonar as 11 slides com paginação por JS idêntica ao rascunho | Home de site de docs precisa ser scrollável/indexável (SEO, leitores de tela); paginação por slide não é um padrão de navegação de documentação |
| Mapeamento de tema | Claro = registro "papel", escuro = registro "blueprint" | Um único registro fixo (ignorar dark mode do Docusaurus) | Reaproveita o alternador nativo do Docusaurus e preserva a dualidade conceitual do rascunho (executivo vs. técnico) sem JS extra |
| Fonte de verdade de cor | Custom properties em `custom.css`, herdadas 1:1 do rascunho | Reimplementar como tema JS (`themeConfig` customizado) | Custom properties é o mecanismo padrão do Infima/Docusaurus para overrides de tema; menor superfície de manutenção |

## Risks

- **Fontes do Google Fonts via `@import` no CSS**: adiciona uma dependência de rede em build/runtime. Mitigação: são as mesmas fontes já usadas no rascunho aprovado; se performance virar problema, trocar por self-hosting é uma mudança isolada em `custom.css`.
- **Conteúdo tutorial padrão do Docusaurus ainda presente em `/docs`**: a home aponta para `/docs/intro`, mas o conteúdo lá ainda é o tutorial genérico do template, não a documentação real do framework híbrido — precisa virar uma feature própria (fora de escopo aqui, ver Non-Goals em `spec.md`).
