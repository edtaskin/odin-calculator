/*
function add(a, b) {
    return a + b;
}
*/

// Math operations

function sum(...args) {
    let sum = 0;
    args.forEach(num => sum += num);
    return sum;
}

function multiply(...args) {
    let mult = 1;
    args.forEach(num => mult *= num);
    return mult;
}

function divide(a, b) {
    return a / b; //TODO Test
}

function operate(op, ...args) {
    return op(...args);
}



const screen = document.querySelector(".screen");
const numButtons = document.querySelector(".calculator .num-buttons");
//const numButtonsMap = {};
[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."].forEach(num => {
    const button = document.createElement("button");
    button.classList.add("bt", "num");
    button.textContent = num;
    numButtons.appendChild(button);
    //numButtonsMap[button] = num;
    button.addEventListener("click", sendToScreen);
});

const operationButtons = document.querySelector(".calculator .operation-buttons");
console.log(operationButtons.childNodes);
Array.from(operationButtons.childNodes).forEach(button => button.addEventListener("click", sendToScreen));


function sendToScreen(e) {
    screen.textContent += "" + e.target.textContent;
}
