import type React from 'react';
import { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [operator, setOperator] = useState('');

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
  const changeOperator = (symbol: string): void => {
    switch (symbol) {
      case '+':
        setOperator('+');
        break;
      case '-':
        setOperator('-');
        break;
      case '%':
        setOperator('%');
        break;
      case '^':
        setOperator('^');
        break;
      case '\u221a':
        setOperator('sqrt');
        break;
      case '\u00f7':
        setOperator('/');
        break;
      case '\u00d7':
        setOperator('*');
        break;
      default:
        break;
    }
  };

  const changeDisplay = (event: React.MouseEvent<HTMLDivElement>): void => {
    const { target } = event;
    const symbol = target instanceof HTMLElement && target.textContent ? target.textContent : '';
    if (symbol === 'C') {
      setDisplay('');
    } else if (symbol.match(/[1-9]/)) {
      setDisplay(display + symbol);
    } else if (symbol === '-' && !display) {
      setDisplay('-');
    } else if (symbol === '0' || symbol === '.') {
      if (display) {
        setDisplay(display + symbol);
      }
    } else {
      changeOperator(symbol);
      if (operator !== '') {
        setDisplay(display.slice(0, display.length - 1) + symbol);
      } else {
        setDisplay(`${display}${symbol}`);
      }
    }
  };

  const buttonSymbols: string[] = [
    '%',
    '^',
    '\u221a',
    '\u00f7',
    '7',
    '8',
    '9',
    '\u00d7',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    'C',
    '=',
  ];

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
