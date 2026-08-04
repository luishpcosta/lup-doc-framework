---
sidebar_position: 2
title: Visão arquitetural
---

# Visão arquitetural

## Contexto

Squads que adotam o framework acumulam múltiplas plataformas agênticas — uma para arquitetura, outra para produto, outra para desenvolvimento — cada uma operando sobre uma cópia própria do conhecimento do domínio. Sem um ponto único de verdade, cada plataforma interpreta a especificação à sua maneira, e o que uma etapa decide não chega de forma confiável à próxima. Esta decisão estabelece a documentação — o repositório de contexto descrito no [guia de repositório de contexto](./guia-repositorio-contexto.md) — como o centro que toda plataforma agêntica consulta, independentemente de quem a opera.

## Decisão

Cada papel do squad continua usando a plataforma agêntica de sua preferência — não há uma ferramenta única imposta. O que muda é que todas elas leem e escrevem sobre a mesma base documental:

- **Agente de arquitetura/tech-lead** — plataformas agênticas como Claude Code ou Devin — se conecta ao repositório de contexto para estabelecer *o como* e *o que validamos* — decisões de arquitetura (ADR) e critérios de aceite (AC).
- **Agente de produto** — outra plataforma agêntica, como o Cowork ou o VSCode — se conecta ao repositório de contexto para responder *o quê* e *o que é necessário* — Product Brief (PB) e PRD.
- **Agente de desenvolvimento** — a plataforma especializada por repositório de serviço instrumentado, como Claude Code ou Devin — se conecta ao repositório de contexto para extrair a especificação (ADR e história) e gerar código com o harness de SDD escolhido por aquele repositório.

Por enquanto, o mecanismo de acesso é genérico para os três — MCP ou git — e não fixo por papel: qualquer agente pode ter o repositório de contexto disponível localmente (git) ou consultá-lo remotamente (MCP), dependendo de como aquela plataforma está integrada. Na prática, o MCP tende a ser mais comum no agente de produto, já que plataformas como o Cowork normalmente não têm o repositório clonado localmente — mas isso não é uma regra fixa.

![Visão arquitetural em C4 (nível Contexto)](/img/visao-arquitetural-c4.png)

## Alternativas consideradas

| Alternativa | Por que não foi escolhida |
|---|---|
| Cada plataforma agêntica mantém sua própria cópia/memória do domínio | Gera divergência silenciosa entre o que cada papel "acha" que é verdade — é exatamente o problema que o repositório de contexto centralizado resolve |
| Impor uma única plataforma agêntica para todos os papéis | Ignora que cada papel já tem ferramentas especializadas em uso (ex.: Cowork para produto) e reduziria a liberdade de escolha do harness de dev por repositório |

## Consequências

- **Positivas**: qualquer plataforma agêntica nova pode se plugar no squad sem reconstrução de contexto — basta apontar para o repositório de contexto; o histórico de decisão (ADR) e de negócio (PB/PRD) fica auditável num único lugar.
- **Negativas / trade-offs**: exige que o repositório de contexto seja mantido com disciplina — se ele ficar desatualizado, todos os agentes herdam o mesmo erro, ampliado. Multiplica a superfície de acesso: agora existem dois mecanismos (git e MCP) a manter, e qualquer agente pode depender de um ou de outro.
- **Riscos**: um serviço MCP central de acesso ao repositório de contexto vira ponto único de falha para qualquer agente que dependa dele — se cair, quem não tiver o repositório disponível localmente (git) fica sem acesso, mesmo que o repositório de contexto continue íntegro.

## Componentes afetados

- Repositório de contexto (Product Brief, PRD, ADR, critérios de aceite, histórias)
- Agente de arquitetura/tech-lead
- Agente de produto
- Agente de desenvolvimento (por repositório de serviço)
- Repositório(s) de serviço instrumentados

## Para onde ir a seguir

- Para o guia prático de como preparar e manter essa documentação, veja o [guia de repositório de contexto](./guia-repositorio-contexto.md).
- Para o guia prático do lado do agente de desenvolvimento, veja o [guia de repositório de aplicação](./guia-agentes-ia-app.md).
- Para o detalhe técnico de cada skill citada aqui, veja [skills do framework](./skills.md).

Volte para a [introdução](./intro.mdx) para o panorama geral do framework.
