export interface GithubContent {
	name: string;
	path: string;
	sha: string;
	type: "file" | "dir";
	download_url: string | null;
}
