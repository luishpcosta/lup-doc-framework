---
sidebar_position: 4
title: Guia — preparar e usar um repositório de contexto
---

# Guia — preparar e usar um repositório de contexto

Este guia mostra como preparar e manter um repositório de contexto — o metarepo documental que guarda product backlog, PRDs, ADRs, critérios de aceite e o mapa de domínio (`CONTEXT-MAP.md`) usados por um ou mais repositórios de aplicação. É escrito com foco em **repositório de contexto/documentação de domínio** — para um repositório de aplicação/código, veja o [guia irmão](./guia-agentes-ia-app.md). Para uma referência técnica de cada skill citada aqui, veja [skills do framework](./skills.md).

## 1. Resumo

Leia na ordem: prepare o repositório de contexto (seção 2), mantenha-o atualizado (seção 3) e reconcilie com os repositórios de aplicação que ele documenta (seção 4). Sete skills sustentam isso:

- `/blueprintfy` — funda e mantém o modelo de domínio (glossário `CONTEXT.md`/`CONTEXT-MAP.md` e ADRs) via entrevista; também faz o bootstrap inicial do repositório.
- `/prd-to-adr` — transforma um PRD em arquitetura, ADR e critérios de aceite.
- `/issue-to-adr` — mesmo resultado do `/prd-to-adr`, mas a partir de uma demanda informal, sem PRD escrito.
- `/make-diagram` — gera diagramas de arquitetura (PNG) a partir de texto ou Mermaid.
- `/pm-create-pb` e `/pm-create-prd` — opcionais: conduzem a análise de negócio (ideia → Product Brief → PRD) junto com o time de produto.
- `/domain-reconcile` — concilia o que um repositório de aplicação realmente fez (commit/branch) com o que está documentado aqui, fechando o loop que hoje não existe pós-deploy.

## 2. Como preparar o repositório de contexto

### Com ou sem `CONTEXT-MAP.md`

- **Sem nenhuma documentação de domínio** — use `/blueprintfy`: ele roda um checklist de bootstrap e pergunta primeiro se já existem documentos de negócio ou ADRs no repositório, antes de modelar do zero.
- **Com PB/PRD/ADR já espalhados, mas sem mapa** — mesma skill, `/blueprintfy`; a entrevista parte do que já existe em vez de uma folha em branco.

### Exemplos chamando `/blueprintfy`

**Exemplo 1 — bootstrap do zero:**

```
/blueprintfy este repositório ainda não tem CONTEXT-MAP.md. Comece a
modelagem de domínio do zero.
```

**Exemplo 2 — bootstrap a partir de documentos existentes:**

```
/blueprintfy já temos PRDs e ADRs espalhados em docs/, mas nenhum
CONTEXT-MAP.md. Mapeie os contextos do sistema a partir do que já existe.
```

## 3. Como manter o repositório de contexto atualizado

Depois que o `CONTEXT-MAP.md` existe, o trabalho é contínuo: o modelo de domínio muda, novas demandas viram ADR, e diagramas precisam refletir a arquitetura atual.

```
/blueprintfy isso é uma Order ou uma Invoice mesmo? Vamos estressar essa decisão.
```

```
/prd-to-adr aqui está o PRD de parcelamento — gera a arquitetura, o ADR
e os critérios de aceite.
```

```
/issue-to-adr o suporte pediu bloqueio de conta após 3 logins falhos —
não tem PRD, só esse ticket.
```

```
/make-diagram desenha a arquitetura do contexto de cobrança recorrente.
```

### Análise de negócio com o time de produto (opcional)

Quando a demanda exige análise de negócio, o time técnico pode conduzi-la junto com um PM ou área correlata antes de chegar a um ADR. Para demandas puramente técnicas (refatoração, infraestrutura, dívida técnica), essa etapa não é necessária — o fluxo começa direto em `/prd-to-adr` ou `/issue-to-adr`, impactando ou não uma funcionalidade de produto:

```
/pm-create-pb chegou essa demanda do cliente — formaliza um Product Brief.
```

```
/pm-create-prd aqui está o Product Brief aprovado — quebra em PRD(s).
```

## 4. Como reconciliar com os repositórios de aplicação

Hoje o elo entre este repositório e os repositórios de aplicação é implícito, e não há retorno depois do deploy — o código pode divergir do que está documentado aqui sem que ninguém perceba. Use `/domain-reconcile` para fechar esse loop:

```
/domain-reconcile confere se o commit mais recente do repositório de
pagamentos ainda bate com a ADR-012 de cobrança recorrente.
```

## 5. Dicas para `AGENTS.md`/`CLAUDE.md`

### Mapear as skills para o agente

Cole isto no `AGENTS.md`/`CLAUDE.md` do repositório de contexto para reforçar qual skill usar em cada situação, sem depender do usuário lembrar o nome certo:

```markdown
## Skills deste repositório de contexto

- `/blueprintfy` — pergunta de domínio, glossário, ADR, ou bootstrap do
  CONTEXT-MAP.md ("isso é uma Order ou uma Invoice?", "vamos estressar
  essa decisão", "começar a modelagem de domínio").
- `/prd-to-adr` — já existe um PRD e falta a arquitetura/ADR/critérios
  de aceite.
- `/issue-to-adr` — mesmo resultado do /prd-to-adr, mas a partir de uma
  demanda informal, sem PRD escrito.
- `/make-diagram` — pedido de diagrama de arquitetura.
- `/pm-create-pb` / `/pm-create-prd` — ideia crua de negócio, ainda sem
  Product Brief/PRD.
- `/domain-reconcile` — checar se um repositório de aplicação ainda
  bate com o que está documentado aqui.

Regra prática: se o pedido não citar a skill pelo nome, mas encaixar
numa das linhas acima, use a skill mesmo assim — não peça para o
usuário nomear a skill certa.
```

### Manter o repositório saudável

Cole isto para declarar a rotina mínima que evita que o repositório documente um estado que já mudou:

```markdown
## Rotina de saúde do repositório de contexto

- Depois de qualquer deploy relevante num repositório de aplicação
  documentado aqui, rode /domain-reconcile contra o commit/branch que
  foi para produção.
- Antes de abrir um novo PRD/ADR, confirme que o CONTEXT-MAP.md
  reflete a última decisão registrada no domínio afetado — não
  presuma que está atualizado.
- Se /domain-reconcile encontrar divergência, registre a decisão
  (atualizar o doc ou aceitar o desvio) antes de seguir para o próximo
  pedido — nunca deixe uma divergência encontrada sem resposta.
```
