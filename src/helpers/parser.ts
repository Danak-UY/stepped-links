// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objToJson(data: any, indentation = 2): string {
  return JSON.stringify(data, null, indentation);
}

export function jsonToObj(data: string): object {
  return JSON.parse(data);
}
