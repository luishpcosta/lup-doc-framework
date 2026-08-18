# Tasks: Automação assíncrona de review de PR após push em branch `feature/*`

**Feature ID:** 007-automacao-review-pr-push
**Phase:** done
**Plan:** ./plan.md
**Last updated:** 2026-08-15

> Small, ordered, independently verifiable tasks derived from `plan.md`.
> **Gate:** every acceptance criterion has ≥1 task, and every task references an AC.

## Tasks

| ID | Task | Satisfies | Status | Evidence |
|---|---|---|---|---|
| T-1 | Registrar o hook `PostToolUse`/`Bash` em `.claude/settings.json`, apontando para `$HOME/development/tools/automate-review/hooks/post-push-review.sh` | AC-1, AC-2 | done | `.claude/settings.json` — schema confirmado contra a documentação oficial de hooks |
| T-2 | Implementar a automação (gate, polling, classificação de estado, abertura de terminal, invocação da plataforma agêntica) | AC-1, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-11 | done | Implementação, testes e evidência vivem fora deste repositório, em `~/development/tools/automate-review/` (pasta compartilhada por máquina) — ver o `README.md` dessa pasta |
| T-3 | Escrever `docs/automacao-review-pr.md` (fluxo ponta a ponta + seção "como replicar em outro repositório") | AC-12 | done | `docs/automacao-review-pr.md` |
| T-4 | Publicar a página na navegação (sidebar autogerada por `sidebar_position` no front matter) e linká-la em `docs/intro.mdx`, usando só tokens de `src/css/custom.css` | AC-13 | done | front matter `sidebar_position: 7` em `docs/automacao-review-pr.md`; link adicionado em "Para onde ir a seguir" de `docs/intro.mdx`; nenhum CSS novo introduzido |
| T-5 | `npm run typecheck` + `npm run build` (regressão do site, inclui a nova página) | AC-12, AC-13 | done | `npm run typecheck` sem erros; `npm run build` → "Generated static files in build", sem link quebrado (`onBrokenLinks: 'throw'`) |
| T-6 | Verificação visual manual (`npm run serve`, light + dark) da nova página, por exigência da constituição para mudanças de UI | AC-13 | done | Chrome headless via CDP (`Emulation.setEmulatedMedia` + `data-theme`) capturando `/docs/automacao-review-pr`: título, breadcrumb, item de sidebar e paleta corretos em ambos os modos |

## Coverage Check

- Every AC referenced by at least one task? yes (AC-1..AC-13 all appear above)
- Every task linked to an AC? yes
