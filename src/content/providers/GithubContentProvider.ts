import type { Article } from "@/../types/article";
import type { Series } from "@/../types/series";

import type { ContentProvider } from "./ContentProvider";

class GithubContentProvider implements ContentProvider {
  async getSeries(slug: string): Promise<Series> {
    return {
      title: "Building StockFlow",
      slug,
      description:
        "Documentando toda a evolução do StockFlow.",
      articles: [],
    };
  }

  async getArticles(seriesSlug: string): Promise<Article[]> {
    return [
      {
        id: 1,
        title: "Introdução",
        slug: "00-introduction",
        path: `docs/blog/${seriesSlug}/00-introduction.md`,
      },
    ];
  }
}

export { GithubContentProvider };
