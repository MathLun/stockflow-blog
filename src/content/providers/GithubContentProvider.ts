import type { Article } from "@/../types/article";
import type { Series } from "@/../types/series";

import type { GithubContent } from "@/content/github/types";

import { contentConfig } from '@/config/content';

import { GithubClient } from '@/content/github/GithubClient';

import { GithubArticleMapper } from '@/content/github/GithubArticleMapper';

import type { ContentProvider } from "./ContentProvider";

class GithubContentProvider implements ContentProvider {
  constructor(private readonly client: GithubClient) {}

  async getSeries(slug: string): Promise<Series> {
    return {
      title: "Building StockFlow",
      slug,
      description:
        "Documentando toda a evolução do StockFlow.",
      articles: await this.getArticles(slug),
    };
  }

  async getArticles(seriesSlug: string): Promise<Article[]> {
	  const contents = await this.getNestedContents(`docs/blog/${seriesSlug}`); 

	  return contents.filter((content) => 
		   content.type === "file" &&
		   content.name.endsWith(".md") &&
		   content.name !== "README.md"
	  ).map(GithubArticleMapper);
  }

  async getArticle(
	  seriesSlug: string,
	  articleSlug: string
  ) {
	  const articles = await this.getArticles(seriesSlug);
	  const article = articles.find(article => article.slug === articleSlug);

	  if (!article) {
		  throw new Error("Article not found");
	  }	
	  
	  const content = await this.client.getFileContent(contentConfig.github.owner, contentConfig.github.repository, article.path);

	  return { article, content };
  }

  async getNestedContents(
	  path: string
  ): Promise<GithubContent[]> {
	  const contents = await this.client.getContents(contentConfig.github.owner, contentConfig.github.repository, path);

	  const nestedContents = await Promise.all(contents.filter((content) => content.type === "dir").map((directory) => this.getNestedContents(directory.path)));

	  return [
		...contents.filter((content) => content.type === "file"),
		...nestedContents.flat()
	  ];
  }

}

export { GithubContentProvider };
