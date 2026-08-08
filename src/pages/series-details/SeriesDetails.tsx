import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import type { Article } from '@/../types/article';

import styles from "./SeriesDetails.module.css";

import { GithubContentProvider } from '@/content/providers/GithubContentProvider';

const contentProvider = new GithubContentProvider();

const SeriesDetailsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const { slug } = useParams();

  useEffect(() => {
	const loadArticles = async () => {
		if (!slug) return;

		const data = await contentProvider.getArticles(slug);
		setArticles(data);
	}

	loadArticles();
  }, [slug]);

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
		  <Link to={`/articles/${slug}/${article.slug}`}>
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
