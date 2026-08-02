# Spec: Skills do framework — página de overview técnico

**Feature ID:** 005-guia-skills
**Phase:** done
**Owner:** luishpcosta
**Last updated:** 2026-08-02

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those para `plan.md`.

## Problem / Motivation

Os dois guias práticos (`guia-agentes-ia-app.md`, `guia-repositorio-contexto.md`) mencionam as 10 skills que sustentam o framework, mas sempre no contexto de um passo do fluxo de trabalho ("use `/blueprintfy` para preparar o repositório") — nunca como referência técnica da skill em si (o que ela produz, como funciona por dentro, o que costuma dar errado). Falta uma página dedicada que sirva de índice técnico: para quem já conhece o framework e quer entender rapidamente o que uma skill específica faz, sem reler o guia de workflow inteiro. O usuário pediu essa página com um formato de referência por skill (exemplo dado: seção "Uso básico", formato de saída alternativo em bloco recolhível, "Como funciona por dentro" em bloco recolhível, "Erros comuns" em tabela recolhível), a ser povoada revisitando os dois guias existentes (lista canônica de skills + exemplos já validados) e acessando o repositório de skills (`ai-lup-skills`) para o detalhe técnico de cada uma.

## User Stories

- Como leitor que já decidiu adotar o framework, quero uma página só com as skills, para saber rapidamente o que cada uma faz sem reler os guias de workflow inteiros.
- Como leitor avaliando uma skill específica, quero ver um exemplo de uso, o que ela produz, e os erros mais comuns, para saber se ela resolve meu problema antes de instalar.
- Como leitor que decidiu usar uma skill, quero saber como instalá-la (o CLI e o repositório de origem), sem precisar perguntar em outro lugar.

## Functional Requirements

- FR-1: A página deve listar as 10 skills já documentadas nos dois guias existentes: `sdd-harness-creator`, `codefy`, `review-pr` (guia de aplicação) e `blueprintfy`, `prd-to-adr`, `issue-to-adr`, `make-diagram`, `pm-create-pb`, `pm-create-prd`, `domain-reconcile` (guia de contexto).
- FR-2: Cada skill deve ter uma entrada no formato do exemplo fornecido pelo usuário: nome da skill, descrição curta, seção "Uso básico" com um exemplo real de invocação (reaproveitando o exemplo já publicado no guia correspondente quando existir, para não divergir), um bloco recolhível de formato de saída (adaptado ao que a skill realmente produz — nem toda skill tem uma saída alternativa em JSON como o exemplo do usuário; a página descreve o que cada uma de fato gera), um bloco recolhível "Como funciona por dentro" com as fases internas reais, e um bloco recolhível "Erros comuns" em tabela (sintoma/causa provável/solução) — presente só quando a skill documenta armadilhas explicitamente; a página não inventa erros não documentados.
- FR-3: As skills devem ser agrupadas nas mesmas duas categorias dos guias existentes (repositório de aplicação / repositório de contexto), cada grupo linkando de volta para o guia correspondente.
- FR-4: A página deve abrir com um parágrafo curto explicando o que ela é (referência técnica por skill) e como se diferencia dos dois guias (guias = como usar no fluxo de trabalho; esta página = o que cada skill faz tecnicamente).
- FR-5: A página deve conter uma nota de instalação apontando para o repositório de skills no GitHub (`ai-lup-skills`, link explícito) e o comando `lup-skills add <nome-da-skill>`.
- FR-6: A página deve ser adicionada à sidebar, linkada a partir de `docs/intro.mdx` ("Para onde ir a seguir") e cross-linkada a partir dos dois guias existentes.
- FR-7: O conteúdo técnico de cada skill (formato de saída, funcionamento interno, erros comuns) deve ser extraído dos arquivos reais da skill no repositório `ai-lup-skills` — não inventado.

## Acceptance Criteria

- **AC-1** — Given a página publicada, when o leitor conta as entradas de skill, then encontra exatamente as 10 skills listadas em FR-1. _(satisfies FR-1)_
- **AC-2** — Given qualquer entrada de skill, when o leitor a lê, then encontra nome, descrição, "Uso básico" com exemplo real, e ao menos os blocos recolhíveis "Como funciona por dentro"; "Formato de saída" e "Erros comuns" aparecem quando a skill documenta esse conteúdo. _(satisfies FR-2)_
- **AC-3** — Given a página completa, when o leitor a navega, then as skills estão agrupadas em "Repositório de aplicação" e "Repositório de contexto", cada grupo com um link para o guia correspondente. _(satisfies FR-3)_
- **AC-4** — Given a abertura da página, when o leitor a lê, then entende que esta é uma referência técnica por skill, diferente dos guias de workflow. _(satisfies FR-4)_
- **AC-5** — Given a seção de instalação, when o leitor a lê, then encontra o link para `https://github.com/luishpcosta/ai-lup-skills` e o comando `lup-skills add <nome-da-skill>`. _(satisfies FR-5)_
- **AC-6** — Given o site publicado, when se verifica a sidebar/navegação, then a nova página aparece na sidebar, `docs/intro.mdx` linka para ela, e os dois guias existentes linkam para ela (e vice-versa). `npm run typecheck`/`build` terminam sem erro. _(satisfies FR-6)_
- **AC-7** — Given qualquer afirmação técnica sobre uma skill (formato de saída, fases internas, erros), when checada contra o `SKILL.md`/`references/` real da skill em `ai-lup-skills`, then a afirmação corresponde ao que está documentado lá — nenhum comportamento inventado. _(satisfies FR-7)_

## Edge Cases

- Nem toda skill tem uma saída alternativa (ex. JSON para CI) como o exemplo `grill-me` do usuário — para essas, o bloco de formato de saída descreve o output real (arquivo gerado, caminho, comentário postado via `gh` CLI, etc.), sem forçar um formato que a skill não tem.
- Nem toda skill documenta erros comuns explicitamente — para essas, a seção "Erros comuns" é omitida (não preenchida com conteúdo inventado).
- A skill `skill-creator` existe no repositório de skills mas não é citada em nenhum dos dois guias (é meta-tooling para criar skills, não uma skill do framework) — fica fora desta página.

## Out of Scope (Non-Goals)

- Não reescreve os dois guias práticos existentes — eles continuam sendo a referência de *como* usar as skills num fluxo de trabalho; esta página é *o que* cada skill faz.
- Não documenta a skill `skill-creator` (meta-tooling, não uma skill do framework).
- Não implementa nem testa a instalação real via `lup-skills add` neste repositório — `lup-doc-framework` é um site de documentação, não um repositório onde as skills seriam usadas na prática.

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-02 | Reversão da decisão de não citar o repositório de origem das skills | Features `002-guia-agentes-ia` e `003-guia-repositorio-contexto` registraram, por pedido explícito do usuário à época, que os guias não deveriam citar nominalmente o repositório externo de origem das skills (FR-8 em ambas). Nesta feature, o usuário pediu explicitamente o oposto: adicionar o link do repositório (`ai-lup-skills`) no GitHub, numa nota de instalação. Interpretado como uma decisão nova e específica desta página — os dois guias existentes **não** são retroativamente alterados; a regra de não citar o repositório continua valendo lá, a menos que o usuário peça explicitamente para mudar também. |
