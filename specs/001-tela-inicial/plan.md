# Plan: Tela inicial da documentação

**Feature ID:** 001-tela-inicial
**Phase:** done
**Spec:** ./spec.md
**Last updated:** 2026-08-01

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

**Histórico (por que este plano mudou duas vezes):**

1. *Primeira versão*: recriar a capa e as primeiras seções do rascunho como componentes React (`Hero`, `ProblemSection`, `CentralIdeaSection`, `CycleSection`) com CSS Modules, mapeando o dark-mode do Docusaurus para o registro "blueprint" do rascunho.
2. *Segunda versão*: a capa recriada nunca mostrava conteúdo "blueprint técnico" de fato (só um dark-mode opcional) — a promessa da própria capa ("da visão executiva ao blueprint técnico") não se cumpria. Adicionado um `RegisterGauge` (indicador com marcador ligado ao scroll) e uma `BlueprintSection` sempre escura à mão.
3. *Versão atual*: o usuário rejeitou o resultado de novo ("ainda não ficou bom") e pediu explicitamente para **embutir o HTML** em vez de recriá-lo. Toda a estratégia de recriação em React foi abandonada: `framework-hibrido.html` é copiado para `static/` e a home (`src/pages/index.tsx`) apenas o embute via `<iframe>` em tela cheia (abaixo da navbar do Docusaurus). Isso garante fidelidade **por construção** — é literalmente o mesmo arquivo, com seu próprio gauge, paginação por slide e JS, em vez de uma segunda implementação que precisa ser mantida em sincronia manualmente.

Os componentes React da tentativa anterior (`Hero`, `ProblemSection`, `CentralIdeaSection`, `CycleSection`, `TransitionSection`, `BlueprintSection`, `RegisterGauge`) foram **deletados**, não desativados — manter duas implementações da mesma capa (uma React, uma HTML) seria uma fonte permanente de divergência.

Separadamente, dois ajustes sitewide: (a) o footer do Docusaurus foi removido de `themeConfig` (nenhuma página do site mostra rodapé); (b) as fontes do rascunho (Archivo/Inter/IBM Plex Mono), que já estavam em `custom.css` como `--ifm-font-family-base`/`--ifm-heading-font-family`/`--ifm-font-family-monospace`, foram confirmadas como aplicadas a **todo o site** (não só à home) — essas variáveis do Infima cascateiam globalmente por padrão, então nenhuma mudança de código adicional era necessária ali, só verificação visual em `/docs/intro`.

## Architecture & Components

- `static/framework-hibrido.html` — cópia exata do arquivo na raiz do repo (`framework-hibrido.html`), servida como asset estático. Docusaurus copia `static/**` para `build/` sem processar.
- `src/pages/index.tsx` — home reduzida a um único `<iframe src={useBaseUrl('/framework-hibrido.html')} />` dentro do `Layout` padrão (mantém navbar do site; o conteúdo da capa é 100% o arquivo original).
- `src/pages/index.module.css` — uma única classe (`.capaFrame`): `width: 100%`, `height: calc(100vh - var(--ifm-navbar-height))`, sem borda.
- `src/css/custom.css` — inalterado nesta revisão quanto às fontes (já cobria o site inteiro); mantém os tokens de cor (`--paper-*`, `--blue-*`, `--navy`, etc.) para uso futuro em `/docs`.
- `docusaurus.config.ts` — bloco `footer` removido de `themeConfig` (Docusaurus não renderiza `<Footer/>` quando a config está ausente).

## Data Model

Não aplicável — conteúdo estático, sem entidades de dados.

## Interfaces / Contracts

- O único "contrato" é o caminho do asset estático: `static/framework-hibrido.html` → servido em `/framework-hibrido.html` (via `useBaseUrl` para respeitar um eventual `baseUrl` diferente de `/`). Se o arquivo na raiz do repo for atualizado, a cópia em `static/` precisa ser atualizada junto (ver Risks).
- Custom properties CSS em `:root` / `[data-theme='dark']` continuam sendo o contrato de design system para páginas fora da home (ver `constitution.md`, princípio 5).

## Requirement Coverage

| Requirement | Addressed by |
|---|---|
| FR-1 / AC-1 | `static/framework-hibrido.html` + `<iframe>` em `index.tsx` — fidelidade garantida por ser o mesmo arquivo, não uma recriação |
| FR-3 / AC-3 | `--ifm-font-family-base`/`--ifm-heading-font-family`/`--ifm-font-family-monospace` em `src/css/custom.css` (`:root`, sitewide); confirmado via captura de tela de `/docs/intro` |
| FR-5 / AC-5 | Navegação nativa do arquivo embutido (setas/dots "01/11") + navbar do Docusaurus (`Documentação` → `/docs/intro`) |
| FR-8 / AC-8 | Remoção de `blog/`, `docs/tutorial-basics/`, `docs/tutorial-extras/`, `src/pages/markdown-page.mdx`, imagens padrão; `blog: false` em `docusaurus.config.ts`; `static/img/logo.svg`/`favicon.svg` substituídos |
| FR-9 / AC-9 | Bloco `footer` removido de `themeConfig` em `docusaurus.config.ts` |

## Constitution Compliance

- Princípio 5 (fidelidade ao design system): a capa não usa mais tokens CSS do projeto — ela *é* o arquivo de referência, então não há divergência possível por definição. Páginas fora da home continuam obrigadas a usar as custom properties de `custom.css`.
- Quality Bar: `npm run typecheck` e `npm run build` executados após a implementação; verificação visual manual via captura de tela (home com `--virtual-time-budget` para aguardar hidratação client-side, já que `npm start` não faz SSR) e de `/docs/intro` para confirmar fontes e ausência de footer.

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Capa: recriar vs. embutir | Embutir `framework-hibrido.html` via `<iframe>` | Continuar recriando em React (era a v1 e a v2 deste plano) | Duas rodadas de recriação manual já falharam em atingir fidelidade aceitável para o usuário; embutir o arquivo elimina a categoria inteira de bug ("a réplica não bate com o original") |
| Isolamento do iframe | `<iframe>` (documento HTML separado, CSS/JS isolados) | `dangerouslySetInnerHTML` / injetar o HTML inline na árvore React | O arquivo original é um documento completo (`<html>`,`<head>`,`<style>`,`<script>`) com seu próprio estado de navegação (slide atual) — injetar inline colidiria com o CSS/JS do Docusaurus (mesmos seletores de classe, mesmo `window` global para o listener de teclado) |
| Footer | Removido de `themeConfig` (nenhuma página tem footer) | Manter footer só na home, remover só ali | `themeConfig.footer` é global no Docusaurus classic theme; footer por página exigiria swizzle do componente `Footer`, complexidade não pedida |
| Fontes fora da home | Nenhuma mudança de código — já cascateavam via `--ifm-*-font-family` em `:root` | Duplicar declarações de fonte em cada página/componente | Infima já usa essas variáveis globalmente; duplicar seria redundante e um risco de divergência futura |
| Arquivo de referência: uma cópia ou duas | Só em `static/framework-hibrido.html` (raiz do repo removida) | Manter as duas em sincronia manualmente | Elimina por completo o risco "editou só uma cópia" — não há mais uma segunda cópia para esquecer de atualizar |
| Contraste do gauge-marker | Anel duplo fixo (`box-shadow`: aro escuro + aro claro), independente da cor de preenchimento do marcador | Só ajustar a cor de preenchimento (`background`) do marcador | O preenchimento do marcador já muda de cor (`navy`↔`branco`) conforme o registro; um segundo ajuste de cor teria o mesmo problema de poder coincidir com o fundo em algum ponto da transição. Um anel com duas camadas de contraste opostas garante visibilidade contra qualquer fundo, sem depender de acertar uma cor específica |

## Risks

- ~~Duas cópias do mesmo HTML (raiz do repo + `static/`)~~ — **Resolvido**: o arquivo passou a existir só em `static/framework-hibrido.html`; a cópia da raiz do repo foi removida, então não há mais risco de divergência entre cópias.
- **Iframe e SEO/acessibilidade**: conteúdo dentro de um iframe é mais difícil de indexar e de navegar por leitor de tela do que HTML nativo da página. Mitigação: aceito conscientemente pelo usuário ao pedir o embed; se virar problema real, a alternativa é voltar a portar o conteúdo (não o styling) para Markdown/MDX nativo do Docusaurus.
- **Conteúdo real de `/docs/intro` ainda não escrito**: continua um placeholder; feature futura (ver Non-Goals em `spec.md`).
