export const capitalizeFirstLetter = (word: string): string => {
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalized;
};

export const arrayToString = (arr: string[]): string => {
  return arr
    .map((element, i) => (i === 0 ? element : " " + element))
    .toString();
};
