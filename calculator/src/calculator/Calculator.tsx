import type React from 'react';
import { useState } from 'react';

import { buttonSymbols } from '../shared/consts';
import { calculation } from './calculation';
import { changeOperator } from './changeOperator';
import { chooseClass } from './chooseClass';

let operand = '';
let firstOperand = 0;
let secondOperand = 0;

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [operator, setOperator] = useState('');
  const [newDisplay, setNewDisplay] = useState(false);

  const changeDisplay = (event: React.MouseEvent<HTMLDivElement>): void => {
    const { target } = event;
    const symbol = target instanceof HTMLElement && target.textContent ? target.textContent : '';
    if (symbol === 'C') {
      setOperator('');
      operand = '';
      firstOperand = 0;
      secondOperand = 0;
      setDisplay('');
    } else if (symbol.match(/[0-9]/)) {
      if (operand === '0') {
        operand = symbol;
        setDisplay(symbol);
      } else {
        operand += symbol;
        setDisplay(display + symbol);
      }
    } else if (symbol === '-' && !display) {
      operand += symbol;
      setDisplay('-');
    } else if (symbol === '-' && operand === '-') {
      setDisplay('-');
    } else if (symbol === '.') {
      if (display && !operand.includes('.')) {
        operand += symbol;
        setDisplay(display + symbol);
      }
    } else if (symbol === '=') {
      if (operator) {
        secondOperand = Number(operand);
        setDisplay(String(calculation(firstOperand, secondOperand, operator)));
        setOperator('');
        firstOperand = 0;
        secondOperand = 0;
        operand = '';
      }
    } else if (operator !== '') {
      if (operand) {
        setOperator(changeOperator(symbol));
        secondOperand = Number(operand);
        firstOperand = calculation(firstOperand, secondOperand, operator);
        secondOperand = 0;
        operand = '';
        setDisplay(String(firstOperand) + symbol);
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
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons-area">
        {buttonSymbols.map(item => {
          return (
            <div
              key={item}
              className={chooseClass(item)}
              onClick={event => {
                changeDisplay(event);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};