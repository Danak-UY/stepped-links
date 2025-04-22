export function mergeUrl(url: string, query: string, queryWildcard: string): string {
  if (!url) {
    return '';
  }

  const queryWildcardRegex = new RegExp(queryWildcard, 'g');
  return url.replace(queryWildcardRegex, query);
}
