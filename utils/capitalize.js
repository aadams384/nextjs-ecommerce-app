const capitalizeFirstLetter = (string) => {
  const lowerCaseString = string.toLowerCase();
  const words = lowerCaseString.split(' ');
  const capitalizedWords = words.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(' ');
};

export default capitalizeFirstLetter;