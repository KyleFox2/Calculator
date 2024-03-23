// Get references to DOM elements
const numberBtns = Array.from(document.getElementsByClassName("data-number"));
const operationBtns = Array.from(
  document.getElementsByClassName("data-operation")
);
const previousOperandText = document.getElementById("previous-operand");
const currentOperandText = document.getElementById("current-operand");
const equal = document.querySelector(".data-equals");
const allClearBtn = document.querySelector(".data-ac");
const delBtn = document.querySelector(".data-delete");

// Calculator class to handle calculator operations
class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperandText = previousOperand;
    this.currentOperandText = currentOperand;
    this.clear();
  }

  // Clear calculator values
  clear() {
    this.current = "";
    this.previous = "";
    this.operation = "";
  }

  // Append number to current operand
  appendNumber(num) {
    // Check for decimal point duplication
    if (num === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + num.toString();
  }

  // Update display with current and previous operands
  updateDisplay() {
    if (this.operation === "" || this.operation === undefined) {
      this.currentOperandText.innerText = this.current;
      this.previousOperandText.innerText = this.previous;
    } else {
      this.currentOperandText.innerText = this.current;
      this.previousOperandText.innerText = `${this.previous} ${this.operation}`;
    }
  }

  // Perform arithmetic computation
  computation() {
    let compute;
    const prev = parseFloat(this.previous);
    const current = parseFloat(this.current);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        compute = prev + current;
        break;
      case "-":
        compute = prev - current;
        break;
      case "*":
        compute = prev * current;
        break;
      case "÷":
        compute = prev / current;
        break;
      default:
        return;
    }
    this.current = compute;
    this.previous = "";
    this.operation = undefined;
  }

  // Select operation and perform computation if needed
  selectOperation(op) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.computation();
    }
    this.operation = op;
    this.previous = this.current;
    this.current = "";
    this.updateDisplay();
  }

  // Delete last character from current operand
  del() {
    if (typeof this.current === "string") {
      this.current = this.current.replace(
        this.current[this.current.length - 1],
        ""
      );
    }
  }
}

// Create a new instance of the Calculator class
const calculator = new Calculator(previousOperandText, currentOperandText);

// Event listeners for number buttons
numberBtns.forEach((number) => {
  number.addEventListener("click", (e) => {
    calculator.appendNumber(e.target.textContent);
    calculator.updateDisplay();
  });
});

// Event listeners for operation buttons
operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", (e) => {
    calculator.selectOperation(e.target.textContent);
  });
});

// Event listener for equal button
equal.addEventListener("click", () => {
  calculator.computation();
  calculator.updateDisplay();
});

// Event listener for all clear button
allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

// Event listener for delete button
delBtn.addEventListener("click", () => {
  calculator.del();
  calculator.updateDisplay();
});
