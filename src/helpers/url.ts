/**
 * Replaces every occurrence of the given wildcard pattern in a URL with the provided query string.
 *
 * @param url - The source URL; if falsy, an empty string is returned.
 * @param query - The string to substitute for each wildcard match.
 * @param queryWildcard - A regular-expression pattern (without flags) used to match wildcards in `url`.
 * @returns The URL with all occurrences of `queryWildcard` replaced by `query`.
 */
export function mergeUrl(url: string, query: string, queryWildcard: string): string {
  if (!url) {
    return '';
  }

  const queryWildcardRegex = new RegExp(queryWildcard, 'g');
  return url.replace(queryWildcardRegex, query);
}