/**
 * Convert a JavaScript value to a JSON-formatted string.
 *
 * @param data - The value to serialize (any JSON-serializable value)
 * @param indentation - Number of spaces to use for pretty-printing; defaults to 2
 * @returns The JSON string representation of `data`
 */
export function objToJson(data: unknown, indentation = 2): string {
  return JSON.stringify(data, null, indentation);
}

export function jsonToObj(data: string): object {
  return JSON.parse(data);
}