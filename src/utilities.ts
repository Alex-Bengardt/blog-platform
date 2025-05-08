export const capitalizeWords = (str: string): string => {
  const words = str.split(' ');

  const capitalizedWords = words.map((word) => {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord;
  });

  const capitalizedStr = capitalizedWords.join(' ');
  return capitalizedStr;
};

type InputObject = {
  [key: string]: string | number;
};

export const concatNumericKeys = (obj: InputObject): string => {
  return Object.keys(obj).reduce((result, key) => {
    const parsedKey = parseInt(key, 10);
    if (!isNaN(parsedKey) || obj[key] === '') {
      result += obj[key];
    }
    return result;
  }, '');
};
