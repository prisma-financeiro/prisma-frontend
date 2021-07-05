const cutString = (string: string, numberOfAllowedCharacters: number) => {
  const elipsis = string.length > numberOfAllowedCharacters ? '...' : '';
  return string.slice(0, numberOfAllowedCharacters) + elipsis;
}

export default cutString;