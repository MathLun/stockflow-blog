export type MarkdownBlock =
  | {
      type: "heading";
      level: 1 | 2 | 3;
      content: string;
    }
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "code";
      language?: string;
      content: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    };

/* ParsedMarkdownArticle */

import type { Article } from "@/../types/article";

export interface ParsedMarkdownArticle {
  article: Article;
  blocks: MarkdownBlock[];
}
