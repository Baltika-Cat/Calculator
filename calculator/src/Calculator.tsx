import type React from 'react';
import { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [operator, setOperator] = useState('');

  const chooseColor = (text: string): string => {
    const regexp = /[0-9,]/;
    if (text.match(regexp)) {
      return '#bbb';
    }
    if (text === '=') {
      return 'red';
    }
    return '#555';
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
    ',',
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
