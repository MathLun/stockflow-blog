import type { Article } from "@/../types/article";
import type { Series } from "@/../types/series";

export interface ContentProvider {
  getSeries(slug: string): Promise<Series>;

  getArticles(seriesSlug: string): Promise<Article[]>;
}
