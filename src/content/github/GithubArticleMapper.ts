import type { Article } from '@/../types/article';

interface GithubContent {
	name: string;
	path: string;
	sha: string;
	type: string;
}

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
