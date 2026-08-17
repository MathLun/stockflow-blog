import { describe, it, expect }
from 'vitest'

import type { MarkdownFrontMatterParser }
from "./MarkdownFrontMatterParser";

import { MarkdownArticleParser }
from "./MarkdownArticleParser";

import type { Article }
from "@/../types/article";

describe("MarkdownArticleParser", () => {
  it("should parse markdown content without front matter", async () => {
	  const article: Article = {
		id: 1,
		title: "Original Article",
		slug: "original-article",
		path: "article.md"
	  }

	  const content = `# My Article

	  This is my article
	  `;

	  const result = MarkdownArticleParser({
		  article: article,
		  content: content
	  });

	  console.log(result.blocks);

	  expect(result.article.title).toBe("Original Article");

	  expect(result.article.slug).toBe("original-article");

	  expect(result.blocks).toHaveLength(2);

	  expect(result.blocks[0]).toEqual({
		  type: "heading",
		  level: 1,
		  content: "My Article"
	  });

	  expect(result.blocks[1]).toEqual({
		  type: "paragraph",
		  content: "This is my article"
	  });
  });

  it("should parse markdown content with front matter", async () => {
	  const article: Article = {
		  id: 1,
		  title: "Original Article",
		  slug: "original-article",
		  path: "article.md"
	  }

	  const content = `---
	title: "Parsed title"
	slug: "parsed-title"
	---
	
	# My Article

	This is my article
	`;

	  const frontMatterParser: MarkdownFrontMatterParser = 
	  {parse: () => ({
		  frontMatter: {
			title: "Parsed title",
			slug: "parsed-title",
		  },
		  content: `# My Article

		  This is my article
		  `
	  })};

	  const result = MarkdownArticleParser({
		  article: article,
		  content: content,
		  frontMatterParser: frontMatterParser
	  });

	  expect(result.blocks).toHaveLength(2);

	  expect(result.blocks[0]).toEqual({
		  type: "heading",
		  level: 1,
		  content: "My Article"
	  });

	  expect(result.blocks[1]).toEqual({
		  type: "paragraph",
		  content: "This is my article"
	  });
  });

  it("should use title from front matter", async () => {
	  const article: Article = {
		  id: 1,
		  title: "Original Article",
		  slug: "original-article",
		  path: "article.md"
	  };

	  const content = "# My Article";

	  const frontMatterParser: MarkdownFrontMatterParser =
	  {parse: () => ({
		frontMatter: {
		  title: "Front Matter title",
		  slug: "original-article"
		},
		content: content
	  })};

	  const result = MarkdownArticleParser({
		  article: article,
		  content: content,
		  frontMatterParser: frontMatterParser
	  });

	  expect(result.article.title).toBe("Front Matter title");
  });

  it("should use slug from front matter", async () => {
	  const article: Article = {
		  id: 1,
		  title: "Original Article",
		  slug: "original-article",
		  path: "article.md"
	  };

	  const content = "# My Article";

	  const frontMatterParser: MarkdownFrontMatterParser =
	  {parse: () => ({
		frontMatter: {
		  title: "Front Matter title",
		  slug: "front-matter-slug"
		},
		content: content
	  })};

	  const result = MarkdownArticleParser({
		  article: article,
		  content: content,
		  frontMatterParser: frontMatterParser
	  });

	  expect(result.article.slug).toBe("front-matter-slug");
  });

  it("should keep article title when front matter has no title", () => {
  const article: Article = {
    id: 1,
    title: "Original title",
    slug: "original-slug",
    path: "article.md",
  };

  const content = "# My Article";

  const frontMatterParser: MarkdownFrontMatterParser = {
    parse: () => ({
      frontMatter: {
        slug: "front-matter-slug",
      },
      content,
    }),
  };

  const result = MarkdownArticleParser({
    article,
    content,
    frontMatterParser,
  });

  expect(result.article.title).toBe("Original title");
});

it("should keep article slug when front matter has no slug", () => {
  const article: Article = {
    id: 1,
    title: "Original title",
    slug: "original-slug",
    path: "article.md",
  };

  const content = "# My Article";

  const frontMatterParser: MarkdownFrontMatterParser = {
    parse: () => ({
      frontMatter: {
        title: "Front Matter title",
      },
      content,
    }),
  };

  const result = MarkdownArticleParser({
    article,
    content,
    frontMatterParser,
  });

  expect(result.article.slug).toBe("original-slug");
});

it("should parse markdown heading", () => {
  const article: Article = {
    id: 1,
    title: "Original title",
    slug: "original-slug",
    path: "article.md",
  };

  const content = "# My Article";

  const result = MarkdownArticleParser({
    article,
    content,
  });

  expect(result.blocks).toHaveLength(1);

  expect(result.blocks[0]).toEqual({
    type: "heading",
    level: 1,
    content: "My Article",
  });
});

it("should parse markdown paragraph", () => {
  const article: Article = {
    id: 1,
    title: "Original title",
    slug: "original-slug",
    path: "article.md",
  };

  const content = "This is my article.";

  const result = MarkdownArticleParser({
    article,
    content,
  });

  expect(result.blocks).toHaveLength(1);

  expect(result.blocks[0]).toEqual({
    type: "paragraph",
    content: "This is my article.",
  });
});

it("should parse markdown list", () => {
  const article: Article = {
    id: 1,
    title: "Original title",
    slug: "original-slug",
    path: "article.md",
  };

  const content = `- First item
- Second item
- Third item`;

  const result = MarkdownArticleParser({
    article,
    content,
  });

  expect(result.blocks).toHaveLength(1);

  expect(result.blocks[0]).toEqual({
    type: "list",
    items: [
      "First item",
      "Second item",
      "Third item",
    ],
  });
});

it("should parse markdown code block", () => {
  const article: Article = {
    id: 1,
    title: "Original title",
    slug: "original-slug",
    path: "article.md",
  };

  const content = `\`\`\`ts
const name = "StockFlow";
console.log(name);
\`\`\``;

  const result = MarkdownArticleParser({
    article,
    content,
  });

  expect(result.blocks).toHaveLength(1);

  expect(result.blocks[0]).toEqual({
    type: "code",
    language: "ts",
    content: `const name = "StockFlow";
console.log(name);`,
  });
});

it("should parse markdown image", () => {
  const article: Article = {
	  id: "mass-assignment-laravel",
	  title: "Mass Assignment no Laravel",
	  slug: "mass-assignment-laravel",
	  path: "mass-assignment-laravel.md"
  };

  const content = [
	  "![Mass Assignment no Laravel](/images/mass-assignment-laravel.png)"
  ].join("\n");

  const parser = MarkdownArticleParser({
	  article,
	  content
  });

  const result = parser;

  expect(result.blocks).toEqual([
	  {
	    type: "image",
	    src: "/images/mass-assignment-laravel.png",
	    alt: "Mass Assignment no Laravel"
	  }
  ]);
});

it("should parse markdown image without alt text", () => {
  const content = [
    "![](/images/mass-assignment-laravel.png)"
  ].join("\n");

  const article: Article = {
    id: "mass-assignment-laravel",
    title: "Mass Assignment no Laravel",
    slug: "mass-assignment-laravel",
    path: "mass-assignment-laravel.md"
  };

  const parser = MarkdownArticleParser({
    article,
    content
  });

  expect(parser.blocks).toEqual([
    {
      type: "image",
      src: "/images/mass-assignment-laravel.png",
      alt: ""
    }
  ]);
});

it("should parse image between paragraphs", () => {
  const content = [
    "Before the image.",
    "",
    "![Mass Assignment](/images/mass-assignment.png)",
    "",
    "After the image."
  ].join("\n");

  const article: Article = {
    id: "mass-assignment-laravel",
    title: "Mass Assignment no Laravel",
    slug: "mass-assignment-laravel",
    path: "mass-assignment-laravel.md"
  };

  const parser = MarkdownArticleParser({
    article,
    content,
    frontMatterParser: undefined
  });

  expect(parser.blocks).toEqual([
    {
      type: "paragraph",
      content: "Before the image."
    },
    {
      type: "image",
      src: "/images/mass-assignment.png",
      alt: "Mass Assignment"
    },
    {
      type: "paragraph",
      content: "After the image."
    }
  ]);
});
it("should parse markdown image with surrounding spaces", () => {
  const content = [
    "  ![Mass Assignment](/images/mass-assignment.png)  "
  ].join("\n");

  const article: Article = {
    id: "mass-assignment-laravel",
    title: "Mass Assignment no Laravel",
    slug: "mass-assignment-laravel",
    path: "mass-assignment-laravel.md"
  };

  const parser = MarkdownArticleParser({
    article,
    content,
  });

  expect(parser.blocks).toEqual([
    {
      type: "image",
      src: "/images/mass-assignment.png",
      alt: "Mass Assignment"
    }
  ]);
});
});
