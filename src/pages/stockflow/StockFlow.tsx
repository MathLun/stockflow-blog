import styles from "./StockFlow.module.css";
import { track } from "@/analytics/track";

export function StockFlowPage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>StockFlow</span>

        <h1>Um sistema de gerenciamento de estoque construído com Laravel.</h1>

        <p>
          O StockFlow é um projeto construído em público, documentando as
          decisões técnicas, a implementação e a evolução do sistema.
        </p>

        <a
          href="https://github.com/MathLun/stockflow"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.action}
	  onClick={() => track("stockflow_github_clicked")}
        >
          Ver no GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className={styles.section}>
        <h2>Sobre o projeto</h2>

        <p>
          O StockFlow está sendo desenvolvido de forma incremental, utilizando
          cada sprint para evoluir uma parte do domínio e documentar as
          decisões tomadas durante o desenvolvimento.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Status atual</h2>

        <div className={styles.status}>
          <span className={styles.statusIndicator} aria-hidden="true" />

          <div>
            <strong>Sprint 01 concluído</strong>
            <p>Product Catalog</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Roadmap</h2>

        <ol className={styles.roadmap}>
          <li className={styles.completed}>
            <strong>Sprint 01</strong>
            <span>Product Catalog</span>
          </li>

          <li className={styles.current}>
            <strong>Sprint 02</strong>
            <span>Categories</span>
          </li>

          <li>
            <strong>Sprint 03</strong>
            <span>Inventory</span>
          </li>
        </ol>
      </section>
    </main>
  );
}
