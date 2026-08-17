import type { Article } from "@/../types/article";

import type { MarkdownBlock, ParsedMarkdownArticle } from "./types";

import type { MarkdownFrontMatterParser }
from "./MarkdownFrontMatterParser";

interface MarkdownArticleParserInput {
  article: Article;
  content: string;
  frontMatterParser?: MarkdownFrontMatterParser
}

const MarkdownArticleParser = ({
  article,
  content,
  frontMatterParser
}: MarkdownArticleParserInput): ParsedMarkdownArticle => {

  let frontMatter;
  let markdownContent = content;

  if (frontMatterParser) {
	  const parsed = frontMatterParser.parse(content);
	  frontMatter = parsed.frontMatter;
	  markdownContent = parsed.content;
  }

  const lines = markdownContent.split(/\r?\n/);
  // const lines = content.split(/\r?\n/);


  const blocks: MarkdownBlock[] = [];

  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  let isCodeBlock = false;
  let codeLanguage: string | undefined;
  let codeLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      content: paragraphLines.join(" ").trim(),
    });

    paragraphLines = [];
  };
 
  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }

    blocks.push({
      type: "list",
      items: [...listItems],
    });

    listItems = [];
  };

  const flushCodeBlock = () => {
    blocks.push({
      type: "code",
      ...(codeLanguage
        ? { language: codeLanguage }
        : {}),
      content: codeLines.join("\n"),
    });

    codeLines = [];
    codeLanguage = undefined;
    isCodeBlock = false;
  };

  for (const line of lines) {
    if (isCodeBlock) {
      if (line.startsWith("```")) {
        flushCodeBlock();
      } else {
        codeLines.push(line);
      }

      continue;
    }

    if (line.startsWith("```")) {
      flushParagraph();
      flushList();

      const language = line
        .substring(3)
        .trim();

      codeLanguage = language || undefined;
      isCodeBlock = true;

      continue;
    }

    const trimmedLine = line.trim();

    /* Reconhecimento de heading */
    const headingMatch = trimmedLine.match(
      /^(#{1,3})\s+(.+)$/
    );

    if (headingMatch) {
      flushParagraph();
      flushList();

      blocks.push({
        type: "heading",
        level: headingMatch[1].length as 1 | 2 | 3,
        content: headingMatch[2].trim(),
      });

      continue;
    }

    /* Reconhecimento de imagem */
    const imageMatch = trimmedLine.match(
	/^!\[([^\]]*)\]\(([^)]+)\)$/
    );

    if (imageMatch) {
       flushParagraph();
       flushList();

       blocks.push({
	type: "image",
	alt: imageMatch[1].trim(),
	src: imageMatch[2].trim()
       });

       continue;
    }

    /* Reconhecimento de Lista */
    const listMatch = trimmedLine.match(
      /^[-*]\s+(.+)$/
    );

    if (listMatch) {
      flushParagraph();

      listItems.push(listMatch[1].trim());

      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();

      continue;
    }

    flushList();

    paragraphLines.push(line.trim());
  }

  flushParagraph();
  flushList();

  if (isCodeBlock) {
    flushCodeBlock();
  }

  
  const parsedArticle: Article = {
    ...article,
    title: frontMatter?.title ?? article.title,
    slug: frontMatter?.slug ?? article.slug
  };

  return {
    article: parsedArticle,
    blocks,
  };
};

export { MarkdownArticleParser };
