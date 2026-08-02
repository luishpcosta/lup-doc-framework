# Plan: Guia — preparar e usar um repositório de contexto

**Feature ID:** 003-guia-repositorio-contexto
**Phase:** done
**Spec:** ./spec.md
**Last updated:** 2026-08-02

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

Página única de conteúdo (`docs/guia-repositorio-contexto.md`), irmã de `docs/guia-agentes-ia-app.md`, mesmo formato Markdown puro e mesmo modelo de escrita (How-To Guide/Diátaxis + minimalismo instrucional) já estabelecido e verificado em `002-guia-agentes-ia`. `sidebar_position: 3` (depois de `intro.mdx`=1 e `guia-agentes-ia-app.md`=2).

Estrutura (mapeada 1:1 às FRs):

1. **Resumo** (FR-1/AC-1) — orientação curta + lista de definição das 7 skills.
2. **Como preparar o repositório de contexto** (FR-2/AC-2) — bootstrap via `/blueprintfy`, dois cenários (sem doc nenhum vs. docs dispersos sem mapa), 2+ exemplos.
3. **Como manter o repositório de contexto atualizado** (FR-3/AC-3) — `/blueprintfy` (manutenção), `/prd-to-adr`, `/issue-to-adr`, `/make-diagram`, 1+ exemplo cada; subseção opcional (FR-4/AC-4) com `/pm-create-pb`+`/pm-create-prd`.
4. **Como reconciliar com os repositórios de aplicação** (FR-5/AC-5) — explica o gap (elo implícito, sem retorno pós-deploy) e `/domain-reconcile`.
5. **Dicas para `AGENTS.md`/`CLAUDE.md`** (FR-9/AC-9) — mapeamento de skills (reforço de trigger para o agente) e rotina mínima de saúde do repositório, mesmo padrão do guia irmão (`002-guia-agentes-ia`, seção 4).

## Architecture & Components

- `docs/guia-repositorio-contexto.md` — novo arquivo, único artefato de conteúdo desta feature.
- `docs/guia-agentes-ia-app.md` — adicionar um link de volta para a nova página (referência cruzada bidirecional, FR-7).
- `docs/intro.mdx` — adicionar link para a nova página, ao lado do link já existente para o guia de aplicação.
- Nenhuma mudança em `sidebars.ts`, `docusaurus.config.ts`, `src/`, ou `static/` — sidebar autogerada já cobre qualquer arquivo novo em `docs/`.
- Blocos de exemplo em fences de código Markdown simples (` ``` `), mesmo padrão do guia irmão.

## Data Model

Não aplicável — conteúdo estático.

## Interfaces / Contracts

- Rota pública: `/docs/guia-repositorio-contexto`.
- Fonte de verdade para as descrições de skill: `ai-lup-skills/skills/{blueprintfy,prd-to-adr,issue-to-adr,make-diagram,pm-create-pb,pm-create-prd,domain-reconcile}/SKILL.md` (repositório vizinho, lido diretamente — não citado nominalmente no texto publicado, conforme FR-8).
- Conteúdo conceitual (papel do repositório de contexto, o gap de reconciliação) vem de `static/framework-hibrido.html` (slides 6–9, `data-register="blueprint"`) e vinha de `as_is_metarepo_sdd_harness.svg` (estado atual, elo implícito e sem retorno pós-deploy) — arquivo removido do repositório a pedido do usuário (2026-08-02) depois de já incorporado à seção 4 de `docs/guia-repositorio-contexto.md`; nunca foi embutido como imagem no site, só lido como fonte.

## Requirement Coverage

| Requirement | Addressed by |
|---|---|
| FR-1 / AC-1 | Seção "1. Resumo" — lista de definição das 7 skills |
| FR-2 / AC-2 | Seção "2. Como preparar o repositório de contexto" — 2 cenários + 2 exemplos de `/blueprintfy` |
| FR-3 / AC-3 | Seção "3. Como manter o repositório de contexto atualizado" — 1 exemplo cada de `/blueprintfy`, `/prd-to-adr`, `/issue-to-adr`, `/make-diagram` |
| FR-4 / AC-4 | Subseção "Análise de negócio com o time de produto (opcional)" — 1 exemplo de `/pm-create-pb` + 1 de `/pm-create-prd`, + nota sobre demandas puramente técnicas pulando a etapa |
| FR-5 / AC-5 | Seção "4. Como reconciliar com os repositórios de aplicação" — explicação do gap + exemplo de `/domain-reconcile` |
| FR-6 / AC-6 | Estrutura espelha `docs/guia-agentes-ia-app.md`: resumo curto, títulos orientados a objetivo, blocos copiáveis |
| FR-7 / AC-7 | `npm run typecheck`/`build`; links cruzados entre as duas páginas e a partir de `docs/intro.mdx` |
| FR-8 / AC-8 | Revisão de texto: nenhuma URL/nome de repositório de origem das skills |
| FR-9 / AC-9 | Nova seção "5. Dicas para AGENTS.md/CLAUDE.md" — bloco de mapeamento de skills + bloco de rotina de saúde do repositório, mesmo padrão copiável do guia irmão |

## Constitution Compliance

- Princípio 1 (spec before code): feature segue Specify → Clarify → Plan → Tasks antes da escrita.
- Princípio 5 (fidelidade ao design system): Markdown puro, sem CSS/cores hardcoded — herda tokens de `src/css/custom.css`.
- Quality Bar: `npm run typecheck` + `npm run build`; verificação visual manual (claro/escuro) via `npm run build && npm run serve`, mesmo processo usado em `002-guia-agentes-ia`.

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Modelo de escrita | Mesmo modelo do guia irmão (Diátaxis How-To + minimalismo) | Modelo diferente (ex. Reference) só para este guia | Consistência entre as duas páginas irmãs; usuário já validou o modelo em `002-guia-agentes-ia` |
| Nome da skill de reconciliação | `/domain-reconcile` (nome real no repositório de skills) | Usar literalmente "repo-reconcile" (nome usado pelo usuário no pedido) | O usuário descreveu o comportamento ("trazer modificações de repo de aplicação que possa ter afetado"), que bate exatamente com `domain-reconcile`; usar um nome que não existe no ambiente violaria a regra já registrada no guia irmão ("não inventar nomes de skills que não existem") |
| `/codefy` nesta feature | Não incluído | Incluir, já que na prática prepara o terreno para o bootstrap do `/blueprintfy` | Usuário não a listou para esta feature; decisão registrada como nota para revisão futura do guia irmão (`progress.md`), não expandida aqui sem confirmação |
