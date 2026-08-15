import type { Article }
from '@/../types/article';

export interface StandaloneContentProvider {
	getArticle(slug: string): Promise<Article>;
}
