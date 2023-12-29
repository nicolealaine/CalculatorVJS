document.addEventListener("DOMContentLoaded", function (event) {
  let displayValue = "";
  let total = "";
  const displayContent = document.querySelector(".display__content");

  const numButtons = document.querySelectorAll(".num");
  numButtons.forEach(function (numButton) {
    numButton.addEventListener("click", function () {
      let value = numButton.innerHTML;
      numClickHandler(value);
    });
  });

  function numClickHandler(value) {
    displayValue += value;
    displayContent.innerHTML = displayValue;
  }

  const operButtons = document.querySelectorAll(".oper");
  operButtons.forEach(function (operButton) {
    operButton.addEventListener("click", function () {
      let operator = operButton.dataset.value;
      operClickHandler(operator);
    });
  });

  function operClickHandler(operator) {
    displayValue += operator;
    displayContent.innerHTML = displayValue;
  }

  const equalsButton = document.querySelector(".equals");
  equalsButton.addEventListener("click", function () {
    equalsHandler();
  });
  function equalsHandler() {
    total = eval(displayValue);
    displayValue = total;
    displayContent.innerHTML = displayValue;
  }

  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", resetHandler);

  function resetHandler() {
    displayValue = "";
    displayContent.innerHTML = 0;
  }

  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", deleteHandler);

  function deleteHandler() {
    displayValue = displayValue.slice(0, -1);
    displayContent.innerHTML = displayValue;
  }

  document.addEventListener("keydown", function (e) {
    const isOperand = /^(\+|-|\*|\/)$/.test(e.key);
    if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
      numClickHandler(e.key);
    } else if (isOperand) {
      operClickHandler(e.key);
    } else if (e.key === "Enter") {
      equalsHandler();
    } else if (e.key === "Delete" || e.key === "Backspace") {
      deleteHandler();
    }
  });
});
