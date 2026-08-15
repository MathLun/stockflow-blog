import type {
    MarkdownFrontMatterParser,
} from "./MarkdownFrontMatterParser";

import type {
	MarkdownFrontMatter
} from "./types/MarkdownFrontMatter";

class LocalMarkdownFrontMatterParser
    implements MarkdownFrontMatterParser {

    parse(content: string) {
        const lines = content.split(/\r?\n/);

        if (lines[0]?.trim() !== "---") {
            return {
                frontMatter: {},
                content,
            };
        }

        const endIndex = lines
            .slice(1)
            .findIndex((line) => line.trim() === "---");

        if (endIndex === -1) {
            return {
                frontMatter: {},
                content,
            };
        }

        const frontMatterLines = lines.slice(
            1,
            endIndex + 1
        );

        const frontMatter: MarkdownFrontMatter = {};

        for (const line of frontMatterLines) {
            const match = line.match(
                /^(\w+):\s*["']?(.*?)["']?$/
            );

            if (!match) {
                continue;
            }

            const [, key, value] = match;

            if (key === "title" || key === "slug") {
                frontMatter[key] = value;
            }
        }

        return {
            frontMatter,
            content: lines
                .slice(endIndex + 2)
                .join("\n"),
        };
    }
}

export { LocalMarkdownFrontMatterParser };
