import styles from "./ProjectCTA.module.css";
import { track } from "@/analytics/track";

import type { AnalyticsSource } from "@/analytics/sources";

interface Props  {
  source: AnalyticsSource;
}
	
export function ProjectCTA(props: Props) {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>StockFlow</span>

        <h2>Conheça o StockFlow</h2>

        <p>
          Estou construindo um sistema de gerenciamento de estoque com Laravel
          e documentando cada etapa do desenvolvimento.
        </p>

        <a href="/stockflow" className={styles.action} onClick={() => track({ 
		name: "stockflow_cta_clicked",
		properties: {
		  source: props.source
		}
	})}>
          Acompanhar o projeto
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
