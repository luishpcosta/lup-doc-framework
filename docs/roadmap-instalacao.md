---
sidebar_position: 2
title: Roadmap — implantar o framework num squad com sistemas distribuídos
sidebar_label: Roadmap de Instalação
---

# Roadmap — implantar o framework num squad com sistemas distribuídos

Um runbook para uma squad que opera **múltiplos repositórios de aplicação** (sistemas distribuídos) e decidiu adotar o framework híbrido: em que ordem preparar as aplicações, montar o repositório de contexto, e povoá-lo a partir do que já existe. Cada fase é uma checklist — marque os itens conforme avança.

## Fase 1 — Domínio e aplicações

- [ ] Escolha o domínio de negócio que a squad vai documentar.
- [ ] Liste as aplicações que representam os serviços desse domínio.
- [ ] Para cada aplicação, rode o setup do harness SDD seguindo o [guia de repositório de aplicação](./guia-agentes-ia-app.md).

## Fase 2 — Repositório de documentação da squad

- [ ] Crie ou reutilize um repositório de documentação da squad. Sugestão: padrão Docusaurus, para visualizar e democratizar o conteúdo — este próprio site é um exemplo.
- [ ] Defina duas camadas de separação dentro do repositório:
  - **to-be** (`docs/discovery/`) — os artefatos do framework (Product Brief, PRD, ADR, critérios de aceite) por funcionalidade, e uma ou mais histórias por funcionalidade — uma por unidade de trabalho executável, não necessariamente 1:1.
  - **as-is** (`docs/dominio/`) — o comportamento funcional do domínio já produtivo: capacidades (serviços de domínio), contratos e outros elementos técnicos. **Incremento opcional** — comece só com a camada to-be se preferir, e adicione o as-is depois.
- [ ] Adapte o scaffold abaixo à sua realidade (nomes de domínio, funcionalidades e serviços variam por squad — a separação conceitual to-be/as-is é o que importa manter):

```
/
├── CONTEXT-MAP.md                     ← na raiz
├── docs/discovery/                    ← to-be
│   ├── {discovery-name}/
│   │   └── {funcionalidade}/
│   │       ├── PRODUCT_BRIEF.md
│   │       ├── NNN-slug-{funcionalidade}-PRD.md
│   │       ├── NNN-slug-{funcionalidade}-ADR.md
│   │       ├── NNN-slug-{funcionalidade}-ACs.md
│   │       ├── NNN-slug-{story-1}-HIST.md   ← 1 ou mais por
│   │       └── NNN-slug-{story-2}-HIST.md      funcionalidade
│   └── {other-discovery-name}/
│       └── ...mesma estrutura...
└── docs/dominio/                      ← as-is: negócio já produtivo (opcional)
    └── {domain-name}/
        ├── CONTEXT.md                 ← visão geral de negócio
        └── {service-domain}/
            ├── {dominio-1}.md         ← detalhamento e regras
            └── {dominio-2}.md
```

- [ ] Com o scaffold definido, siga o [guia de repositório de contexto](./guia-repositorio-contexto.md) para o bootstrap, referenciando a estrutura escolhida:

```
/blueprintfy este repositório ainda não tem CONTEXT-MAP.md. Comece a
modelagem de domínio do zero seguindo esta estrutura: docs/discovery/
para os artefatos do framework (PB/PRD/ADR/ACs por funcionalidade, e
uma ou mais Histórias por funcionalidade — uma por unidade de
trabalho executável) e, opcionalmente, docs/dominio/ para o as-is do
negócio já produtivo.
```

## Fase 3 — Povoar a documentação a partir das aplicações

- [ ] Use `/domain-reconcile` para trazer o que já foi especificado no harness SDD de cada aplicação para o repositório de contexto. Peça primeiro um plano, revise, e só então autorize a escrita — a skill já funciona assim por padrão (edita documento só com autorização explícita, passagem por passagem):

```
/domain-reconcile mapeie github.com/minha-org/pagamentos-service
(branch main, pasta specs/003-parcelamento/, harness Speckit SDD)
contra o que já temos aqui, e mostre um plano do que entraria em
docs/discovery/pagamentos/parcelamento/ antes de escrever qualquer
arquivo.
```

- [ ] Depois de revisar o plano, autorize a escrita:

```
/domain-reconcile plano aprovado para
github.com/minha-org/pagamentos-service — preencha
docs/discovery/pagamentos/parcelamento/ com o que foi mapeado.
```

- [ ] Repita para cada aplicação/funcionalidade que precisa entrar no repositório de contexto.

## Fase 4 — Manter o repositório de contexto atualizado

- [ ] Ao final da Fase 3, o repositório de contexto está numa versão inicial, pronta para planejar mudanças nos repositórios de aplicação. O trabalho não para aí: use `/domain-reconcile` de novo depois de cada deploy relevante, para o repositório de contexto não divergir do que está em produção.
- [ ] Siga a rotina mínima já descrita em ["Manter o repositório saudável"](./guia-repositorio-contexto.md#manter-o-repositório-saudável), no guia de repositório de contexto.

## Para onde ir a seguir

- Para o detalhe de cada skill usada neste roadmap, veja [skills do framework](./skills.md).
- Para a visão de produto do framework, volte para a [introdução](./intro.mdx).
