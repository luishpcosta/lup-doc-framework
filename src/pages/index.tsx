import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.hero}>
      <p className={styles.eyebrow}>Modelo de trabalho · IA integrada</p>
      <div className={styles.titleRule} />
      <h1 className={styles.heroTitle}>
        Um ciclo de desenvolvimento com IA integrada
      </h1>
      <p className={styles.heroSub}>
        Do brief de negócio ao código gerado por IA — um único fluxo, com
        rastreabilidade em cada etapa. Da visão executiva ao blueprint
        técnico.
      </p>
      <div className={styles.ctaRow}>
        <Link
          className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
          to="/docs/intro">
          Começar a leitura
        </Link>
        <Link className={styles.ctaButton} to="/docs/intro">
          Ver o blueprint técnico
        </Link>
      </div>
    </header>
  );
}

function ProblemSection() {
  const items = [
    {
      num: '1',
      title: 'Decisões se repetem',
      body: 'O mesmo debate estratégico acontece de novo em cada time, porque ninguém sabe que já foi resolvido em outro lugar.',
    },
    {
      num: '2',
      title: 'Contexto vive na cabeça das pessoas',
      body: 'Quando alguém sai do time, a razão por trás de uma escolha importante sai junto.',
    },
    {
      num: '3',
      title: 'IA sem contexto erra mais',
      body: 'Agentes que executam tarefas sem acesso à intenção de negócio tomam atalhos que parecem certos e não são.',
    },
  ];

  return (
    <section className={styles.section}>
      <p className={styles.sectionEyebrow}>O problema</p>
      <h2 className={styles.sectionTitle}>
        Quando não estruturamos o uso de IA, a operação perde o controle
      </h2>
      <div className={styles.row}>
        {items.map((item) => (
          <div className={styles.card} key={item.num}>
            <div className={styles.cardNum}>{item.num}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CentralIdeaSection() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionEyebrow}>A ideia central</p>
      <h2 className={styles.sectionTitle}>
        Separar onde vive a intenção de onde vive a execução
      </h2>
      <div className={styles.split}>
        <div className={`${styles.panel} ${styles.panelDark}`}>
          <span className={styles.panelTag}>A constituição</span>
          <h3>Por que fazemos e o que precisa ser verdade</h3>
          <ul>
            <li>Estratégia de produto e prioridades</li>
            <li>Como o negócio está organizado em domínios</li>
            <li>Decisões técnicas e por que foram tomadas</li>
            <li>Critérios que definem "pronto"</li>
          </ul>
        </div>
        <div className={`${styles.panel} ${styles.panelLight}`}>
          <span className={styles.panelTag}>A operação</span>
          <h3>Como cada time entrega no dia a dia</h3>
          <ul>
            <li>Cada equipe com seu próprio repositório</li>
            <li>Planeja, executa e testa no seu ritmo</li>
            <li>Usa a constituição como referência, não como camisa de força</li>
            <li>Devolve aprendizados para atualizar a constituição</li>
          </ul>
        </div>
      </div>
      <p className={styles.loopMark}>↻ execução alimenta de volta a constituição</p>
    </section>
  );
}

function CycleSection() {
  const steps: Array<{variant: 'A' | 'B'; title: string; body: string}> = [
    {
      variant: 'A',
      title: 'Análise de negócio',
      body: 'Entende o problema e a prioridade — produz PB e PRD',
    },
    {
      variant: 'B',
      title: 'Análise técnica',
      body: 'Decide a arquitetura e o critério de aceite — produz ADR e ACs',
    },
    {
      variant: 'A',
      title: 'Backlogs',
      body: 'Consolida tudo em itens rastreáveis, prontos para o board',
    },
    {
      variant: 'B',
      title: 'Implementação',
      body: 'Speckit SDD e o agente geram o código, com verificação automática',
    },
  ];

  return (
    <section className={styles.section}>
      <p className={styles.sectionEyebrow}>O ciclo, em quatro movimentos</p>
      <h2 className={styles.sectionTitle}>De negócio a código, em um fluxo só</h2>
      <div className={styles.cycle}>
        {steps.map((step, i) => (
          <>
            <div
              className={`${styles.cycleStep} ${
                step.variant === 'A' ? styles.cycleStepA : styles.cycleStepB
              }`}
              key={step.title}>
              <span className={styles.badge}>humano + IA</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
            {i < steps.length - 1 && (
              <div className={styles.cycleArrow} key={`${step.title}-arrow`}>
                →
              </div>
            )}
          </>
        ))}
      </div>
      <p className={styles.sectionSub} style={{marginTop: '24px', fontStyle: 'italic'}}>
        Cada movimento devolve aprendizado para o anterior — o fluxo é circular,
        não uma esteira de mão única.
      </p>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Um ciclo de desenvolvimento com IA integrada"
      description="Do brief de negócio ao código gerado por IA — um único fluxo, com rastreabilidade em cada etapa.">
      <Hero />
      <main>
        <ProblemSection />
        <CentralIdeaSection />
        <CycleSection />
      </main>
    </Layout>
  );
}
