import { describe, it, expect }
from "vitest";

import { LocalMarkdownFrontMatterParser }
from "./LocalMarkdownFrontMatterParser";

describe("LocalMarkdownFrontMatterParser", () => {
  it("should return original content when front matter is not present", () => {
	  const content = `# My Article

	  This is my article
	  `;

	  const parser = new LocalMarkdownFrontMatterParser();

	  const result = parser.parse(content)

	  expect(result.frontMatter).toEqual({});
	  expect(result.content).toBe(content);
  });

  it("should parse front matter", () => {
  const content = `---
title: "My Article"
slug: "my-article"
---

# My Article

This is my article`;

  const parser = new LocalMarkdownFrontMatterParser();

  const result = parser.parse(content);

  expect(result.frontMatter).toEqual({
    title: "My Article",
    slug: "my-article",
  });
});

it("should preserve markdown content after front matter", () => {
  const content = [
    "---",
    'title: "My Article"',
    'slug: "my-article"',
    "---",
    "",
    "# My Article",
    "",
    "This is my article.",
  ].join("\n");

  const parser = new LocalMarkdownFrontMatterParser();

  const result = parser.parse(content);

  const expectedContent = [
    "",
    "# My Article",
    "",
    "This is my article.",
  ].join("\n");

  expect(result.content).toBe(expectedContent);
});

it("should parse front matter without title", () => {
  const content = [
    "---",
    'slug: "my-article"',
    "---",
    "",
    "# My Article",
  ].join("\n");

  const parser = new LocalMarkdownFrontMatterParser();

  const result = parser.parse(content);

  expect(result.frontMatter).toEqual({
    slug: "my-article",
  });
});

it("should parse front matter without slug", () => {
  const content = [
    "---",
    'title: "My Article"',
    "---",
    "",
    "# My Article",
  ].join("\n");

  const parser = new LocalMarkdownFrontMatterParser();

  const result = parser.parse(content);

  expect(result.frontMatter).toEqual({
    title: "My Article",
  });
});

it("should parse empty front matter", () => {
  const content = [
    "---",
    "---",
    "",
    "# My Article",
  ].join("\n");

  const parser = new LocalMarkdownFrontMatterParser();

  const result = parser.parse(content);

  expect(result.frontMatter).toEqual({});
});

it("should preserve content when front matter is not closed", () => {
  const content = [
    "---",
    'title: "My Article"',
    'slug: "my-article"',
    "",
    "# My Article",
  ].join("\n");

  const parser = new LocalMarkdownFrontMatterParser();

  const result = parser.parse(content);

  expect(result.frontMatter).toEqual({});
  expect(result.content).toBe(content);
});

it("should ignore unsupported front matter properties", () => {
  const content = [
    "---",
    'title: "My Article"',
    'slug: "my-article"',
    'author: "Matheus"',
    "---",
    "",
    "# My Article",
  ].join("\n");

  const parser = new LocalMarkdownFrontMatterParser();

  const result = parser.parse(content);

  expect(result.frontMatter).toEqual({
    title: "My Article",
    slug: "my-article",
  });
});
});
