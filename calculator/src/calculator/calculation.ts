export const calculation = (firstOperand: number, secondOperand: number, operator: string): number => {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '%':
      return firstOperand / 100 * secondOperand;
    case 'sqrt':
      return firstOperand ** (1/secondOperand);
    case '^':
      return firstOperand ** secondOperand;
    case '/':
      return firstOperand / secondOperand;
    case '*':
      return firstOperand * secondOperand;
    default:
      return 0;
  }
}