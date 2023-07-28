"use strict";

/*
function add(a, b) {
    return a + b;
}
*/

// Math operations
const ADD = "+";
const SUB = "-";
const MUL = "x";
const DIV = "÷";

const operationsByPrecedence = [MUL, DIV, ADD, SUB];

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

[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."].forEach(num => {
    const button = document.createElement("button");
    button.classList.add("bt", "num");
    button.textContent = num;
    numButtons.appendChild(button);
    button.addEventListener("click", sendToScreen);
});

const addButton = document.querySelector(".bt#add");
const subButton = document.querySelector(".bt#subtract");
const multiplyButton = document.querySelector(".bt#multiply");
const divideButton = document.querySelector(".bt#divide");
const equalsButton = document.querySelector(".bt#equals");

const operationButtonsArr = [addButton, subButton, multiplyButton, divideButton];
operationButtonsArr.forEach(button => {
    button.addEventListener("click", sendToScreen);
});

equalsButton.addEventListener("click", () => {
    if (!assertValidOperation(screen.textContent))
        sendToScreen("INVALID OPERATION");
    else {
        const result = parseOperation(screen.textContent);
        writeResult(result);
    } 
});

function sendToScreen(e) {
    screen.textContent += e.target.textContent;
}

function writeResult(str) {
    // TODO Write in a new line and in bigger font
    screen.textContent += "=" + str;
}

function assertValidOperation(str) {
    //TODO
    let isValid = true;

    return isValid;
}

/*
    Split the string representing the math expression iteratively for each math operation, for which we replace the operation with its result.
    Inefficient for repeated operations of same type, but will not be fixed, since this a toy project.
*/
function parseOperation(str) {
    for (let op of operationsByPrecedence) {
        console.log(`Looking for ${op} in ${str}`);
        while (str.includes(op)) { // TODO Infinite loop
            const opIndex = str.indexOf(op);
            let splitted = [str.slice(0, opIndex), str.slice(opIndex + 1)];
            console.log("----------");
            console.log(splitted);
            let operandA = +getSliceUntilSign(splitted[0], false);
            console.log("a: " + operandA);
            let operandB = +getSliceUntilSign(splitted[1], true);
            console.log("b: " + operandB);
    
            const subResult = operationMap.get(op)(operandA, operandB);
            console.log("subresult: " + subResult);
    
            splitted.splice(opIndex-1, 2, getSliceUntilSign(splitted[0], true, true) + subResult + getSliceUntilSign(splitted[1], false, true));
            console.log(splitted);
            str = splitted.join("");
        }
    }
    return str;
}

const getSliceUntilSign = (str, fromLeft, includeSign=false) => {
    let slicedStr = "";
    if (fromLeft) {
        let i = 0;
        while (!operationsByPrecedence.includes(str.charAt(i))) {
            if (i > str.length) break;
            slicedStr += str.charAt(i++);
        }
        if (includeSign)
            slicedStr += str.charAt(i);
    }
    else {
        let i = str.length - 1;
        while (!operationsByPrecedence.includes(str.charAt(i))) {
            if (i < 0) break;
            slicedStr = str.charAt(i--) + slicedStr;
        }
        if (includeSign)
            slicedStr = str.charAt(i) + slicedStr;
    }

    console.log(`Sliced ${slicedStr} from ${str}`);
    return slicedStr;
}