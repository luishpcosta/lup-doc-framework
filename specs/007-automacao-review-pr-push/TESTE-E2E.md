# Teste end-to-end — 2026-08-15

PR criada deliberadamente para validar, na prática, o fluxo completo da automação descrita em
`specs/007-automacao-review-pr-push/`: push numa branch `feature/*` com `AGENT_PR_REVIEW_ENABLED=true`
→ hook `PostToolUse` dispara `scripts/hooks/post-push-review.sh` → `poll-and-review.sh` acompanha a
CI (`.github/workflows/ci.yml`) em background → ao concluir, abre uma janela com o resultado.

Este arquivo (e a branch/PR associada) pode ser removido depois que o teste for observado.
