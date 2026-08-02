# Tasks: Guia — preparar e usar um repositório de contexto

**Feature ID:** 003-guia-repositorio-contexto
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-02

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-1 | Criar `docs/guia-repositorio-contexto.md` com front matter (`sidebar_position: 3`, `title`) e seção "1. Resumo" (lista de definição das 7 skills) | AC-1 | done | seção "1. Resumo" com 7 itens; confirmado em `contexto-light.png`/`contexto-dark.png` |
| T-2 | Escrever seção "2. Como preparar o repositório de contexto": dois cenários (sem `CONTEXT-MAP.md` vs. docs dispersos) + 2 exemplos de `/blueprintfy` | AC-2 | done | subseção "Com ou sem CONTEXT-MAP.md" + 2 blocos "Exemplo 1"/"Exemplo 2" |
| T-3 | Escrever seção "3. Como manter o repositório de contexto atualizado": 1 exemplo cada de `/blueprintfy`, `/prd-to-adr`, `/issue-to-adr`, `/make-diagram` | AC-3 | done | 4 blocos de comando, um por skill |
| T-4 | Escrever subseção opcional "Análise de negócio com o time de produto": 1 exemplo de `/pm-create-pb` + 1 de `/pm-create-prd` | AC-4 | done | subseção com "(opcional)" no título + 2 blocos de comando |
| T-5 | Escrever seção "4. Como reconciliar com os repositórios de aplicação": explicação do gap (elo implícito/sem retorno pós-deploy) + exemplo de `/domain-reconcile` | AC-5 | done | parágrafo explica o gap (baseado em `as_is_metarepo_sdd_harness.svg`) + 1 bloco de comando |
| T-6 | Revisar a página inteira contra o modelo do guia irmão (resumo curto, títulos orientados a objetivo, blocos copiáveis, nenhuma prosa solta) | AC-6 | done | estrutura espelha `docs/guia-agentes-ia-app.md`: resumo curto, títulos "Como...", todo exemplo em bloco de código |
| T-7 | Adicionar link cruzado em `docs/guia-agentes-ia-app.md` → nova página; adicionar link em `docs/intro.mdx`; rodar `npm run typecheck` + `npm run build` | AC-7 | done | `docs/guia-agentes-ia-app.md` linka para `./guia-repositorio-contexto.md` e vice-versa; `docs/intro.mdx` linka para as duas; `npm run typecheck`/`build` verdes |
| T-8 | Revisar o texto final procurando por qualquer nome/URL de repositório de origem das skills | AC-8 | done | revisão manual: nenhuma URL/nome de repositório de origem presente (fonte `ai-lup-skills` usada só para leitura, não citada no texto) |
| T-9 | Build + serve; captura de tela em modo claro e escuro para verificação visual manual | AC-7 | done | `npm run build` + `npm run serve --port 3005`; capturas via CDP `contexto-light.png`/`contexto-dark.png` — paleta/tipografia corretas, sidebar mostra as duas páginas irmãs |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-1, AC-2: T-2, AC-3: T-3, AC-4: T-4, AC-5: T-5, AC-6: T-6, AC-7: T-7/T-9, AC-8: T-8
- Every task linked to an AC? yes
