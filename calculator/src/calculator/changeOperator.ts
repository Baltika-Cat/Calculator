export const changeOperator = (symbol: string): string => {
  switch (symbol) {
    case '+':
      return '+';
    case '-':
      return '-';
    case '%':
      return '%';
    case '^':
      return '^';
    case '\u221a':
      return 'sqrt';
    case '\u00f7':
      return '/';
    case '\u00d7':
      return '*';
    default:
      return '';
  }
};
