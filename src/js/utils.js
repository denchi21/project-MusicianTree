export function getBasePath() {
  // Check if we're on GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  // Get the repository name from the path if on GitHub Pages
  const repoName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
  return isGitHubPages ? `/${repoName}` : '';
} 