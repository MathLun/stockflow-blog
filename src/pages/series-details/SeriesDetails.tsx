import { Link, useParams } from "react-router-dom";

import { articles } from './articles.data';

import styles from "./SeriesDetails.module.css";

const SeriesDetailsPage = () => {
  const { slug } = useParams();

  return (
    <section className={styles.container}>
      <Link
        to="/series"
        className={styles.backLink}
      >
        ← Voltar para séries
      </Link>

      <header className={styles.header}>
        <span className={styles.badge}>Série</span>

        <h1 className={styles.title}>
          {slug === "building-stockflow"
            ? "Building StockFlow"
            : "Série"}
        </h1>

        <p className={styles.description}>
          Documentando toda a evolução do StockFlow,
          sprint após sprint, desde a arquitetura
          até a implementação.
        </p>
      </header>

      <section className={styles.articles}>
        <h2>Artigos</h2>

	<ul className={styles.list}>
	  {articles.map((article) => (
		<li key={article.id}>
		  <Link to={`/articles/building-stockflow/${article.slug}`}>
		    {article.title}
		  </Link>
		</li>
	  ))}
	</ul>
      </section>
    </section>
  );
};

export { SeriesDetailsPage };
