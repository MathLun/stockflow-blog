import type { MarkdownFrontMatter }
from './types/MarkdownFrontMatter';

export interface MarkdownFrontMatterParser {
	parse(content: string): {
		frontMatter: MarkdownFrontMatter;
		content: string;
	}
}
