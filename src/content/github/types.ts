export interface GithubContent {
	name: string;
	path: string;
	sha: string;
	type: "file" | "dir";
	download_url: string | null;
}

export interface GithubFileContent {
  name: string;
  path: string;
  sha: string;
  type: "file";
  download_url: string | null;
  content?: string;
}
