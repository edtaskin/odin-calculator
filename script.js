// Also does subtraction
function add(a, b) {
    return a + b;
}

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

// TODO Will it be necessary?
// function assertNumberInput(...args) {
//     args.forEach(x => {
//         if (typeof x !== "number")
//             return false;
//     });
//     return true;
// }