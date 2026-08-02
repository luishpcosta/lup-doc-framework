---
sidebar_position: 2
title: Guia — preparar e usar o repositório com agentes de IA de desenvolvimento
---

# Preparar e usar o repositório com agentes de IA de desenvolvimento

Este guia mostra como preparar um repositório e como operá-lo no dia a dia usando ferramentas de Inteligência Artificial voltadas para assistência e automação de programação — agentes que operam como engenheiros de software, lendo o código, produzindo especificações, implementando e abrindo PRs.

## 1. Resumo executivo

O fluxo tem três momentos: **preparar** o repositório para que um agente consiga entendê-lo e trabalhar nele de forma rastreável, **encadear** o conhecimento existente (documentação, decisões, código) em specs vivas, e **operar** no dia a dia pedindo trabalho em linguagem natural de alto nível. Três skills cobrem esses momentos:

| Skill | Papel no fluxo |
|---|---|
| `/sdd-harness-creator` | Monta o harness de desenvolvimento orientado a especificação (SDD): `constitution.md`, `spec.md`/`plan.md`/`tasks.md` por feature, gates de fase e rastreabilidade de critérios de aceite. É o ponto de partida — sem harness, não há onde registrar o resto. |
| `/codefy` | Mapeia o contexto do repositório (código + documentação já existente), encadeia esse contexto em specs e propõe regras operacionais para `AGENTS.md`/`CLAUDE.md`. É o trabalho contínuo de manter a documentação viva depois que o harness já existe. |
| `/blueprintfy` | Traduz um brief de negócio/visão executiva num blueprint técnico — a ponte entre "o que o negócio quer" e "como isso vira uma spec implementável". Útil antes de abrir uma feature nova quando o ponto de partida é uma decisão de negócio, não um pedido técnico. |

O restante deste guia detalha como usar cada uma.

## 2. Preparação do repositório

### Brownfield vs. greenfield

- **Repositório existente (brownfield)** — já tem código, histórico de commits e possivelmente documentação dispersa (READMEs, ADRs, tickets). Aqui, `/sdd-harness-creator` precisa primeiro **recuperar informação**: ler o código-fonte, inferir princípios implícitos, reconstruir o que já foi decidido antes de montar `constitution.md` e a primeira spec. Essa etapa de leitura/inferência é a que mais se beneficia de um modelo de raciocínio forte — recomenda-se usar um modelo como **Opus** especificamente para essa recuperação inicial e montagem do harness, já que erros de interpretação aqui se propagam para todas as specs seguintes. Depois que o harness está de pé, o trabalho rotineiro (uma feature de cada vez) pode voltar a um modelo mais rápido/econômico.
- **Repositório novo (greenfield)** — sem código legado para reconciliar, o harness pode ser montado diretamente a partir de um brief e dos princípios já decididos na reunião de kickoff, sem a etapa de engenharia reversa.

### Exemplos chamando `/sdd-harness-creator`

**Exemplo 1 — brownfield, engenharia reversa completa:**

```
/sdd-harness-creator faça a engenharia reversa deste repositório: leia o
código-fonte, os READMEs e os tickets/ADRs disponíveis, monte a
constitution.md com os princípios que já estão implícitos no código, e
abra a primeira feature em specs/001-*/spec.md descrevendo o estado atual
como baseline.
```

**Exemplo 2 — brownfield, escopo restrito a um módulo:**

```
/sdd-harness-creator este repositório já existe mas nunca teve harness SDD.
Comece só pelo módulo de pagamentos (src/payments/): reconstrua os
requisitos que o código atual já satisfaz, monte a constitution.md com as
convenções técnicas que encontrar, e deixe o restante do repositório fora
do escopo por enquanto.
```

**Exemplo 3 — greenfield:**

```
/sdd-harness-creator este repositório é novo, ainda sem código. Monte o
harness SDD do zero: constitution.md com os princípios definidos no
kickoff (stack, padrões de teste, arquitetura-alvo) e a primeira spec em
specs/001-mvp/spec.md a partir deste brief: [colar brief de negócio].
```

### Encadeando specs com `/codefy` (processo contínuo, brownfield)

Depois que o harness inicial existe, o trabalho de brownfield continua: nem toda decisão técnica já tomada vira spec no primeiro passo, e novas regras de código precisam ser refletidas em `AGENTS.md`/`CLAUDE.md` para que o agente as siga automaticamente depois. É esse o papel contínuo de `/codefy` — analisar a documentação e o código existentes, montar a cadeia entre eles, e propor as regras que faltam.

**Exemplo 1 — mapear contexto a partir de documentação dispersa:**

```
/codefy analise minhas docs em docs/adr/ e specs/ e faça o mapeamento do
contexto: identifique decisões técnicas que ainda não estão refletidas em
nenhuma spec e liste-as como specs pendentes.
```

**Exemplo 2 — extrair regras implícitas do código para o AGENTS.md/CLAUDE.md:**

```
/codefy compare specs/003-checkout/spec.md com o código atual em
src/checkout/ e adicione ao CLAUDE.md as regras que encontrar sendo
seguidas implicitamente no código mas que ainda não estão documentadas
(ex.: convenções de nomeação, camadas que não podem se importar entre si).
```

## 3. Uso no dia a dia

No dia a dia, o pedido ao agente pode — e deve — ser em linguagem natural de alto nível. O agente é quem traduz isso para o fluxo SDD (spec → plan → tasks → implementação) ou para a skill certa.

1. "Leia a ADR-125 e crie um planejamento baseado em SDD para o repositório."
2. "`/codefy` baseado no contexto do módulo de pagamentos, planeje a alteração que permite parcelamento."
3. "Abra a feature 004 para exportação de relatórios em PDF; siga o fluxo faseado e me avise quando a spec estiver pronta para aprovação."
4. "Essa tarefa é pequena e o risco é baixo — pode seguir no modo rápido e já abrir o PR."
5. "Verifique se a spec da feature 002 ainda bate com o código atual e aponte as divergências."
6. "Revise o PR #482 focando em segurança e nos critérios de aceite da feature 005."

## 4. Dicas para `AGENTS.md`/`CLAUDE.md`

### Modos de trabalho

Vale declarar explicitamente, no `AGENTS.md`/`CLAUDE.md` do repositório, quais modos de operação o agente pode assumir — assim ele sabe qual comportamento adotar sem que isso precise ser reexplicado a cada pedido:

```markdown
## Modos de trabalho

**Modo rápido (`fast`)** — para mudanças pequenas, bem definidas e de baixo
risco: implemente a mudança completa (código + testes) numa única passada,
sem parar para aprovação intermediária.

**Modo faseado (`phased`, padrão quando o escopo não estiver claro)** —
para mudanças de escopo médio/alto ou ambíguas: primeiro produza `spec.md`
(o quê/por quê, critérios de aceite) e aguarde aprovação; qualquer
ambiguidade é levantada como pergunta explícita antes de prosseguir. Após
aprovação da spec, produza `plan.md` + `tasks.md` e aguarde uma segunda
aprovação. Só então implemente código, escreva/rode os testes e abra o PR.

Regra prática: se o modo não estiver explícito no pedido, pergunte qual
usar. É sempre permitido escalar de `fast` para `phased` no meio do
trabalho ao perceber que o escopo é maior do que parecia — nunca o
contrário sem avisar antes.
```

### Review automático de PR

Vale configurar um hook que aciona automaticamente uma skill de review de código sempre que um PR é aberto, usando um modelo específico para essa tarefa — revisão costuma se beneficiar de um modelo com orçamento de raciocínio mais alto do que o usado na implementação do dia a dia.

Se você (ou o próprio agente) não souber como montar esse hook, peça diretamente: *"configure um hook que acione review automático de PR, usando o modelo X para o review"*. O agente deve investigar as opções disponíveis no seu ambiente (configuração de hooks, modelo a usar, gatilho de evento) em vez de assumir uma solução pronta sem checar — assim como não deve inventar nomes de skills que não existem no seu ambiente.
