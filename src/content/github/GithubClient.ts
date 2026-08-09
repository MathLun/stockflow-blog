const GITHUB_API_URL = "https://api.github.com";

export class GithubClient {
  async getContents(
    owner: string,
    repository: string,
    path: string
  ) {
    const url =
      `${GITHUB_API_URL}/repos/${owner}/${repository}/contents/${path}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.text();

      throw new Error(
        `GitHub API request failed: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    return response.json();
  }

  async getFileContent(
    owner: string,
    repository: string,
    path: string
  ): Promise<string> {
    const file = await this.getContents(
      owner,
      repository,
      path
    );

    if (Array.isArray(file)) {
      throw new Error(
        "GitHub content is a directory, not a file"
      );
    }

    if (!file.content) {
      throw new Error(
        "GitHub file content is missing"
      );
    }


    return this.decodeBase64(file.content);
  }

  private decodeBase64(content: string): string {
  const binary = atob(content.replace(/\s/g, ""));

  const bytes = Uint8Array.from(
    binary,
    character => character.charCodeAt(0)
  );

  return new TextDecoder("utf-8").decode(bytes);
}
}
