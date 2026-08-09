import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import type { Article } from '@/../types/article';

import { Loading } from '@/components/feedback/Loading';

import { ErrorState } from '@/components/feedback/ErrorState';

import { EmptyState } from '@/components/feedback/EmptyState';

import styles from "./SeriesDetails.module.css";

import { GithubClient } from '@/content/github/GithubClient';

import { GithubContentProvider } from '@/content/providers/GithubContentProvider';

/* - Growth Hacking */
import { ProjectCTA } from '@/components/growth/ProjectCTA';

const githubClient = new GithubClient();

const contentProvider = new GithubContentProvider(githubClient);

const SeriesDetailsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
	const loadArticles = async () => {
		if (!slug) return;

		setIsLoading(true);

		try {
			await new Promise(resolve => setTimeout(resolve, 2000));

			const data = await contentProvider.getArticles(slug);
			setArticles(data);
		} catch (error) {
			setError("Não foi possivel carregar os artigos");
		} finally {
			setIsLoading(false);
		}
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
	  {isLoading && <Loading />}

	  {error && <ErrorState />}

	  {!isLoading && !error && articles.length === 0 && <EmptyState title="Nenhum artigo encontrado" message="Esta série ainda não possui artigos publicados." />}

	  {!isLoading && !error && articles.length > 0 && articles.map((article) => (
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
