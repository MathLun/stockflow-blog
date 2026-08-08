
const GITHUB_API_URL = "https://api.github.com";

export class GithubClient {
	async getContents(
	  owner: string,
	  repository: string,
	  path: string
	) {
	  const url = `${GITHUB_API_URL}/repos/${owner}/${repository}/contents/${path}`;

	  const response = await fetch(url);


	  if(!response.ok) {
		const errorBody = await response.text();

		throw new Error(`GitHub API request failed: ${response.status} ${response.statusText} - ${errorBody}`);
	  }

	  return response.json();
	}
}
