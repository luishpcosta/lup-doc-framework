# Tasks: Guia — preparar e usar o repositório com agentes de IA de desenvolvimento

**Feature ID:** 002-guia-agentes-ia
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-01

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-1 | Criar `docs/guia-agentes-ia.md` com front matter (`sidebar_position: 2`, `title`) e a seção "Resumo executivo" (o que o guia cobre + tabela com as 3 skills e seu papel) | AC-1 | done | `docs/guia-agentes-ia.md` seção "1. Resumo executivo" com tabela `/sdd-harness-creator` / `/codefy` / `/blueprintfy`; confirmado em `guia-full-light.png`/`guia-full-dark.png` |
| T-2 | Escrever subseção "Preparação do repositório": brownfield vs. greenfield via `/sdd-harness-creator`, com a recomendação de modelo forte (Opus) associada ao caminho brownfield | AC-2 | done | subseção "Brownfield vs. greenfield" — recomendação de Opus explícita no parágrafo brownfield |
| T-3 | Adicionar 2 blocos de exemplo de invocação de `/sdd-harness-creator` para setup de projeto (brownfield) | AC-3 | done | 3 blocos de exemplo ("Exemplo 1"–"Exemplo 3", 2 brownfield + 1 greenfield) |
| T-4 | Escrever subseção "Encadeando specs com `/codefy`" (uso contínuo em brownfield: cadeia entre documentos de spec + regras em `AGENTS.md`/`CLAUDE.md`) com 2 blocos de exemplo de invocação | AC-4 | done | subseção com 2 blocos de exemplo ("Exemplo 1"/"Exemplo 2") |
| T-5 | Escrever seção "Uso no dia a dia" com 5+ exemplos em linguagem natural de alto nível | AC-5 | done | seção "3. Uso no dia a dia" com 6 exemplos, cada um frase curta em bloco de código copiável, incluindo `/codefy` e `/blueprintfy` |
| T-6 | Escrever seção "Dicas para `AGENTS.md`/`CLAUDE.md`": subtópico de modos de trabalho (rápido/faseado) + subtópico de review automático de PR via hook/modelo específico (com orientação de perguntar quando não souber configurar) | AC-6 | done | seção "4. Dicas para AGENTS.md/CLAUDE.md" — subtópicos "Modos de trabalho" e "Review automático de PR" |
| T-7 | Rodar `npm run typecheck` e `npm run build`; confirmar que a página é alcançável pela sidebar/navbar numa única rota | AC-7 | done | `npm run typecheck` e `npm run build` verdes (sem erro, `onBrokenLinks: throw` não disparou); página listada na sidebar em `/docs/guia-agentes-ia`, linkada a partir de `docs/intro.mdx` |
| T-8 | Revisar o texto final procurando por qualquer nome/URL de repositório de origem das skills `/codefy`/`/blueprintfy` e remover se encontrado | AC-8 | done | revisão manual do texto de `docs/guia-agentes-ia.md`: nenhuma URL/nome de repositório de origem das skills presente |
| T-9 | Build + serve; captura de tela da página em modo claro e escuro para verificação visual manual (regra do `CLAUDE.md`: "UI changes need eyes on them") | AC-7 | done | `npm run build` + `npm run serve --port 3001`; capturas via CDP (`Emulation.setEmulatedMedia`) `guia-full-light.png` e `guia-full-dark.png` — paleta/tipografia do design system aplicadas, sem footer, sidebar/TOC corretos em ambos os modos |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-1, AC-2: T-2, AC-3: T-3, AC-4: T-4, AC-5: T-5, AC-6: T-6, AC-7: T-7/T-9, AC-8: T-8
- Every task linked to an AC? yes
