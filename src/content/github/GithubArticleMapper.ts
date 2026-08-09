import type { Article } from '@/../types/article';

import type { GithubContent } from "./types";

const GithubArticleMapper = (
	content: GithubContent
): Article => {
	const slug = content.name
	 .replace(".md", "")
	 .toLowerCase();

	return {
	  id: Number.parseInt(content.sha.substring(0,8), 16),
	  title: slug,
	  slug,
	  path: content.path
	}
}

export { GithubArticleMapper };
