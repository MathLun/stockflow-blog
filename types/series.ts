import type { Article } from "./article";

export type Series = {
  title: string;
  slug: string;
  description: string;
  articles: Article[];
}
