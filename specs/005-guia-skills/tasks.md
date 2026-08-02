# Tasks: Skills do framework — página de overview técnico

**Feature ID:** 005-guia-skills
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-02

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-1 | Extrair detalhe técnico das 10 skills a partir de `ai-lup-skills/skills/<nome>/SKILL.md` (formato de saída, funcionamento interno, erros comuns) | AC-7 | done | resumo estruturado das 10 skills, extraído via agente de pesquisa, usado como base do conteúdo |
| T-2 | Criar `docs/skills.md` com front matter (`sidebar_position: 4`, `title`) e parágrafo de abertura explicando a diferença para os guias de workflow | AC-4 | done | parágrafo de abertura em `docs/skills.md` |
| T-3 | Escrever seção "Instalação": link para `ai-lup-skills` no GitHub + comando `lup-skills add` | AC-5 | done | seção "Instalação" com link `https://github.com/luishpcosta/ai-lup-skills` e bloco `lup-skills add <nome-da-skill>` |
| T-4 | Escrever "Skills do repositório de aplicação" (`/sdd-harness-creator`, `/codefy`, `/review-pr`), cada uma com Uso básico + blocos recolhíveis; link para o guia de aplicação | AC-1, AC-2, AC-3 | done | 3 entradas de skill + link para `guia-agentes-ia-app.md` |
| T-5 | Escrever "Skills do repositório de contexto" (`/blueprintfy`, `/prd-to-adr`, `/issue-to-adr`, `/make-diagram`, `/pm-create-pb`, `/pm-create-prd`, `/domain-reconcile`), cada uma com Uso básico + blocos recolhíveis; link para o guia de contexto | AC-1, AC-2, AC-3 | done | 7 entradas de skill + link para `guia-repositorio-contexto.md` |
| T-6 | Reaproveitar os exemplos de "Uso básico" já publicados nos dois guias (não inventar novos) | AC-2 | done | todos os exemplos de invocação batem com os já publicados em `guia-agentes-ia-app.md`/`guia-repositorio-contexto.md` |
| T-7 | Omitir o bloco "Erros comuns" quando a skill não documenta armadilhas explicitamente (caso `/review-pr` — guardrails incorporados em "Como funciona por dentro" em vez de tabela inventada) | AC-2 | done | `/review-pr` não tem bloco "Erros comuns"; guardrails aparecem como bullets em "Como funciona por dentro" |
| T-8 | Adicionar link cruzado em `docs/intro.mdx` ("Para onde ir a seguir"), `docs/guia-agentes-ia-app.md` e `docs/guia-repositorio-contexto.md` (parágrafo de abertura) apontando para a nova página | AC-6 | done | os 3 arquivos linkam para `./skills.md` |
| T-9 | Rodar `npm run typecheck` + `npm run build` | AC-6 | done | `npm run typecheck`/`build` verdes |
| T-10 | Build + serve; verificação visual em claro e escuro, com atenção ao estilo dos elementos `<details>`/tabela (não usados em nenhuma página anterior do site) | AC-6 | done | capturas de `docs/skills.md` em claro e escuro, `<details>` e tabelas renderizando com a paleta/tipografia corretas |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-4/T-5, AC-2: T-4/T-5/T-6/T-7, AC-3: T-4/T-5, AC-4: T-2, AC-5: T-3, AC-6: T-8/T-9/T-10, AC-7: T-1
- Every task linked to an AC? yes
