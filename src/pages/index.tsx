import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const capaSrc = useBaseUrl('/framework-hibrido-rascunho.html');
  return (
    <Layout
      title="Um ciclo de desenvolvimento com IA integrada"
      description="Do brief de negócio ao código gerado por IA — um único fluxo, com rastreabilidade em cada etapa.">
      <iframe
        src={capaSrc}
        title="Um modelo de trabalho com IA integrada — do executivo ao técnico"
        className={styles.capaFrame}
      />
    </Layout>
  );
}
