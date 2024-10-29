export const chooseClass = (text: string): string => {
  const className = 'button ';
  const regexp = /[0-9.]/;
  if (text.match(regexp)) {
    return className + 'digit-button';
  }
  if (text === 'C') {
    return className + 'cancel-button';
  }
  return className + 'operator-button';
};