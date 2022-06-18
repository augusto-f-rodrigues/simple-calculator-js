'use strict';

/////////////////////////////
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);
/////////////////////////////

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      //Show the number formated with comma
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    // Check the values before the calculate
    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case '+':
        result = _previousOperand + _currentOperand;
        break;
      case '-':
        result = _previousOperand - _currentOperand;
        break;
      case '÷':
        result = _previousOperand / _currentOperand;
        break;
      case '*':
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  chooseOperation(operation) {
    //Not show an operator without a number before
    if (this.currentOperand === '') return;

    if (this.previousOperand !== '') {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  appendNumber(number) {
    if (this.currentOperand.includes('.') && number === '.') return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ''}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

/////////////////////////////
//Instance of Calculator class
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

/////////////////////////////
//Events Handler
numberButtons.forEach((num, i) => {
  num.addEventListener('click', () => {
    calculator.appendNumber(numberButtons[i].innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((operator, i) => {
  operator.addEventListener('click', () => {
    calculator.chooseOperation(operatorButtons[i].innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
