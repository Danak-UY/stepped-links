export const objectHasKey = (obj: object, key: string): boolean => {
  return obj && typeof obj === 'object' && obj !== null && key in obj;
};
