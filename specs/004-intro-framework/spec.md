# Spec: Introdução — visão de produto do framework híbrido

**Feature ID:** 004-intro-framework
**Phase:** tasks
**Owner:** luishpcosta
**Last updated:** 2026-08-02

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those para `plan.md`.

## Problem / Motivation

`docs/intro.mdx` (implementado numa rodada anterior desta mesma feature — ver Clarifications Log) explicava o framework do ponto de vista técnico/arquitetural: os três pilares (duas análises, contenção de domínio, harness SDD) e as dimensões de customização por squad. Esse conteúdo já é coberto, com fidelidade visual total, pela home (`static/framework-hibrido.html`, embutida via iframe) — mantê-lo também em `/docs/intro` duplicava informação sem agregar uma leitura diferente. Falta uma **visão de produto** do framework: por que ele existe do ponto de vista de quem decide adotá-lo, não de como ele é construído por dentro. O usuário pediu para basear essa reformulação nos tópicos de um Product Brief (skill `pm-create-pb`) e num brief inicial: fomentar o uso de ferramentas agênticas já disponíveis, com orquestração e aplicação especializada por função — profissionais de produto conduzindo a análise de negócio, líderes técnicos a análise técnica, e desenvolvedores especializando a implementação.

## User Stories

- Como visitante que avalia se deve adotar o framework, quero entender em `/docs/intro` o problema que ele resolve e por que essa abordagem é diferente de simplesmente dar acesso a ferramentas de IA genéricas, sem entrar em detalhe técnico.
- Como profissional de produto, líder técnico ou desenvolvedor, quero reconhecer meu papel específico na proposta — que tipo de análise ou especialização a IA me ajuda a conduzir.
- Como leitor que já decidiu adotar o framework, quero ser direcionado a partir da introdução para a home (detalhe técnico/visual) e para os dois guias práticos já publicados.

## Functional Requirements

- FR-1: A página deve abrir com um resumo executivo curto (3-5 frases) que sintetiza o que é o framework, para quem, e por que agora — quem lê só essa seção entende a aposta central (especialização agêntica por função, orquestrada dentro do mesmo ciclo).
- FR-2: A página deve conter uma seção "O Problema": ferramentas agênticas de IA já estão disponíveis, mas falta um caminho prático de como especializá-las por função dentro de um ciclo de desenvolvimento coerente.
- FR-3: A página deve conter uma seção "A Solução": o framework especializa o uso de IA por papel — profissionais de produto na análise de negócio, líderes técnicos na análise técnica, desenvolvedores na implementação — de forma que o resultado de uma etapa alimenta diretamente a próxima.
- FR-4: A página deve conter uma seção "O que torna isto diferente", contrastando com o caminho óbvio (dar a mesma ferramenta genérica de IA para todo mundo, sem especialização por função).
- FR-5: A página deve conter uma seção "Quem isto serve" cobrindo os três papéis: profissionais de produto (análise de negócio), líderes técnicos (análise técnica), e desenvolvedores (especialização da IA na implementação — cobrindo tanto o pipeline de execução quanto tarefas do dia a dia como revisão de código assistida, testes gerados por agente e apoio a debugging).
- FR-6: A página deve conter uma seção "Critérios de sucesso" com sinais observáveis: cada papel usando agentes especializados na própria etapa (não IA genérica de produtividade pessoal); o resultado de uma etapa chegando à próxima sem reconstrução manual; um squad novo conseguindo adotar o modelo sem depender de treinamento informal.
- FR-7: A página deve conter uma seção "Escopo" com o que está dentro (a especialização agêntica por papel e sua orquestração) e o que fica fora (o detalhamento de artefatos/pipeline técnico, delegado à home e aos guias práticos).
- FR-8: A página deve conter uma seção "Visão" apontando a evolução natural: a mesma lógica de especialização se estendendo a outros papéis do ciclo (ex. QA, design, suporte) conforme o modelo se prova em produção.
- FR-9: A página deve manter uma seção final de navegação ("Para onde ir a seguir") com links para os dois guias práticos (`guia-agentes-ia-app.md`, `guia-repositorio-contexto.md`) e para a home — esses links podem citar os termos técnicos (PB/PRD/ADR/AC, harness) porque apontam para onde esse detalhe realmente vive, não os explicam na própria introdução.
- FR-10: Fora da seção de links (FR-9), a página não deve usar terminologia técnica de artefato/pipeline (PB, PRD, ADR, AC, CONTEXT-MAP, spec/plan/tasks/verify, nomes de skill) — a visão de produto fala de papel, especialização e ciclo, não de artefato.
- FR-11: A página deve manter o padrão de tom já validado nesta feature: proposta de valor, sem linguagem que solape a confiança na própria IA nem que soe como pendência de governança não resolvida.

## Acceptance Criteria

- **AC-1** — Given a página publicada, when um leitor lê o resumo executivo, then em 3-5 frases entende o que é o framework, para quem, e por que agora. _(satisfies FR-1)_
- **AC-2** — Given a seção "O Problema", when o leitor a lê, then encontra a afirmação de que ferramentas agênticas já existem mas falta um caminho prático de especialização por função. _(satisfies FR-2)_
- **AC-3** — Given a seção "A Solução", when o leitor a lê, then encontra os três papéis (produto/técnica/desenvolvimento) e a explicação de que o resultado de uma etapa alimenta a próxima. _(satisfies FR-3)_
- **AC-4** — Given a seção "O que torna isto diferente", when o leitor a lê, then encontra o contraste explícito com "a mesma ferramenta genérica para todo mundo, sem especialização". _(satisfies FR-4)_
- **AC-5** — Given a seção "Quem isto serve", when o leitor a lê, then encontra os três papéis detalhados, com o papel do desenvolvedor cobrindo tanto o pipeline de execução quanto tarefas do dia a dia (revisão assistida, testes gerados por agente, debugging). _(satisfies FR-5)_
- **AC-6** — Given a seção "Critérios de sucesso", when o leitor a lê, then encontra os 3 sinais (agentes especializados por etapa, herança sem reconstrução manual, adoção por squad novo sem treinamento informal). _(satisfies FR-6)_
- **AC-7** — Given a seção "Escopo", when o leitor a lê, then encontra o que está dentro (especialização por papel) e o que fica fora (detalhe técnico, delegado a outras páginas). _(satisfies FR-7)_
- **AC-8** — Given a seção "Visão", when o leitor a lê, then encontra a menção a outros papéis futuros (ex. QA, design, suporte). _(satisfies FR-8)_
- **AC-9** — Given a seção final, when o leitor busca por onde continuar, then encontra links para os dois guias práticos e para a home. _(satisfies FR-9)_
- **AC-10** — Given o corpo da página fora da seção de links, when se busca por PB/PRD/ADR/AC/CONTEXT-MAP/spec-plan-tasks-verify/nomes de skill, then nenhum desses termos aparece. _(satisfies FR-10)_
- **AC-11** — Given a página completa, when revisada, then não contém linguagem alarmista, que solape a confiabilidade da IA, ou que soe como pendência de governança não resolvida — mesma barra aplicada nas rodadas anteriores desta feature. _(satisfies FR-11)_

## Edge Cases

- O leitor pode chegar direto em `/docs/intro` sem nunca ter visto a home — a página não pode assumir familiaridade prévia com PB/PRD/ADR/harness; por isso esses termos ficam fora do corpo (FR-10) e só aparecem, sem explicação, nos links de saída (FR-9).
- "Desenvolvedor especializar a IA" é mais amplo que só o pipeline de execução — inclui tarefas do dia a dia (revisão de código, testes, debugging), não só a sequência spec→plan→tasks→verify (que, de todo modo, não é citada nominalmente por FR-10).

## Out of Scope (Non-Goals)

- Não recria o conteúdo técnico/arquitetural (duas análises, contenção de domínio, harness SDD, customização por squad) — esse conteúdo já vive, com fidelidade visual total, na home (`static/framework-hibrido.html`). Repeti-lo aqui duplicaria informação sem agregar leitura nova.
- Não lista nem descreve as skills individuais — isso é coberto pelos dois guias práticos, referenciados por link.
- Não detalha o pipeline de execução (spec/plan/tasks/verify) — mencionado apenas de forma indireta ("pipeline de execução") na seção "Quem isto serve", sem nomear as etapas.
- Não produz um `PRODUCT_BRIEF.md` formal no padrão da skill `pm-create-pb` (front matter com ID, `contextos`, gate do `CONTEXT-MAP.md`) — este repositório não é um repositório de contexto no sentido do próprio framework (é o site que o documenta), não tem `CONTEXT-MAP.md`, e não existe convenção de `docs/refinamento/` aqui. Os tópicos do template do PB (Resumo executivo, Problema, Solução, Diferencial, Público, Critérios de sucesso, Escopo, Visão) foram usados para estruturar `docs/intro.mdx` diretamente — ver Clarifications Log.

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-02 | Escopo do conteúdo geral pedido pelo usuário | Usuário pediu para escrever em `docs/intro` "o conteúdo geral do que é o framework"; interpretado como consolidar as duas visões já validadas em conversa (framework/técnica e gestão), cobrindo o roteiro completo do rascunho (`framework-hibrido.html`) e o estado atual (`as_is_metarepo_sdd_harness.svg`), sem duplicar os guias práticos já publicados. |
| 2026-08-02 | Remover a seção "O problema que ainda não resolvemos" (estado atual/as-is) | Usuário pediu explicitamente para remover essa parte depois da primeira implementação, já publicada e verificada. FR-6/AC-6 originais (estado atual) removidos da spec; FRs/ACs seguintes renumerados (antigos FR-7/8/9 → FR-6/7/8, AC-7/8/9 → AC-6/7/8). |
| 2026-08-02 | Reenquadrar o tom da página como pitch de produto por squad | Usuário pediu para validar que nada na página pudesse "desabonar" o projeto, esclarecendo que a intenção é uma visão de produto/pitch de solução personalizada por squad, não um documento interno de problemas/governança. FR-2 reescrito de "situação + complicação" (tom de crítica: uso não padronizado, decisões repetidas, "IA sem contexto erra mais") para proposta de valor (3 benefícios, tom neutro/positivo). FR-6 reescrito de "decisões de gestão pendentes" (soa como o framework estar incompleto) para "dimensões que cada squad personaliza" (mesmas 4 dimensões, reenquadradas como customização, não lacuna). Frase "Sem essa cadeia não dá para provar cobertura nem detectar desvio" também trocada por afirmação positiva ("Essa cadeia garante..."). |
| 2026-08-02 | Modo de execução das duas análises (Pilar 1) | Usuário apontou que "rodam em paralelo" descrevia o Pilar 1 como se paralelo fosse o único modo, quando na prática pode ser paralelo, sequencial, ou — em demandas puramente técnicas — a análise técnica pode iniciar o fluxo sozinha, afetando ou não uma funcionalidade de produto. Apresentado um mapa de todos os lugares na documentação onde a afirmação "paralelo" aparecia (`framework-hibrido.html` slides 5/6, `docs/intro.mdx`, `docs/guia-repositorio-contexto.md`) e 3 opções de escopo de correção (A: só texto; B: texto + ajuste visual no slide 5; C: novo slide/seção dedicada). Usuário escolheu **Opção A** — ajuste textual em todos os locais, sem novo elemento visual nem slide adicional. FR-3/AC-3 reescritos para refletir os 3 modos. |
| 2026-08-02 | Reformulação completa como visão de produto, usando a skill `pm-create-pb` | Usuário pediu para reformular `/docs/intro` como visão de produto do framework, baseada nos tópicos da skill `pm-create-pb` e num brief inicial (fomentar uso de ferramentas agênticas já disponíveis, com orquestração e especialização por função: produto → análise de negócio, líder técnico → análise técnica, dev → especialização da implementação), pedindo para eu perguntar e dar opções antes de implementar. A skill `pm-create-pb` foi invocada; como o repositório não tem `CONTEXT-MAP.md` nem `blueprintfy` (Fase 0 da skill: repositório não é um repositório de contexto no sentido do framework), a entrevista seguiu sem grafo, adaptando as perguntas centrais da skill (impacto/escopo/diferencial/público/sucesso) ao conteúdo da página em vez de a um domínio técnico. Respostas da entrevista, uma pergunta por vez: (1) escopo da página — **substituição completa** do conteúdo técnico anterior desta mesma feature, já coberto pela home; (2) problema — "falta um caminho prático de especializar ferramentas agênticas por função"; (3) diferencial — contraste com "mesma ferramenta genérica para todo mundo"; (4) papel do dev — soma de harness de execução + especializações do dia a dia (revisão, testes, debugging); (5) critérios de sucesso — rastreabilidade + adoção por papel (3 sinais); (6) escopo dentro/fora — só visão de produto, termos técnicos confinados à seção de links; (7) visão futura — extensão a outros papéis (QA, design, suporte). Todas as FRs/ACs desta spec foram reescritas para refletir a nova estrutura (Resumo executivo/Problema/Solução/Diferencial/Público/Critérios de sucesso/Escopo/Visão), substituindo as FRs/ACs anteriores (histórico preservado nas entradas acima do log). Não foi gerado um `PRODUCT_BRIEF.md` formal — ver Out of Scope. |
