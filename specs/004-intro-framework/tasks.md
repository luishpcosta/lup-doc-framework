# Tasks: Introdução — o que é o framework híbrido

**Feature ID:** 004-intro-framework
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-02

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-1 | Reescrever o parágrafo de abertura de `docs/intro.mdx`: o que é o framework em poucas frases (ciclo negócio→técnica→backlog→implementação, IA + rastreabilidade) | AC-1 | done | parágrafo de abertura em `docs/intro.mdx` cobre o ciclo completo e a rastreabilidade; confirmado em `intro-light.png`/`intro-dark.png` |
| T-2 | Escrever seção "Por que o framework existe": situação (uso de IA não padronizado) + complicação (decisões repetidas, contexto perdido, IA sem contexto) | AC-2 | done | seção "Por que o framework existe" com os 3 itens da complicação |
| T-3 | Escrever seção "Duas análises, uma história": PB→PRD, ADR→ACs em paralelo, e a cadeia de IDs que une as duas numa história rastreável | AC-3 | done | seção "Duas análises, uma história" com a cadeia `PB-001 → PRD-004 → ADR-012 → AC-017 → HIST-231` |
| T-4 | Escrever seção "Onde o contexto vive": contenção de domínio no repositório de contexto (`CONTEXT-MAP.md`, um domínio por pasta, bounded context com glossário/ADRs) | AC-4 | done | seção "Onde o contexto vive" |
| T-5 | Escrever seção "Como o código é gerado": harness Speckit SDD dentro do repositório de serviço, pipeline `spec → plan → tasks → verify` | AC-5 | done | seção "Como o código é gerado" com lista 1–4 do pipeline |
| T-6 | ~~Escrever seção "O problema que ainda não resolvemos"~~ — implementada e verificada, depois **removida a pedido do usuário** (pós-implementação) | — | superseded | seção escrita e verificada em `intro-dark-full.png`/`intro-light-full.png`, depois removida de `docs/intro.mdx`; não satisfaz mais nenhuma AC ativa (FR-6/AC-6 original removidos da spec) |
| T-7 | Escrever seção "O que falta decidir": as 4 decisões de gestão (harness padrão, responsáveis pela contextualização, convenção de formato, quem julga a entrega) | AC-6 | done | seção "O que falta decidir" com as 4 decisões em lista |
| T-8 | Escrever seção final "Para onde ir a seguir": links para `guia-agentes-ia-app.md` e `guia-repositorio-contexto.md` (cada um rotulado pela visão que atende) e link de volta para a home | AC-7 | done | seção "Para onde ir a seguir" com os 2 links rotulados + link para a home; visível em `intro-light-bottom.png` |
| T-9 | Remover o texto de placeholder original; rodar `npm run typecheck` + `npm run build` | AC-8 | done | `grep -n "placeholder" docs/intro.mdx` sem resultado (exit 1); `npm run typecheck` e `npm run build` verdes |
| T-10 | Build + serve; captura de tela em modo claro e escuro para verificação visual manual (repetida após a remoção de T-6) | AC-1..AC-8 | done | 1ª rodada: `intro-light.png`/`intro-dark.png`/`intro-light-bottom.png` (com a seção ainda presente); 2ª rodada pós-remoção: `intro-final-light.png`/`intro-final-dark.png` — paleta/tipografia corretas em ambos os modos, sem footer, TOC e sidebar corretos, pagination "Próxima" funcionando |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-1, AC-2: T-2, AC-3: T-3, AC-4: T-4, AC-5: T-5, AC-6: T-7, AC-7: T-8, AC-8: T-9
- Every task linked to an AC? yes (T-6 is `superseded`, kept for history — it satisfied a requirement since removed from `spec.md`)
