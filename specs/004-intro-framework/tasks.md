# Tasks: Introdução — visão de produto do framework híbrido

**Feature ID:** 004-intro-framework
**Phase:** tasks
**Plan:** ./plan.md
**Last updated:** 2026-08-02

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks (histórico — versão técnica/arquitetural, T-1 a T-14)

Toda esta rodada foi **superseded**: `spec.md` foi reescrita por completo (visão de produto, novo conjunto de FR/AC) a pedido do usuário — o conteúdo técnico que essas tasks produziram já vive na home (`framework-hibrido.html`) e foi removido de `docs/intro.mdx`. Mantidas para histórico/auditoria — não refletem o conteúdo atual da página.

| ID | Task | Satisfies (histórico) | Status | Evidence |
|---|---|---|---|---|
| T-1 | Reescrever o parágrafo de abertura de `docs/intro.mdx`: o que é o framework em poucas frases | ~~AC-1~~ | superseded | conteúdo substituído pela seção "Resumo executivo" (ver T-15) |
| T-2 | ~~Escrever seção "Por que o framework existe"~~ | ~~AC-2~~ | superseded | ver T-11 (reescrita), depois removida por completo nesta rodada |
| T-3 | Escrever seção "Duas análises, uma história" | ~~AC-3~~ | superseded | conteúdo técnico removido — já coberto pela home |
| T-4 | Escrever seção "Onde o contexto vive" | ~~AC-4~~ | superseded | conteúdo técnico removido — já coberto pela home |
| T-5 | Escrever seção "Como o código é gerado" | ~~AC-5~~ | superseded | conteúdo técnico removido — já coberto pela home |
| T-6 | ~~Escrever seção "O problema que ainda não resolvemos"~~ | — | superseded | escrita, verificada, removida a pedido do usuário (ver histórico anterior) |
| T-7 | ~~Escrever seção "O que falta decidir"~~ | ~~AC-6~~ | superseded | ver T-11 (reescrita), depois removida por completo nesta rodada |
| T-8 | Escrever seção final "Para onde ir a seguir" | ~~AC-7~~ | done | mantida nesta rodada, ver T-23 |
| T-9 | Remover o texto de placeholder original | ~~AC-8~~ | done | ainda válido — placeholder nunca voltou |
| T-10 | Build + serve; captura de tela claro/escuro | ~~AC-1..AC-8~~ | superseded | ver T-26 (nova rodada de verificação) |
| T-11 | Revalidar o tom da página como pitch de produto por squad | ~~AC-2, AC-6~~ | superseded | conteúdo reescrito removido por completo nesta rodada |
| T-12 | Rodar typecheck/build; captura pós-revalidação de tom | ~~AC-1..AC-8~~ | superseded | ver T-26 |
| T-13 | Corrigir seção "Duas análises, uma história" (3 modos de execução) | ~~AC-3~~ | superseded | conteúdo técnico removido — mesmo ajuste replicado em `framework-hibrido.html`/`guia-repositorio-contexto.md`, fora desta feature |
| T-14 | Rodar typecheck/build após T-13 | ~~AC-3~~ | superseded | ver T-26 |

## Tasks (atuais — visão de produto, estrutura de Product Brief)

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-15 | Escrever "Resumo executivo" (3-5 frases: o que é, para quem, por que agora) | AC-1 | done | seção "Resumo executivo" em `docs/intro.mdx` |
| T-16 | Escrever seção "O Problema": ferramentas agênticas disponíveis, falta caminho prático de especialização por função | AC-2 | done | seção "O Problema" |
| T-17 | ~~Escrever seção "A Solução": especialização por papel~~ — reescrita em T-27 (agente orquestrador, não chamada manual) | AC-3 | superseded | versão original publicada e depois reescrita — ver T-27 |
| T-18 | ~~Escrever seção "O que torna isto diferente": contraste com ferramenta genérica sem especialização~~ — reescrita em T-27 (contraste com chamada manual, não só "sem especialização") | AC-4 | superseded | versão original publicada e depois reescrita — ver T-27 |
| T-19 | Escrever seção "Quem isto serve": os 3 papéis, dev cobrindo pipeline de execução + especializações do dia a dia | AC-5 | done | seção "Quem isto serve" com os 3 papéis detalhados |
| T-20 | Escrever seção "Critérios de sucesso": 3 sinais (agentes especializados por etapa, herança sem reconstrução manual, adoção sem treinamento informal) | AC-6 | done | seção "Critérios de sucesso" com os 3 sinais |
| T-21 | Escrever seção "Escopo": dentro (especialização por papel) / fora (detalhe técnico, delegado a outras páginas) | AC-7 | done | seção "Escopo" com "No escopo"/"Fora do escopo" |
| T-22 | ~~Escrever seção "Visão": extensão a outros papéis (QA, design, suporte)~~ — ampliada em T-27 (+ output padronizado pavimentando automações futuras) | AC-8 | superseded | versão original publicada e depois ampliada — ver T-27 |
| T-23 | Ajustar a seção final "Para onde ir a seguir": manter os 2 links de guias + home (única seção que pode citar termos técnicos) | AC-9 | done | seção final mantida, sem alteração de conteúdo além de reposicionamento |
| T-24 | Revisar o corpo da página (fora da seção de links) procurando termos técnicos de artefato/pipeline | AC-10 | done | `grep` confirma ausência de PB/PRD/ADR/AC/CONTEXT-MAP/spec-plan-tasks-verify/nomes de skill fora de "Para onde ir a seguir" |
| T-25 | Revisar o tom da página completa contra a barra já validada (sem linguagem alarmista/que solape a IA/que soe como pendência) | AC-11 | done | revisão manual — nenhuma frase problemática identificada |
| T-26 | Rodar `npm run typecheck` + `npm run build`; captura de tela em claro e escuro | AC-1..AC-11 | done | `npm run typecheck`/`build` verdes; capturas `intro-pb-light.png`/`intro-pb-dark.png` |
| T-27 | Deixar explícito o mecanismo de "agente orquestrador" (não chamada manual de agentes avulsos) com "resultado padronizado": reescrever "Resumo executivo", "A Solução", "O que torna isto diferente", "Quem isto serve" (2 primeiros bullets) e "Visão" (+ automações futuras), a pedido de acompanhamento do usuário | AC-1, AC-3, AC-4, AC-5, AC-8 | done | `docs/intro.mdx`: "agente orquestrador" e "resultado padronizado" aparecem nas 5 seções citadas; "Visão" ganhou frase sobre automações futuras |
| T-28 | Rodar `npm run typecheck` + `npm run build`; nova captura de tela em claro e escuro após T-27; `grep` confirmando ausência de termos técnicos fora da seção de links | AC-1..AC-11 | done | `npm run typecheck`/`build` verdes; `grep` sem resultado; capturas `intro-orch-light.png`/`intro-orch-dark.png` |

Status values: `todo` → `doing` → `done` → `superseded`.

## Coverage Check

Confirm manually before implementing:

- Every AC referenced by at least one task? yes — AC-1: T-15/T-27, AC-2: T-16, AC-3: T-17/T-27, AC-4: T-18/T-27, AC-5: T-19/T-27, AC-6: T-20, AC-7: T-21, AC-8: T-22/T-27, AC-9: T-23, AC-10: T-24, AC-11: T-25
- Every task linked to an AC? yes (T-1 a T-14, T-17, T-18, T-22 `superseded`, mantidas para histórico)
