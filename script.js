"use strict";

// Math operations
const ADD = "+";
const SUB = "-";
const MUL = "x";
const DIV = "÷";

const operations = [MUL, DIV, ADD, SUB];

const operationMap = new Map();
operationMap.set(ADD, sum);
operationMap.set(SUB, subtract);
operationMap.set(MUL, multiply);
operationMap.set(DIV, divide);

function sum(...args) {
    let sum = 0;
    args.forEach(num => sum += num);
    return sum;
}

function subtract(a, b) {
    return a-b;
}

function multiply(...args) {
    let mul = 1;
    args.forEach(num => mul *= num);
    return mul;
}

function divide(a, b) {
    return a / b;
}

function operate(op, ...args) {
    return op(...args);
}


const screen = document.querySelector(".screen");
const numButtons = document.querySelector(".calculator .num-buttons");

const addButton = document.querySelector(".bt#add");
const subButton = document.querySelector(".bt#subtract");
const multiplyButton = document.querySelector(".bt#multiply");
const divideButton = document.querySelector(".bt#divide");
const equalsButton = document.querySelector(".bt#equals");

[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."].forEach(num => {
    const button = document.createElement("button");
    button.classList.add("bt", "num");
    button.textContent = num;
    numButtons.insertBefore(button, equalsButton);
    button.addEventListener("click", sendToScreen);
});

const operationButtonsArr = [addButton, subButton, multiplyButton, divideButton];
let numOfOperationsEntered = 0;
operationButtonsArr.forEach(button => {
    button.addEventListener("click", (e) => {
        sendToScreen(e);
        if (++numOfOperationsEntered > 1) {
            calculateResult();
            numOfOperationsEntered = 0;
        }
    });
});

equalsButton.addEventListener("click", calculateResult);

const inputLine = document.querySelector(".input-line");
function sendToScreen(e) {
    if (resultLine.textContent !== "" && numOfOperationsEntered > 0) {
        clearScreen();
    }
    inputLine.textContent += e.target.textContent;
}

const resultLine = document.querySelector(".result-line");
function writeResult(str) {
    resultLine.textContent = "=" + str;
}

function calculateResult() {
    const result = parseOperation(inputLine.textContent);
    writeResult(result);
}

const clearButton = document.querySelector(".bt.utility#clear");
clearButton.addEventListener("click", clearScreen);

function clearScreen() {
    inputLine.textContent = "";
    resultLine.textContent = "";
    numOfOperationsEntered = 0;
}

const delButton = document.querySelector(".bt.utility#del");
delButton.addEventListener("click", () => {
    if (resultLine.textContent.length > 1)
        resultLine.textContent = resultLine.textContent.slice(0, -1);
});

/*
    Only works for 2 operands since this is a toy project.
*/
function parseOperation(str) {
    let i;
    let op;
    for (i = 0; i < str.length; i++) {
        if (isNaN(str[i]) && operations.includes(str[i])) {
            op = operationMap.get(str[i]);
            break;
        }
    }
    let j = str.length;
    if (isNaN(str[j - 1]) && operations.includes(str[j - 1])) {
        j--;
    }
    const operandA = +str.slice(0, i);
    const operandB = +str.slice(i + 1, j);
    const result = op(operandA, operandB);
    inputLine.textContent = j === str.length - 1 ? result + str[j] : inputLine.textContent;
    return result;
}
