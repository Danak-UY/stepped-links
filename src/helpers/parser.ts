export function objToJson(data: unknown, indentation = 2): string {
  return JSON.stringify(data, null, indentation);
}

export function jsonToObj(data: string): object {
  return JSON.parse(data);
}
