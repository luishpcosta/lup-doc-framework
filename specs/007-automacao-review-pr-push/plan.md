# Plan: Automação assíncrona de review de PR após push em branch `feature/*`

**Feature ID:** 007-automacao-review-pr-push
**Phase:** done
**Spec:** ./spec.md
**Last updated:** 2026-08-15

> HOW the spec will be implemented. Every functional requirement in `spec.md` must be addressed here. Cite `constitution.md` for any constraint you rely on.

## Technical Approach

Um hook `PostToolUse` (matcher `Bash`, filtro `if: "Bash(git push *)"`) fica registrado em
`.claude/settings.json` deste repositório (committed). O `command` do hook aponta para um script
**fora deste repositório**, em `~/development/tools/automate-review/` — um local compartilhado por
máquina, não por repositório, que qualquer outro projeto pode reaproveitar apontando seu próprio hook
pra lá. A implementação completa (scripts, testes, configuração, compatibilidade com outras
plataformas agênticas) vive e é documentada nessa pasta — ver
`~/development/tools/automate-review/README.md`, não duplicado aqui.

Do lado deste repositório, o que existe é: o registro do hook (`.claude/settings.json`), o workflow de
CI que o poller consulta (`.github/workflows/ci.yml`), e a página de documentação do padrão
(`docs/automacao-review-pr.md`).

## Architecture & Components

- **`.claude/settings.json`** — registro do hook `PostToolUse`/`Bash`/`if: "Bash(git push *)"`,
  apontando para `$HOME/development/tools/automate-review/hooks/post-push-review.sh`. Committed; não
  liga nada sozinho (o gate de habilitação é resolvido em runtime pelo script externo).
- **`.github/workflows/ci.yml`** — `typecheck` + `build` em push para `feature/**`. É a CI que o
  poller externo consulta via `gh api`.
- **`docs/automacao-review-pr.md`** — página Docusaurus cobrindo FR-12/FR-13: explica o padrão em 3
  peças e como replicá-lo, apontando para o `README.md` da pasta compartilhada para o detalhe de
  implementação e configuração.

## Interfaces / Contracts

**Hook config (`.claude/settings.json`):**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(git push *)",
            "command": "$HOME/development/tools/automate-review/hooks/post-push-review.sh",
            "async": true,
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

A configuração da automação (habilitar/desabilitar, intervalo de polling, terminal, plataforma
agêntica a invocar) vive em `~/development/tools/automate-review/config.env` — não neste repositório.

## Requirement Coverage

| Requirement | Addressed by |
|---|---|
| FR-1, FR-4 a FR-11 / AC-1, AC-4 a AC-11 | Implementados em `~/development/tools/automate-review/hooks/` (fora deste repositório) — ver o `README.md` dessa pasta |
| FR-2, FR-3 / AC-2, AC-3 | Gate de habilitação e log discreto, também externos — ver `README.md` da pasta compartilhada |
| FR-6, FR-7, FR-8 / AC-6, AC-7, AC-8 | Abertura de terminal e invocação da plataforma agêntica, configuráveis via `config.env` externo |
| FR-12, FR-13 / AC-12, AC-13 | `docs/automacao-review-pr.md` (neste repo) + entrada na sidebar autogerada + link em `docs/intro.mdx` |

## Constitution Compliance

- **Spec before code** — este plan só existe porque `spec.md` já está na fase `clarified`, sem
  `[NEEDS CLARIFICATION]` pendente.
- **Design system fidelity** — a nova página usa só os tokens de `src/css/custom.css`, sem CSS novo.
- **Verificação obrigatória** — `npm run typecheck` + `npm run build` cobrem a parte deste repositório
  (a nova página). A lógica de automação em si, por viver fora do repo, tem sua própria suíte de
  testes documentada em `~/development/tools/automate-review/README.md`.

## Key Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Onde registrar o hook | `.claude/settings.json` deste repositório (committed) | `settings.local.json` (não versionado) | O hook em si deve "vir de fábrica" com o repo; quem não habilitar a automação simplesmente não aciona nada (FR-2). Guardar em `settings.local.json` obrigaria cada dev a recriar o hook manualmente, contrariando o objetivo de reuso/replicação (FR-12). |
| Onde vive a implementação | Pasta compartilhada por máquina (`~/development/tools/automate-review/`), fora deste repositório | Scripts dentro deste repositório (`scripts/hooks/`) | Um único local por máquina serve qualquer repositório que registre o hook, em vez de duplicar os scripts por projeto — alinhado com o objetivo de replicação do FR-12. |

## Risks

- **`gh api` sujeito a rate limit** em polling muito frequente — mitigado pelo intervalo mínimo
  default de 30s e pelo teto de tentativas (configuráveis em `config.env`, fora deste repo).
- **A implementação vive fora do controle de versão deste repositório** — mudanças nela não aparecem
  no histórico git deste projeto. Aceito conscientemente: é a mesma pasta compartilhada entre todos os
  repositórios que usam a automação, e sua documentação/testes vivem no próprio `README.md` dela.
