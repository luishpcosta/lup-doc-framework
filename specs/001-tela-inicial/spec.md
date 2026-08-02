# Spec: Tela inicial da documentação

**Feature ID:** 001-tela-inicial
**Phase:** done
**Owner:** luishpcosta
**Last updated:** 2026-08-01

> WHAT and WHY only — no implementation details (no tech, no file names, no APIs). Save those for `plan.md`.

## Problem / Motivation

A documentação do framework híbrido precisa de uma porta de entrada que transmita, já na primeira tela, a mesma identidade visual e a mesma narrativa (executivo → blueprint técnico) usadas em `framework-hibrido.html`. Sem isso, a documentação nasce genérica (template padrão do Docusaurus) e desconectada do material que já foi validado com o negócio.

## User Stories

- Como visitante executivo, quero abrir a documentação e reconhecer imediatamente a mesma linguagem visual e o mesmo pitch do rascunho, para confiar que é a mesma iniciativa.
- Como membro técnico, quero que a tela inicial já aponte para a documentação detalhada (`/docs/intro`), para não precisar procurar onde o conteúdo técnico começa.
- Como qualquer visitante, quero poder alternar entre modo claro e escuro sem que a identidade visual (paleta, tipografia) se quebre.

## Functional Requirements

- FR-1: A capa da tela inicial deve ter fidelidade visual total com `framework-hibrido.html` — texto, paleta, tipografia, navegação por slides e o indicador de registro executivo→blueprint, exatamente como no arquivo original.
- FR-3: A paleta e a tipografia (Archivo/Inter/IBM Plex Mono) do rascunho devem ser usadas em **todo o site** (navbar, sidebar, páginas de `/docs`, não só na home), via custom properties globais.
- FR-5: A tela inicial deve oferecer um caminho claro para a documentação em `/docs/intro` (a própria capa embutida já tem "01/11 · ← → para navegar" e CTAs internos; a navbar do site cobre a navegação para `/docs`).
- FR-8: O site não deve conter o scaffolding de demonstração padrão do `create-docusaurus` (blog de exemplo, tutorial docs, página markdown de exemplo, imagens/logo/favicon genéricos do Docusaurus).
- FR-9: O site não deve exibir um rodapé (footer) em nenhuma página.
- FR-10: A trilha do indicador de registro (gauge-track, dentro do próprio `framework-hibrido.html`) deve permanecer visível em toda a sua extensão, em qualquer slide/registro — nenhum trecho da trilha pode ter a mesma cor do fundo da página atrás dela.
- FR-11: Os botões de navegação (`.nav-btn`, ‹ ›) devem ter contraste suficiente contra o fundo em todo slide, incluindo a capa (`#s1`), cujo fundo `--navy` é um caso especial fora do toggle claro/escuro normal.
- FR-12: O texto de `framework-hibrido.html` (a capa da home, embutida via iframe) deve ler como um pitch de produto — proposta de valor e customização por squad — sem linguagem alarmista, que solape a confiança na própria IA, ou que sugira que o framework está incompleto/pendente.

> **Revisão 2026-08-01:** as duas primeiras iterações tentaram *recriar* a capa (React + CSS Modules) e depois *complementar* a recriação com um indicador de registro e uma seção blueprint feitos à mão. Isso nunca atingiu fidelidade total e o usuário rejeitou o resultado duas vezes ("ainda não ficou bom"). FR-1 foi reescrito: a capa agora **embute o arquivo HTML original** (`static/framework-hibrido.html`) via `<iframe>`, eliminando a divergência por definição. FR-2/FR-4/FR-6/FR-7 (recriar problema/ideia central/ciclo, mapear dark-mode para "blueprint", indicador de registro à mão, seção blueprint à mão) foram **retirados**: o próprio arquivo embutido já contém as 11 slides, seu próprio gauge e sua própria navegação — recriar qualquer parte disso em React seria trabalho duplicado e uma nova fonte de divergência visual.

## Acceptance Criteria

- **AC-1** — Given a tela inicial carregada, when o visitante observa a capa, then o conteúdo é pixel-idêntico a abrir `framework-hibrido.html` diretamente (mesmo arquivo, embutido via iframe) — incluindo o gauge executivo→blueprint e a navegação "01/11 · ← → para navegar" nativos do arquivo. _(satisfies FR-1)_
- **AC-3** — Given qualquer página do site (home, `/docs/*`, navbar, sidebar), when ela renderiza texto, then usa as fontes Archivo (títulos) / Inter (corpo) / IBM Plex Mono (mono), via `--ifm-font-family-base`/`--ifm-heading-font-family`/`--ifm-font-family-monospace` em `src/css/custom.css` — nunca a fonte padrão do Infima. _(satisfies FR-3)_
- **AC-5** — Given a tela inicial, when o visitante interage com a capa embutida, then consegue navegar pelas 11 slides originais (setas/dots do próprio arquivo) e, pela navbar do site, chegar a `/docs/intro`. _(satisfies FR-5)_
- **AC-8** — Given o repositório após o setup inicial, when se lista `blog/`, `docs/tutorial-basics/`, `docs/tutorial-extras/`, `src/pages/markdown-page.mdx` e as imagens `undraw_*`/`docusaurus.png`/`docusaurus-social-card.jpg`/`favicon.ico`/`logo.svg` originais, then nenhum desses existe mais no repositório. _(satisfies FR-8)_
- **AC-9** — Given qualquer página do site, when ela termina de carregar, then não há nenhum elemento `<footer>` visível (rodapé removido de `themeConfig`). _(satisfies FR-9)_
- **AC-10** — Given a trilha do gauge na capa, when o visitante está em qualquer slide de registro blueprint (fundo `--blue-bg`), then a metade escura da trilha continua visível como uma linha distinta (com borda), nunca se "fundindo" com o fundo da página atrás dela. _(satisfies FR-10)_
- **AC-11** — Given a capa (`#s1`, fundo `--navy`), when o visitante olha para os botões ‹ › no canto inferior direito, then eles aparecem em branco, com contraste claro contra o fundo — não na cor escura herdada do body. _(satisfies FR-11)_
- **AC-12** — Given os slides 3, 7 e 10 de `framework-hibrido.html`, when o visitante os lê, then não encontra: linguagem alarmista sobre a operação ("perde o controle"), afirmações que solapem a confiabilidade da IA ("erra mais", "atalhos que parecem certos e não são"), frases negativas condicionais ("sem X não dá para Y"), ou enquadramento de decisões de gestão como pendências não resolvidas ("o que precisa ser decidido") — a seção final lê como personalização por squad, não como lacuna de governança. _(satisfies FR-12)_

~~AC-2, AC-4, AC-6, AC-7~~ (recriação manual de seções, mapeamento de dark-mode para "blueprint", gauge e seção blueprint feitos à mão) — **superseded by AC-1**: o arquivo embutido já resolve tudo isso por conter as 11 slides originais com seu próprio JS/CSS. Ver Clarifications Log.

## Edge Cases

- Viewport estreito (mobile): o iframe da capa preserva o layout responsivo já validado no arquivo original (`clamp()`/`flex-wrap` internos ao próprio HTML); a página host só precisa dar altura/largura cheias ao iframe.
- `prefers-reduced-motion` ou ausência de JS dentro do iframe: comportamento herdado do arquivo original (já trata `prefers-reduced-motion` no seu próprio `<style>`), fora do controle do site host.
- SSR/build estático: o iframe referencia um asset estático (`static/framework-hibrido.html`), copiado como está para `build/` — não depende de JS do Docusaurus para existir, então `docusaurus build` não pode quebrar por causa dele.

## Out of Scope (Non-Goals)

- Não escreve o conteúdo real de `/docs/intro` (documentação técnica completa) — fica como placeholder apontando para o que falta; é feature futura.
- Não reintroduz um blog: o preset foi desligado (`blog: false`) em vez de deixado com conteúdo de exemplo. Reativar blog com conteúdo real é decisão futura, não coberta aqui.
- Não mantém uma versão React/CSS Modules da capa em paralelo ao iframe — a recriação anterior (`Hero`, `ProblemSection`, `CentralIdeaSection`, `CycleSection`, `TransitionSection`, `BlueprintSection`, `RegisterGauge`) foi deletada, não apenas desativada, para não deixar dois "source of truth" divergentes no repositório.

## Open Questions

Nenhuma pendente.

## Clarifications Log

| Date | Question | Resolution |
|---|---|---|
| 2026-08-01 | Clonar a apresentação de 11 slides inteira ou só a abertura? | Só a abertura (capa + problema + ideia central + ciclo); o restante vira conteúdo de `/docs` em feature futura. _(Superseded — ver entrada abaixo.)_ |
| 2026-08-01 | A capa perdeu a referência ao "blueprint técnico" — o que fazer? | A promessa textual da capa não bastava: adicionar um indicador de registro (gauge) sempre visível + uma seção de conteúdo real em registro blueprint. _(Superseded — ver entrada abaixo.)_ |
| 2026-08-01 | Remover o scaffolding padrão do Docusaurus — o que inclui? | Blog de exemplo desligado via `blog: false`; docs tutorial-basics/tutorial-extras removidos; `markdown-page.mdx` removido; imagens/logo/favicon genéricos substituídos. |
| 2026-08-01 | Depois de duas rodadas de recriação manual (React), o usuário ainda considerou o resultado ruim e pediu para "embedar o html na capa", remover o footer e usar as mesmas fontes do HTML em toda a doc. | Parar de recriar a capa em React: embutir `framework-hibrido.html` via `<iframe>` (fidelidade garantida por ser o mesmo arquivo). Remover `footer` de `themeConfig` (sitewide). Confirmar que `--ifm-font-family-base`/`--ifm-heading-font-family`/`--ifm-font-family-monospace` já cobrem o site inteiro, não só a home. Os componentes de recriação manual (gauge, seção blueprint, hero, etc.) foram removidos do código — o arquivo embutido os torna redundantes. |
| 2026-08-01 | "Ajuste a transição da visão executiva para blueprint, o ponto parece flutuando" — mas era o **marcador** (gauge-marker) que parecia sumir? | **Diagnóstico inicial errado**: o marcador foi trocado para dourado fixo (achando que era ele o problema — o usuário não pediu para reverter, então essa mudança ficou). O usuário então esclareceu: o problema real era a **trilha** (gauge-track), cuja metade escura usava `var(--blue-bg)` — a mesma cor exata do fundo da página nos slides do registro blueprint, então essa metade da trilha literalmente desaparecia contra o próprio fundo. Corrigido trocando para `var(--blue-card)` (tom distinto de `--blue-bg`) + uma borda dourada sutil sempre visível. FR-10/AC-10 foram reescritos para descrever a trilha, não o marcador. |
| 2026-08-02 | Depois de validar o tom de `docs/intro.mdx`, usuário pediu para avaliar se a landing page (`framework-hibrido.html`, embutida via iframe na home) também tinha tom negativo que pudesse prejudicar a imagem do framework. | FR-12/AC-12 adicionados. Quatro pontos corrigidos: slide 3 título ("a operação perde o controle" → "o potencial da IA fica limitado") e card 3 ("IA sem contexto erra mais... atalhos que parecem certos e não são" → "IA sem contexto perde precisão... precisam de mais retrabalho"); slide 7 legenda da cadeia de IDs (frase negativa condicional → afirmação positiva); slide 10 título ("O que precisa ser decidido" → "Como cada squad personaliza o framework") e os 4 cards reenquadrados como customização por squad, mesmo padrão aplicado em `004-intro-framework`. Slides 2, 5, 6, 8, 9 avaliados e mantidos sem alteração (tom já neutro/positivo). |
| 2026-08-02 | Usuário pediu, especificamente, para reescrever o card 1 do slide 2 ("IA entra em cada etapa" / "Agentes já ajudam a escrever documentos, montar backlog e gerar código.") para remeter que a IA hoje é usada apenas para performance pessoal (individual), não de forma estruturada/organizacional. | Card 1 reescrito: "IA usada para performance pessoal" / "Cada profissional já usa agentes no dia a dia para escrever documentos, gerar código e ganhar produtividade individual." Tom mantido neutro/situacional (slide "Situação", não "Complicação") — descreve o estado atual sem crítica. |
