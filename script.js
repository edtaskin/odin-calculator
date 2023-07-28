/*
function add(a, b) {
    return a + b;
}
*/
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

const numberButtons = document.querySelector(".calculator .num-buttons");
[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."].forEach(num => {
    const button = document.createElement("button");
    button.classList.add("bt", "num");
    button.textContent = num;
    numberButtons.appendChild(button);
});

// TODO Will it be necessary?
// function assertNumberInput(...args) {
//     args.forEach(x => {
//         if (typeof x !== "number")
//             return false;
//     });
//     return true;
// }