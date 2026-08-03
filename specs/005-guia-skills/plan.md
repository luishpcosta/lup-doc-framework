# Plan: Skills do framework — página de overview técnico

**Feature ID:** 005-guia-skills
**Phase:** done
**Spec:** ./spec.md
**Last updated:** 2026-08-02

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

Nova página `docs/skills.md`, Markdown puro (sem MDX/React), `sidebar_position: 4` (depois de `intro.mdx`=1, `guia-agentes-ia-app.md`=2, `guia-repositorio-contexto.md`=3). Estrutura:

1. Parágrafo de abertura (FR-4): o que é a página, diferença para os guias de workflow.
2. Nota de instalação (FR-5): link para `ai-lup-skills` no GitHub + comando `lup-skills add`.
3. "Skills do repositório de aplicação" (FR-3): `sdd-harness-creator`, `codefy`, `review-pr`.
4. "Skills do repositório de contexto" (FR-3): `blueprintfy`, `prd-to-adr`, `issue-to-adr`, `make-diagram`, `pm-create-pb`, `pm-create-prd`, `domain-reconcile`.

Cada skill (FR-2) segue o template do exemplo do usuário, adaptado por HTML `<details>`/`<summary>` (suportado nativamente em Markdown/MDX do Docusaurus):

```md
### `/nome-da-skill`

<descrição curta>

**Uso básico**

    /nome-da-skill <exemplo real de invocação>

<uma linha explicando o que retorna>

<details>
<summary>Formato de saída</summary>
...
</details>

<details>
<summary>Como funciona por dentro</summary>
1. ...
</details>

<details>
<summary>Erros comuns</summary>
| Sintoma | Causa provável | Solução |
|---|---|---|
...
</details>
```

Blocos "Formato de saída" e "Erros comuns" só aparecem quando a skill documenta esse conteúdo (Edge Cases da spec) — não são obrigatórios em toda entrada, ao contrário de "Uso básico" e "Como funciona por dentro", que são obrigatórios (uso básico e ao menos uma noção de funcionamento interno sempre existem, mesmo que resumidos).

## Architecture & Components

- `docs/skills.md` — novo arquivo, único artefato de conteúdo novo.
- `docs/intro.mdx` — adicionar um terceiro link na seção "Para onde ir a seguir".
- `docs/guia-agentes-ia-app.md` e `docs/guia-repositorio-contexto.md` — adicionar um link para a nova página (ex. na seção de Resumo, ao lado da lista de skills).
- Nenhuma mudança em `sidebars.ts`/`docusaurus.config.ts` — sidebar autogerada já cobre qualquer arquivo novo em `docs/`.

## Data Model

Não aplicável — conteúdo estático.

## Interfaces / Contracts

- Rota pública: `/docs/skills` (nova).
- Fonte de verdade da lista canônica de skills e dos exemplos de uso já validados: `docs/guia-agentes-ia-app.md` e `docs/guia-repositorio-contexto.md` (não reinventar exemplos que já existem e foram revisados).
- Fonte de verdade do detalhe técnico por skill (formato de saída, fases internas, erros comuns): `ai-lup-skills/skills/<nome>/SKILL.md` e `references/` — lido diretamente, resumo trazido para a página; o repositório em si é citado nominalmente nesta página (única exceção à regra dos guias — ver Clarifications Log em `spec.md`).
- Link do repositório de skills: `https://github.com/luishpcosta/ai-lup-skills` (confirmado via `git remote -v` no checkout local do repo).
- Comando de instalação: `lup-skills add <nome-da-skill>` (confirmado em `ai-lup-skills/README.md`).

## Requirement Coverage

| Requirement | Addressed by |
|---|---|
| FR-1 / AC-1 | 10 entradas de skill, uma por seção `###` |
| FR-2 / AC-2 | Template por skill (nome, descrição, Uso básico, blocos recolhíveis) |
| FR-3 / AC-3 | Duas seções `##` de agrupamento, cada uma linkando ao guia correspondente |
| FR-4 / AC-4 | Parágrafo de abertura da página |
| FR-5 / AC-5 | Seção "Instalação" com link do GitHub + comando `lup-skills add` |
| FR-6 / AC-6 | Links cruzados (`intro.mdx`, os 2 guias) + `npm run typecheck`/`build` |
| FR-7 / AC-7 | Conteúdo por skill extraído de `ai-lup-skills/skills/<nome>/SKILL.md` |

## Constitution Compliance

- Princípio 1 (spec before code): feature segue Specify → Plan → Tasks antes da escrita.
- Princípio 5 (fidelidade ao design system): Markdown puro, `<details>`/`<summary>` são HTML padrão sem CSS custom — herda a tipografia/paleta de `custom.css` como qualquer outra página de `docs/`.
- Quality Bar: `npm run typecheck` + `npm run build`; verificação visual manual (claro/escuro), com atenção especial ao estilo default dos elementos `<details>`/tabelas do tema (não usados em nenhuma página anterior deste site).

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Citar o repositório de skills nominalmente | Sim, nesta página (link + comando de instalação) | Manter a mesma regra dos guias (não citar) | Pedido explícito e específico do usuário para esta página; decisão registrada como exceção pontual, não como reversão retroativa das duas features anteriores — ver Clarifications Log em `spec.md` |
| Formato por skill | `<details>`/`<summary>` (HTML dentro do Markdown) | Prosa corrida sem blocos recolhíveis | O usuário forneceu um exemplo explícito usando esse formato; Docusaurus renderiza HTML padrão dentro de `.md` sem necessidade de `.mdx` |
| Skill `skill-creator` | Excluída da página | Incluir para ter o catálogo completo do repositório | Não é citada em nenhum guia do framework — é meta-tooling para criar skills, não uma skill do ciclo de desenvolvimento em si |
