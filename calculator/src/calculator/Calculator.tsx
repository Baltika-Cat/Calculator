import type React from 'react';
import { useState } from 'react';

import { buttonSymbols } from '../shared/consts';
import { calculation } from './calculation';
import { changeOperator } from './changeOperator';
import { chooseClass } from './chooseClass';

let operand = '';
let firstOperand = 0;
let secondOperand = 0;
const operatorsArray = ['+', '-', '%', '^', '\u221a', '\u00f7', '\u00d7'];

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
    } else if (symbol.match(/[0-9]/) && newDisplay) {
      operand = symbol;
      firstOperand = 0;
      setDisplay(symbol);
      setNewDisplay(false);
    } else if (symbol.match(/[0-9]/)) {
      if (operand === '0') {
        operand = symbol;
        setDisplay(display.slice(0, -1) + symbol);
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
      if (operand && !operand.includes('.')) {
        setNewDisplay(false);
        operand += symbol;
        setDisplay(display + symbol);
      }
    } else if (symbol === '=') {
      if (operator) {
        secondOperand = Number(operand);
        operand = String(calculation(firstOperand, secondOperand, operator));
        setOperator('');
        setDisplay(operand);
        firstOperand = Number(operand);
        secondOperand = 0;
        setNewDisplay(true);
      }
    } else if (operatorsArray.includes(symbol) && operator !== '') {
      if (operand) {
        secondOperand = Number(operand);
        firstOperand = calculation(firstOperand, secondOperand, operator);
        secondOperand = 0;
        operand = '';
        setOperator(changeOperator(symbol));
        setNewDisplay(false);
        setDisplay(String(firstOperand) + symbol);
      } else {
        setOperator(changeOperator(symbol));
        setDisplay(display.slice(0, -1) + symbol);
      }
    } else if (operatorsArray.includes(symbol)) {
      setOperator(changeOperator(symbol));
      if (operand) {
        firstOperand = Number(operand);
        operand = '';
        setDisplay(`${display}${symbol}`);
        setNewDisplay(false);
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