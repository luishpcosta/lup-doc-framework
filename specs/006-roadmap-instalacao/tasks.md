# Tasks: Roadmap — implantar o framework num squad com sistemas distribuídos

**Feature ID:** 006-roadmap-instalacao
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-02

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-1 | Criar `docs/roadmap-instalacao.md` com front matter (`sidebar_position: 2`, `title`) e parágrafo de abertura (o que é este roadmap, para quem) | AC-1 | done | front matter + abertura em `docs/roadmap-instalacao.md` |
| T-2 | Escrever "Fase 1 — Domínio e aplicações": checklist de escolha de domínio/aplicações + link para o guia de repositório de aplicação | AC-2 | done | seção "Fase 1" com checklist e link |
| T-3 | Escrever "Fase 2 — Repositório de documentação da squad": criação/reuso, as duas camadas (to-be/as-is, as-is marcada opcional), scaffold de pastas, exemplo de `/blueprintfy` | AC-3 | done | seção "Fase 2" com scaffold ASCII e bloco de comando `/blueprintfy` |
| T-4 | Escrever "Fase 3 — Povoar a documentação a partir das aplicações": exemplo faseado de `/domain-reconcile` (plano → aprovação → execução) | AC-4 | done | seção "Fase 3" com 2 blocos de comando em sequência |
| T-5 | Escrever "Fase 4 — Manter o repositório de contexto atualizado": uso recorrente pós-deploy, link para "Manter o repositório saudável" | AC-5 | done | seção "Fase 4" com link para `guia-repositorio-contexto.md#manter-o-repositório-saudável` |
| T-6 | Confirmar que `docs/guia-repositorio-contexto.md` não foi alterado nesta feature | AC-6 | done | `git diff` do arquivo vazio para esta feature |
| T-7 | Incrementar `sidebar_position` em `guia-agentes-ia-app.md` (2→3), `guia-repositorio-contexto.md` (3→4), `skills.md` (4→5) | AC-7 | done | front matter dos 3 arquivos atualizado |
| T-8 | Adicionar link para o roadmap em `docs/intro.mdx` ("Para onde ir a seguir") | AC-8 | done | novo item de lista em `docs/intro.mdx` |
| T-9 | Revisar o tom da página completa (sem linguagem alarmista/pendência) | AC-9 | done | revisão manual — nenhuma frase problemática identificada |
| T-10 | Rodar `npm run typecheck` + `npm run build`; verificação visual em claro e escuro, com atenção às task lists | AC-1..AC-9 | done | `npm run typecheck`/`build` verdes; capturas de `docs/roadmap-instalacao` em claro e escuro, sidebar confirmando a nova ordem |
| T-11 | Adicionar `sidebar_label: Roadmap de Instalação` ao front matter, a pedido de acompanhamento do usuário | AC-10 | done | sidebar exibe "Roadmap de Instalação"; título completo mantido no H1/aba do navegador |
| T-12 | Adicionar `NNN-slug-{story-name}-HIST.md` ao scaffold (Fase 2) e à menção de artefatos no exemplo de `/blueprintfy` | AC-3 | done | scaffold e exemplo de `/blueprintfy` citam História |
| T-13 | Tornar os exemplos de `/domain-reconcile` (Fase 3) mais realistas com um link de GitHub genérico | AC-11 | done | `github.com/minha-org/pagamentos-service` nos 2 blocos de comando da Fase 3 |
| T-14 | Rodar `npm run typecheck` + `npm run build`; nova captura de tela confirmando o rótulo curto na sidebar e os exemplos atualizados | AC-1..AC-11 | done | `npm run typecheck`/`build` verdes; capturas `roadmap2-light.png`/`roadmap2-mid.png` |
| T-15 | Corrigir o scaffold e o texto: história não é 1:1 com funcionalidade — pode haver mais de uma por funcionalidade | AC-3 | done | scaffold mostra 2 instâncias de `HIST.md` com nota "1 ou mais por funcionalidade"; bullet da camada to-be e exemplo de `/blueprintfy` atualizados |
| T-16 | Rodar `npm run typecheck` + `npm run build`; captura de tela confirmando o scaffold corrigido | AC-3 | done | `npm run typecheck`/`build` verdes; captura `roadmap-hist-fix.png` |
| T-17 | Reescrever os 3 blocos de comando (`/blueprintfy`, 2x `/domain-reconcile`) em tom mais alto nível/casual, simulando um dev jr/pleno | AC-2, AC-3, AC-4 | done | prompts mais curtos, mantendo repositório/branch/pasta no primeiro `/domain-reconcile` |
| T-18 | Rodar `npm run typecheck` + `npm run build`; captura de tela confirmando os prompts atualizados | AC-2, AC-3, AC-4 | done | `npm run typecheck`/`build` verdes; captura `roadmap-casual.png` |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-1, AC-2: T-2, AC-3: T-3/T-12, AC-4: T-4, AC-5: T-5, AC-6: T-6, AC-7: T-7/T-10, AC-8: T-8, AC-9: T-9, AC-10: T-11, AC-11: T-13
- Every task linked to an AC? yes
