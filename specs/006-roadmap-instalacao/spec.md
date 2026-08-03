# Spec: Roadmap — implantar o framework num squad com sistemas distribuídos

**Feature ID:** 006-roadmap-instalacao
**Phase:** done
**Owner:** luishpcosta
**Last updated:** 2026-08-02

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those para `plan.md`.

## Problem / Motivation

Os três documentos existentes (`docs/intro.mdx`, os dois guias, `docs/skills.md`) explicam o que o framework é e o que cada peça faz isoladamente, mas nenhum deles sequencia a adoção ponta a ponta para o caso mais comum e mais complexo: uma squad com **sistemas distribuídos** (múltiplos repositórios de aplicação) que precisa decidir domínio, preparar cada aplicação, montar um repositório de contexto do zero, e povoá-lo a partir do que já foi especificado nos harnesses SDD das aplicações. Falta um roadmap que amarre, em ordem, o uso dos dois guias existentes e da skill `/domain-reconcile` para esse cenário específico.

## User Stories

- Como squad que decidiu adotar o framework, quero um roteiro único que me diga, em ordem, o que fazer primeiro (aplicações), o que fazer depois (repositório de contexto) e como povoar esse repositório a partir do que já existe nas aplicações.
- Como squad que já opera múltiplos repositórios de aplicação com harness SDD, quero saber como usar `/domain-reconcile` para trazer as especificações já produzidas para o repositório de contexto, sem reescrever tudo à mão.
- Como squad que terminou a implantação inicial, quero saber que o trabalho não para ali — `/domain-reconcile` continua sendo usado depois de cada deploy relevante, para o repositório de contexto não divergir do que está em produção.

## Functional Requirements

- FR-1: A página deve ser um runbook operacional em 4 fases, cada uma com uma checklist de ações verificáveis (`- [ ]`), não prosa corrida — formato escolhido explicitamente pelo usuário entre 3 opções apresentadas (Tutorial narrativo, Runbook/checklist, How-To no modelo dos guias existentes).
- FR-2: Fase 1 deve cobrir a escolha do domínio de negócio e das aplicações que representam os serviços desse domínio, e o setup de cada uma via o [guia de repositório de aplicação](../../docs/guia-agentes-ia-app.md).
- FR-3: Fase 2 deve cobrir a criação ou reuso de um repositório de documentação da squad (sugestão: padrão Docusaurus, para visualizar e democratizar), a definição de duas camadas de separação — uma **to-be** (`docs/discovery/`, artefatos do framework: PB/PRD/ADR/ACs/História por funcionalidade) e uma **as-is** (`docs/dominio/`, comportamento funcional do domínio já produtivo, contratos e outros elementos técnicos) — com a camada as-is explicitamente marcada como incremento opcional/desejável, não bloqueante. Deve incluir o exemplo de scaffold de pastas fornecido pelo usuário (adaptável), e um exemplo de chamada de `/blueprintfy` referenciando esse scaffold para o bootstrap do `CONTEXT-MAP.md`.
- FR-4: Fase 3 deve cobrir o uso de `/domain-reconcile` para povoar a documentação a partir do repositório de aplicação que contém as especificações geradas pelo harness SDD escolhido — com um exemplo de chamada **faseada** (mapeamento/plano primeiro, aprovação humana, só depois a escrita dos arquivos), consistente com o comportamento real da skill (edição só com autorização explícita, passagem por passagem — já documentado em `docs/skills.md`).
- FR-5: Fase 4 deve cobrir o uso recorrente de `/domain-reconcile` depois de cada deploy relevante num repositório de aplicação do domínio, para o repositório de contexto não divergir do que está em produção — referenciando a rotina já descrita na seção "Manter o repositório saudável" do guia de repositório de contexto, em vez de duplicá-la.
- FR-6: O scaffold de pastas (FR-3) fica só nesta página — o guia de repositório de contexto não é alterado para incorporá-lo como convenção obrigatória (decisão explícita do usuário; o guia continua agnóstico de estrutura de pastas).
- FR-7: A página deve ser adicionada à sidebar imediatamente depois de "Introdução" (`sidebar_position: 2`), deslocando os três documentos existentes (`guia-agentes-ia-app.md`, `guia-repositorio-contexto.md`, `skills.md`) uma posição adiante.
- FR-8: A página deve ser linkada a partir de `docs/intro.mdx` ("Para onde ir a seguir").
- FR-9: A página deve manter o padrão de tom já validado no restante do site: proposta prática, sem linguagem alarmista nem que soe como o framework estar incompleto.
- FR-10: O rótulo da página na sidebar deve ser curto ("Roadmap de Instalação"), independente do título completo da página (usado no H1 e na aba do navegador).
- FR-11: Os exemplos de `/domain-reconcile` (Fase 3) devem referenciar um link de GitHub genérico e representativo (não uma URL real), para tornar o exemplo mais concreto sem apontar para um repositório de verdade.

## Acceptance Criteria

- **AC-1** — Given a página publicada, when o leitor a navega, then encontra 4 fases, cada uma com itens de checklist (`- [ ]`), não parágrafos de prosa sem ação associada. _(satisfies FR-1)_
- **AC-2** — Given a Fase 1, when o leitor a lê, then encontra a escolha do domínio/aplicações e um link para o guia de repositório de aplicação. _(satisfies FR-2)_
- **AC-3** — Given a Fase 2, when o leitor a lê, then encontra a criação/reuso do repositório de documentação, as duas camadas (to-be `docs/discovery/` e as-is `docs/dominio/`, esta marcada como opcional), o scaffold de pastas completo — incluindo o artefato de História, com pelo menos 2 instâncias no scaffold e texto explícito de que pode haver mais de uma por funcionalidade (não é 1:1) — e um exemplo de chamada de `/blueprintfy` referenciando o scaffold. _(satisfies FR-3)_
- **AC-4** — Given a Fase 3, when o leitor a lê, then encontra um exemplo de `/domain-reconcile` em duas chamadas (plano primeiro, execução depois de aprovação), apontando para repositório/branch/pasta de specs de origem. _(satisfies FR-4)_
- **AC-5** — Given a Fase 4, when o leitor a lê, then encontra a orientação de rodar `/domain-reconcile` de novo após cada deploy relevante, com link para a seção "Manter o repositório saudável" do guia de contexto. _(satisfies FR-5)_
- **AC-6** — Given `docs/guia-repositorio-contexto.md`, when comparado à versão anterior a esta feature, then não contém o scaffold de pastas desta página. _(satisfies FR-6)_
- **AC-7** — Given a sidebar do site, when o leitor a observa, then a nova página aparece logo abaixo de "Introdução", antes dos dois guias e da página de skills. `npm run typecheck`/`build` terminam sem erro. _(satisfies FR-7)_
- **AC-8** — Given `docs/intro.mdx`, when o leitor lê "Para onde ir a seguir", then encontra um link para o novo roadmap. _(satisfies FR-8)_
- **AC-9** — Given a página completa, when revisada, then não contém linguagem alarmista nem que soe como o framework estar incompleto — mesma barra das rodadas anteriores do site. _(satisfies FR-9)_
- **AC-10** — Given a sidebar do site, when o leitor observa o item da nova página, then o texto exibido é "Roadmap de Instalação", não o título completo. _(satisfies FR-10)_
- **AC-11** — Given os exemplos de `/domain-reconcile` na Fase 3, when o leitor os lê, then encontram uma URL de GitHub no formato `github.com/<org>/<repo>` claramente genérica (ex. `minha-org`), não uma URL de organização/repositório real. _(satisfies FR-11)_

## Edge Cases

- O scaffold de pastas é um exemplo adaptável, não uma imposição — a página deve deixar claro que a squad pode ajustar nomes/estrutura à sua realidade, sem perder a separação conceitual to-be/as-is.
- `/domain-reconcile` já exige autorização explícita por passagem, por design (ver `docs/skills.md`) — o exemplo de "chamada faseada" desta página não inventa um modo especial da skill, só demonstra o padrão de uso já existente (mapear/planejar → aprovar → escrever).

## Out of Scope (Non-Goals)

- Não reescreve os dois guias existentes nem `docs/skills.md` — o roadmap referencia e sequencia esse conteúdo, não o duplica.
- Não cobre o caso de uma squad com um único repositório monolítico (sem sistemas distribuídos) — esse cenário já é coberto pelo guia de repositório de aplicação sozinho, sem precisar de um roadmap de sequenciamento.
- Não implementa nem testa o scaffold de pastas neste próprio repositório (`lup-doc-framework` é um site de documentação, não um repositório de contexto real).

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-02 | Formato/gênero de escrita | Usuário pediu para ser questionado antes de implementar. Apresentadas 3 opções (Tutorial narrativo por fases; Runbook/checklist operacional; How-To no modelo dos 2 guias existentes). Usuário escolheu **Runbook/checklist operacional**. |
| 2026-08-02 | Escopo do scaffold de pastas | Perguntado se o scaffold (docs/discovery + docs/dominio) deveria só viver nesta página nova ou também atualizar o guia de repositório de contexto. Usuário escolheu **só nesta página** — o guia de contexto continua agnóstico de estrutura de pastas. |
| 2026-08-02 | Passo 4 do brief, cortado ("...pode usar mesma skill /domain-reconcile para co") | Perguntado o que completava a frase. Usuário confirmou: **uso recorrente/periódico do `/domain-reconcile` após cada deploy relevante**, fechando o loop pós-deploy — mesmo padrão já descrito na seção "Manter o repositório saudável" do guia de contexto. |
| 2026-08-02 | Tratamento da camada "as-is" (docs/dominio) | Usuário descreveu essa camada, no brief, como "apenas um incremento desejável". Perguntado se isso deveria ficar explícito no roadmap (opcional, não bloqueante) ou se as duas camadas deveriam ter o mesmo peso. Usuário confirmou: **claramente opcional**. |
| 2026-08-02 | Ajustes de acompanhamento (pós-publicação) | Usuário pediu 3 ajustes: (1) rótulo da sidebar mais curto ("Roadmap de Instalação") — FR-10/AC-10 adicionados, implementado via `sidebar_label` no front matter, sem alterar o título completo (H1/aba do navegador); (2) adicionar o artefato de História ao scaffold (`NNN-slug-{story-name}-HIST.md`) — FR-3/AC-3 ampliados; (3) exemplos de `/domain-reconcile` mais realistas, com um link de GitHub genérico e representativo — FR-11/AC-11 adicionados, usado `github.com/minha-org/pagamentos-service`. |
| 2026-08-02 | "Não necessariamente será uma única história por funcionalidade" | Usuário corrigiu: o scaffold mostrava 1 `HIST.md` por funcionalidade, implicando relação 1:1. Corrigido para mostrar 2 instâncias no scaffold (`{story-1}`/`{story-2}`) com nota "1 ou mais por funcionalidade", e o texto (bullet da camada to-be + exemplo de `/blueprintfy`) passou a dizer explicitamente que pode haver mais de uma história por funcionalidade — uma por unidade de trabalho executável, não necessariamente 1:1 com a funcionalidade. AC-3 ampliada. |
