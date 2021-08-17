export const uppercaseFirstLetterEachWord = (str: string) => {
  return str.toLowerCase().replace(/\b(\w)/g, (c) => c.toUpperCase());
};
