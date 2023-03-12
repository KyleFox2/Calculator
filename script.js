const numberBtns = Array.from(document.getElementsByClassName('data-number'));
const operationBtns = Array.from(document.getElementsByClassName('data-operation'));
const previousOperandText = document.getElementById('previous-operand');
const currentOperandText = document.getElementById('current-operand');
const equal = document.querySelector('.data-equals');
const allClearBtn = document.querySelector('.data-ac');
const delBtn = document.querySelector('.data-delete');

class Calculator {
  constructor (previousOperand, currentOperand) {
    this.previousOperandText = previousOperand;
    this.currentOperandText = currentOperand;
    this.clear();
  };

  clear() {
    this.current = '';
    this.previous = '';
    this.operation = '';
  };

  appendNumber(num) {
    if(num == '.' && this.current.includes('.') == true) return;
      this.current = this.current.toString() + num.toString();
  };

  updateDisplay() {
    if(this.operation == '' || this.operation == undefined) {
      this.currentOperandText.innerText = this.current;
      this.previousOperandText.innerText = this.previous;
    } else {
      this.currentOperandText.innerText = this.current;
      this.previousOperandText.innerText = `${this.previous} ${this.operation}`;
    };
  };

  computation() {
    let compute;
    const prev = parseFloat(this.previous);
    const current = parseFloat(this.current);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        compute = prev + current;
        break
      case '-':
        compute = prev - current;
        break
      case '*':
        compute = prev * current;
        break
      case '÷':
        compute = prev / current;
        break
      default:
        return
    };
    this.current = compute;
    this.previous = '';
    this.operation = undefined;
  };

  selectOperation(op) {
    if(this.current == '') return;
    if(this.previous != '') {
      this.computation()
    };
    this.operation = op;
    this.previous = this.current;
    this.current = '';
    calculator.updateDisplay();
  };

  del() {
    this.current = this.current.replace(this.current[this.current.length-1],'')
  };
};

const calculator = new Calculator(previousOperandText, currentOperandText);

numberBtns.forEach(number => {
  number.addEventListener('click', e => {
    calculator.appendNumber(e.target.textContent);
    calculator.updateDisplay();
  })
});

operationBtns.forEach(operationBtn => {
  operationBtn.addEventListener('click', e => {  
    calculator.selectOperation(e.target.textContent);
  })
});

equal.addEventListener('click', () => {
  calculator.computation();
  calculator.updateDisplay();
});

allClearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

delBtn.addEventListener('click', () => {
  calculator.del();
  calculator.updateDisplay();
});