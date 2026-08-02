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
| T-2 | ~~Escrever seção "Por que o framework existe": situação + complicação~~ — reescrita em T-11 (tom de crítica trocado por proposta de valor) | AC-2 | superseded | versão original (situação/complicação) publicada e depois reescrita — ver T-11 |
| T-3 | Escrever seção "Duas análises, uma história": PB→PRD, ADR→ACs em paralelo, e a cadeia de IDs que une as duas numa história rastreável | AC-3 | done | seção "Duas análises, uma história" com a cadeia `PB-001 → PRD-004 → ADR-012 → AC-017 → HIST-231` |
| T-4 | Escrever seção "Onde o contexto vive": contenção de domínio no repositório de contexto (`CONTEXT-MAP.md`, um domínio por pasta, bounded context com glossário/ADRs) | AC-4 | done | seção "Onde o contexto vive" |
| T-5 | Escrever seção "Como o código é gerado": harness Speckit SDD dentro do repositório de serviço, pipeline `spec → plan → tasks → verify` | AC-5 | done | seção "Como o código é gerado" com lista 1–4 do pipeline |
| T-6 | ~~Escrever seção "O problema que ainda não resolvemos"~~ — implementada e verificada, depois **removida a pedido do usuário** (pós-implementação) | — | superseded | seção escrita e verificada em `intro-dark-full.png`/`intro-light-full.png`, depois removida de `docs/intro.mdx`; não satisfaz mais nenhuma AC ativa (FR-6/AC-6 original removidos da spec) |
| T-7 | ~~Escrever seção "O que falta decidir": as 4 decisões de gestão~~ — renomeada/reescrita em T-11 (pendência de gestão → dimensão de customização por squad) | AC-6 | superseded | versão original ("O que falta decidir") publicada e depois reescrita — ver T-11 |
| T-8 | Escrever seção final "Para onde ir a seguir": links para `guia-agentes-ia-app.md` e `guia-repositorio-contexto.md` (cada um rotulado pela visão que atende) e link de volta para a home | AC-7 | done | seção "Para onde ir a seguir" com os 2 links rotulados + link para a home; visível em `intro-light-bottom.png` |
| T-9 | Remover o texto de placeholder original; rodar `npm run typecheck` + `npm run build` | AC-8 | done | `grep -n "placeholder" docs/intro.mdx` sem resultado (exit 1); `npm run typecheck` e `npm run build` verdes |
| T-10 | Build + serve; captura de tela em modo claro e escuro para verificação visual manual (repetida após a remoção de T-6) | AC-1..AC-8 | done | 1ª rodada: `intro-light.png`/`intro-dark.png`/`intro-light-bottom.png` (com a seção ainda presente); 2ª rodada pós-remoção: `intro-final-light.png`/`intro-final-dark.png` — paleta/tipografia corretas em ambos os modos, sem footer, TOC e sidebar corretos, pagination "Próxima" funcionando |
| T-11 | Revalidar o tom da página como pitch de produto por squad: reescrever "Por que o framework existe" (situação/complicação → proposta de valor, 3 benefícios) e renomear "O que falta decidir" → "Como cada squad personaliza o framework" (pendência → customização); trocar frase negativa da cadeia de IDs por afirmação positiva | AC-2, AC-6 | done | `docs/intro.mdx`: seção "Por que o framework existe" reescrita com 3 bullets de benefício, sem menção a "cada time à sua maneira"/"erra mais"; seção renomeada "Como cada squad personaliza o framework" com as mesmas 4 dimensões, enquadradas como definição do squad; frase da cadeia de IDs trocada para "Essa cadeia garante cobertura auditável e detecção de desvio em qualquer etapa" |
| T-12 | Rodar `npm run typecheck` + `npm run build`; nova captura de tela em claro e escuro pós-revalidação de tom | AC-1..AC-8 | done | `npm run typecheck`/`build` verdes; capturas `intro-tone-light.png`/`intro-tone-dark.png` |
| T-13 | Corrigir a seção "Duas análises, uma história": usuário apontou que "rodam em paralelo" descrevia só um dos modos possíveis — reescrita para cobrir paralelo, sequencial, e início direto pela técnica (demandas puramente técnicas, com ou sem impacto em funcionalidade de produto) | AC-3 | done | `docs/intro.mdx`: frase de abertura da seção reescrita + novo parágrafo listando os 3 modos, antes do parágrafo sobre a "história" |
| T-14 | Rodar `npm run typecheck` + `npm run build` após T-13 | AC-3 | done | `npm run typecheck`/`build` verdes |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-1, AC-2: T-11, AC-3: T-3/T-13, AC-4: T-4, AC-5: T-5, AC-6: T-11, AC-7: T-8, AC-8: T-9
- Every task linked to an AC? yes (T-2, T-6, T-7 are `superseded`, kept for history — their original content was rewritten/removed by later tasks)
