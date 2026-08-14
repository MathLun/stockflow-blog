/* @imports React Libs */
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import { LocalContentProvider }
from '@/content/providers/LocalContentProvider'

import type { Article }
from "@/../types/article";

import type { MarkdownBlock } from "@/content/markdown/types";

import { MarkdownArticleParser } from "@/content/markdown/MarkdownArticleParser";

import { LocalMarkdownFrontMatterParser } from "@/content/markdown/LocalMarkdownFrontMatterParser";

const frontMatterParser = new LocalMarkdownFrontMatterParser();
const contentProvider = new LocalContentProvider();

const StandaloneArticleDetailsPage = () => {
	const [article, setArticle] = useState<Article | null>(null)
	const [blocks, setBlocks] = useState<MarkdownBlock[]>([]);

	const { slug } = useParams();

	useEffect(() => {
		const loadArticle = async () => {
			if (!slug) return;

			const data = await contentProvider.getArticle(slug)
			if (!data.content) {
				throw new Error("Article content not found");
			}

			const parsedArticle = MarkdownArticleParser({ article: data , content: data.content, frontMatterParser });

			setArticle(parsedArticle.article)
			setBlocks(parsedArticle.blocks)
		}

		loadArticle()
	}, [slug])

	if (!article) {
		return <p>Article not found</p>;
	}

	return (
	  <article>

	{blocks.map((block, index) => {
		switch (block.type) {
			case "heading":
			  return (
				  <h2 key={index}>
				  {block.content}
				  </h2>
			  );

			case "paragraph":
			  return (
				  <p key={index}>
				  {block.content}
				  </p>
			  );
			case "list":
			  return (
				<ul key={index}>
				  {block.items.map((item, itemIndex) => (<li key={itemIndex}>{item}</li>))}
				  </ul>
			  );

			case "code":
			  return (
			    <pre key={index}>
			      <code>
			        {block.content}
			      </code>
			    </pre>
			  );
		}
	})}

	  </article>
	)
}

export { StandaloneArticleDetailsPage }
