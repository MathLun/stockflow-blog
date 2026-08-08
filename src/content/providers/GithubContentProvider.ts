import type { Article } from "@/../types/article";
import type { Series } from "@/../types/series";

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
	  const contents = await this.client.getContents(contentConfig.github.owner, contentConfig.github.repository, `docs/blog/${seriesSlug}`);

	  return contents.filter((content: any) => 
		   content.type === "file" &&
		   content.name.endsWith(".md") &&
		   content.name !== "README.md"
	  ).map(GithubArticleMapper);
  }
}

export { GithubContentProvider };
