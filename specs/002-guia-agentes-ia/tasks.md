# Tasks: Guia — preparar e usar um repositório de aplicação

**Feature ID:** 002-guia-agentes-ia
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-02

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-1 | Criar `docs/guia-agentes-ia-app.md` com front matter (`sidebar_position: 2`, `title`) e a seção "Resumo executivo" (o que o guia cobre + tabela com as skills de preparação e seu papel) | AC-1 | done | `docs/guia-agentes-ia-app.md` seção "1. Resumo executivo" com tabela `/sdd-harness-creator` / `/codefy`; confirmado em `guia-full-light.png`/`guia-full-dark.png` |
| T-2 | Escrever subseção "Preparação do repositório": brownfield vs. greenfield via `/sdd-harness-creator`, com a recomendação de modelo forte (Opus) associada ao caminho brownfield | AC-2 | done | subseção "Brownfield vs. greenfield" — recomendação de Opus explícita no parágrafo brownfield |
| T-3 | Adicionar 2 blocos de exemplo de invocação de `/sdd-harness-creator` para setup de projeto (brownfield) | AC-3 | done | 3 blocos de exemplo ("Exemplo 1"–"Exemplo 3", 2 brownfield + 1 greenfield) |
| T-4 | Escrever subseção "Encadeando specs com `/codefy`" (uso contínuo em brownfield: cadeia entre documentos de spec + regras em `AGENTS.md`/`CLAUDE.md`) com 2 blocos de exemplo de invocação | AC-4 | done | subseção com 2 blocos de exemplo ("Exemplo 1"/"Exemplo 2") |
| T-5 | Escrever seção "Uso no dia a dia" com 5+ exemplos em linguagem natural de alto nível | AC-5 | done | seção "3. Uso no dia a dia" com 5 exemplos, cada um frase curta em bloco de código copiável, incluindo `/codefy` |
| T-6 | Escrever seção "Dicas para `AGENTS.md`/`CLAUDE.md`": subtópico de modos de trabalho (rápido/faseado) + subtópico de review automático de PR via hook/modelo específico (com orientação de perguntar quando não souber configurar) | AC-6 | done | seção "4. Dicas para AGENTS.md/CLAUDE.md" — subtópicos "Modos de trabalho" e "Review automático de PR" |
| T-7 | Rodar `npm run typecheck` e `npm run build`; confirmar que a página é alcançável pela sidebar/navbar numa única rota | AC-7 | done | `npm run typecheck` e `npm run build` verdes (sem erro, `onBrokenLinks: throw` não disparou); página listada na sidebar em `/docs/guia-agentes-ia-app`, linkada a partir de `docs/intro.mdx` |
| T-8 | Revisar o texto final procurando por qualquer nome/URL de repositório de origem das skills `/codefy`/`/blueprintfy` e remover se encontrado | AC-8 | done | revisão manual do texto de `docs/guia-agentes-ia-app.md`: nenhuma URL/nome de repositório de origem das skills presente |
| T-9 | Build + serve; captura de tela da página em modo claro e escuro para verificação visual manual (regra do `CLAUDE.md`: "UI changes need eyes on them") | AC-7 | done | `npm run build` + `npm run serve --port 3001`; capturas via CDP (`Emulation.setEmulatedMedia`) `guia-full-light.png` e `guia-full-dark.png` — paleta/tipografia do design system aplicadas, sem footer, sidebar/TOC corretos em ambos os modos |
| T-10 | Renomear `docs/guia-agentes-ia.md` → `docs/guia-agentes-ia-app.md` (via `git mv`); ajustar `title`/H1 e acrescentar frase de escopo no primeiro parágrafo deixando explícito que o guia é para repositório de aplicação/código; atualizar link em `docs/intro.mdx` | AC-9 | done | `git mv` preservando histórico; `title`/H1 final = "Guia — preparar e usar um repositório de aplicação"; frase de escopo no parágrafo de abertura; `docs/intro.mdx` linka para `./guia-agentes-ia-app.md`; `npm run build` verde |

| T-11 | Reescrever `docs/guia-agentes-ia-app.md` no modelo How-To (Diátaxis) + minimalismo instrucional: "1. Resumo" vira parágrafo curto + lista de definição, "2. Preparação do repositório" → "2. Como preparar o repositório", bullets de brownfield/greenfield encurtados, intro de `/codefy` encurtada, e "Review automático de PR" reescrita com bloco de comando copiável | AC-10 | done | diff aplicado (`docs/guia-agentes-ia-app.md`, ~1030 → ~750 palavras); `npm run typecheck` + `npm run build` verdes |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-1, AC-2: T-2, AC-3: T-3, AC-4: T-4, AC-5: T-5, AC-6: T-6, AC-7: T-7/T-9, AC-8: T-8, AC-9: T-10, AC-10: T-11
- Every task linked to an AC? yes
