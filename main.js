document.addEventListener("DOMContentLoaded", function (event) {
  class Calculator {
    constructor(prevOperandElement, currOperandElement) {
      this.prevOperandElement = prevOperandElement;
      this.currOperandElement = currOperandElement;
      this.clear();
    }
    clear() {
      this.currOperand = "";
      this.prevOperand = "";
      this.operation = undefined;
    }

    delete() {
      this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
      if (number === "." && this.currOperand.toString().includes(".")) return;
      this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
      if (this.currOperand === "") return;
      if (this.prevOperand !== "") {
        this.compute();
      }
      this.operation = operation;
      this.prevOperand = this.currOperand;
      this.currOperand = "";
    }

    compute() {
      let computation;
      const prev = parseFloat(this.prevOperand);
      const curr = parseFloat(this.currOperand);
      if (isNaN(prev) || isNaN(curr)) return;
      switch (this.operation) {
        case "+":
          computation = prev + curr;
          break;
        case "-":
          computation = prev - curr;
          break;
        case "*":
          computation = prev * curr;
          break;
        case "/":
          computation = prev / curr;
          break;
        default:
          return;
      }
      this.currOperand = computation;
      this.operation = undefined;
      this.prevOperand = "";
    }

    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0,
        });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }

    updateDisplay() {
      this.currOperandElement.innerText = this.getDisplayNumber(
        this.currOperand
      );
      if (this.operation != null) {
        this.prevOperandElement.innerText = `${this.getDisplayNumber(
          this.prevOperand
        )} ${this.operation}`;
      } else {
        this.prevOperandElement.innerText = "";
      }
    }
  }

  const numButtons = document.querySelectorAll(".num");
  const operButtons = document.querySelectorAll(".oper");
  const equalsButton = document.querySelector(".equals");
  const resetButton = document.querySelector(".reset");
  const deleteButton = document.querySelector(".delete");
  const prevOperandElement = document.querySelector(".prev-operand");
  const currOperandElement = document.querySelector(".curr-operand");
  const calculator = new Calculator(prevOperandElement, currOperandElement);

  numButtons.forEach(function (numButton) {
    numButton.addEventListener("click", function () {
      calculator.appendNumber(numButton.innerText);
      calculator.updateDisplay();
    });
  });

  operButtons.forEach(function (operButton) {
    operButton.addEventListener("click", function () {
      var operator = operButton.dataset.value;
      calculator.chooseOperation(operator);
      calculator.updateDisplay();
    });
  });

  deleteButton.addEventListener("click", function () {
    calculator.delete();
    calculator.updateDisplay();
  });

  equalsButton.addEventListener("click", function () {
    calculator.compute();
    calculator.updateDisplay();
  });

  resetButton.addEventListener("click", function () {
    calculator.clear();
    calculator.updateDisplay();
  });

  document.addEventListener("keydown", function (e) {
    console.log(e.key);
    const isOperand = /^(\+|-|\*|\/)$/.test(e.key);
    if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
    } else if (isOperand) {
      calculator.chooseOperation(e.key);
      calculator.updateDisplay();
    } else if (e.key === "Enter") {
      calculator.compute();
      calculator.updateDisplay();
    } else if (e.key === "Delete" || e.key === "Backspace") {
      calculator.delete();
      calculator.updateDisplay();
    }
  });
});
