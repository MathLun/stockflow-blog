/* Server
import fs from "node:fs/promises";
import path from "node:path";

import type { Article } from "@/../types/article";
import type { StandaloneContentProvider } from "./StandaloneContentProvider";

export class LocalContentProvider implements StandaloneContentProvider {
    private readonly articlesPath: string;

    constructor() {
        this.articlesPath = path.resolve(
            process.cwd(),
            "data",
            "articles"
        );

    }

    async getArticle(slug: string): Promise<Article> {
        const filePath = path.join(
            this.articlesPath,
            `${slug}.md`
        );

        const content = await fs.readFile(
            filePath,
            "utf-8"
        );

        return {
            id: 0,
            title: slug,
            slug,
            path: filePath,
            content,
        };
    }
}*/

/* Client */

import type { Article } 
from "@/../types/article";

import type { StandaloneContentProvider }
from "./StandaloneContentProvider";

export class LocalContentProvider
    implements StandaloneContentProvider {

    private readonly articlesPath = "/data/content/articles";

    async getArticle(slug: string): Promise<Article> {
        const path = `${this.articlesPath}/${slug}.md`;

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(
                `Unable to load article: ${slug}`
            );
        }

        const content = await response.text();

        return {
            id: 0,
            title: slug,
            slug,
            path,
            content,
        };
    }
}
