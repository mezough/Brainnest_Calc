const display = document.getElementById('display');
const clearButton = document.getElementById('clear');
const equalsButton = document.querySelector('.equals');
const operandButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');

let firstOperand = null;
let secondOperand = null;
let operator = null;
let ResetDisplay = 0;

function handleClear() {
    display.textContent = '0';
    firstOperand = null;
    secondOperand = null;
    operator = null;
}

function handleOperandClick(event) {
    const operand = event.target.value;

    if (ResetDisplay) {
        display.textContent = operand;
        ResetDisplay = 0;
    } else {
        display.textContent = display.textContent === '0' ? operand : display.textContent + operand;
    }
}

function handleOperatorClick(event) {
    const newOperator = event.target.value;

    if (firstOperand === null) {
        firstOperand = Number(display.textContent);
    } else if (operator !== null) {
        secondOperand = Number(display.textContent);
        const result = calculateResult(firstOperand, secondOperand, operator);
        display.textContent = result;
        firstOperand = result;
        secondOperand = null;
    }

    operator = newOperator;
    ResetDisplay = 1;
}

function handleDecimalClick() {
    if (ResetDisplay) {
        display.textContent = '0.';
        ResetDisplay = 0;
        return;
    }

    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

function calculateResult(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            const result = firstOperand / secondOperand;
            return isFinite(result) ? result.toFixed(10) : 'Error';
        default:
            return null;
    }
}

clearButton.addEventListener('click', handleClear);

for (const operandButton of operandButtons) {
    operandButton.addEventListener('click', handleOperandClick);
}

for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener('click', handleOperatorClick);
}

decimalButton.addEventListener('click', handleDecimalClick);

equalsButton.addEventListener('click', () => {
    if (operator !== null) {
        secondOperand = Number(display.textContent);
        const result = calculateResult(firstOperand, secondOperand, operator);
        display.textContent = result;
        firstOperand = result;
        secondOperand = null;
        operator = null;
        ResetDisplay = 1;
    }
});
