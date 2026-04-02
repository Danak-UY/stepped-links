export function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

export function mergeUrl(url: string, query: string, queryWildcard: string): string {
  if (!url) {
    return '';
  }

  if (!isValidUrl(url)) {
    console.warn('Invalid URL:', url);
    return url;
  }

  const queryWildcardRegex = new RegExp(escapeRegex(queryWildcard), 'g');
  return url.replace(queryWildcardRegex, query);
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
