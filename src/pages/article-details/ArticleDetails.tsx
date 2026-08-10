import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Article } from "@/../types/article";

import { Loading } from "@/components/feedback/Loading";
import { ErrorState } from "@/components/feedback/ErrorState";

import { GithubClient } from "@/content/github/GithubClient";
import { GithubContentProvider } from "@/content/providers/GithubContentProvider";

import type { MarkdownBlock } from "@/content/markdown/types";

import { MarkdownArticleParser } from "@/content/markdown/MarkdownArticleParser";

/* - Growth Hacking */
import { ProjectCTA } from "@/components/growth";

import styles from "./ArticleDetails.module.css";

const githubClient = new GithubClient();

const contentProvider = new GithubContentProvider(githubClient);

const ArticleDetailsPage = () => {
  const { seriesSlug, articleSlug } = useParams();

  const [article, setArticle] = useState<Article | null>(null);
  const [blocks, setBlocks] = useState<MarkdownBlock[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!seriesSlug || !articleSlug) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await contentProvider.getArticle(
          seriesSlug,
          articleSlug,
        );

        const parsedArticle = MarkdownArticleParser({
          article: data.article,
          content: data.content,
        });

        setArticle(parsedArticle.article);
	setBlocks(parsedArticle.blocks);
      } catch (error) {
        setError("Não foi possível carregar o artigo");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [seriesSlug, articleSlug]);

  return (
    <article className={styles.container}>
      <Link
        to={`/series/${seriesSlug}`}
        className={styles.backLink}
      >
        ← Voltar para série
      </Link>

      {isLoading && <Loading />}

      {!isLoading && error && <ErrorState />}

      {!isLoading && !error && article && (
        <div className={styles.content}>
          <h1>{article.title }</h1>

	  {blocks.map((block, index) => {
    switch (block.type) {
      case "heading":
        return;

      case "paragraph":
        return <p key={index}>{block.content}</p>;

      case "list":
        return (
          <ul key={index}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );

      case "code":
        return (
          <pre key={index}>
            <code>{block.content}</code>
          </pre>
        );
    }
  })}
        </div>
      )}

      <ProjectCTA source="article" />
    </article>
  );
};

export { ArticleDetailsPage };
