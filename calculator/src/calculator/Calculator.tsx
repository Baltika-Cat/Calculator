import type React from 'react';
import { useState } from 'react';
import { buttonSymbols } from '../shared/consts';
import { calculation } from './calculation';
import { changeOperator } from './changeOperator';

let operand = '';
let firstOperand = 0;
let secondOperand = 0;

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [operator, setOperator] = useState('');
  const [possiblePoint, setPossiblePoint] = useState(false);
  const [possibleOperator, setPossibleOperator] = useState(false);
  const [possibleMinus, setPossibleMinus] = useState(true);
  const [possibleZero, setPossibleZero] = useState(false);

  const chooseColor = (text: string): string => {
    const regexp = /[0-9.]/;
    if (text.match(regexp)) {
      return '#bbb';
    }
    if (text === '=') {
      return 'red';
    }
    return '#555';
  };

  const changeDisplay = (event: React.MouseEvent<HTMLDivElement>): void => {
    const { target } = event;
    const symbol = target instanceof HTMLElement && target.textContent ? target.textContent : '';
    if (symbol === 'C') {
      setOperator('');
      operand = '';
      firstOperand = 0;
      secondOperand = 0;
      setDisplay('');
    } else if (symbol.match(/[1-9]/)) {
      operand += symbol;
      setDisplay(display + symbol);
    } else if (symbol === '-' && !display) {
      operand += symbol;
      setDisplay('-');
    } else if (symbol === '0' || symbol === '.') {
      if (display) {
        operand += symbol;
        setDisplay(display + symbol);
      }
    } else if (symbol === '=') {
      secondOperand = Number(operand);
      setDisplay(String(calculation(firstOperand, secondOperand, operator)));
      setOperator('');
    } else {
        if (operator !== '') {
          if (operand) {
            setOperator(changeOperator(symbol))
            secondOperand = Number(operand);
            console.log(true)
            firstOperand = calculation(firstOperand, secondOperand, operator);
            console.log(firstOperand)
            secondOperand = 0;
            operand = '';
            setDisplay(firstOperand + symbol);
          } else {
            operand += symbol;
            secondOperand = firstOperand;
            setDisplay(display.slice(0, display.length - 1) + symbol);
          }
        } else {
          setOperator(changeOperator(symbol));
          firstOperand = Number(operand);
          operand = '';
          setDisplay(`${display}${symbol}`);
        }
      }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons-area">
        {buttonSymbols.map(item => {
          return (
            <div
              key={item}
              className="button"
              onClick={event => {
                changeDisplay(event);
              }}
              style={{ backgroundColor: chooseColor(item) }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};