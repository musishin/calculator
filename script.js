const buttons = document.querySelectorAll('.calc-button');
const display = document.querySelector('#display-div');
const topDisplay = document.querySelector('#top-display-div');
let opString = "+-*/";
let fullEquation = "";
let var1 = 0;
let var2 = 0;
let operator = "";
let lastBtnClicked = "";

// Adds eventlistener to all buttons and calls necessary functions based on display
for(const button of buttons) {
    button.addEventListener('click', (e) => {
        if(e.target.id === 'c-btn' || e.target.id === 'ac-btn') {
            reset();
            lastBtnClicked = "c";
        }
        else if(e.target.id === 'bs-btn') {
            if(display.textContent.substring(display.textContent.length - 1) === " ") {
                display.textContent = display.textContent.
                    substring(0, display.textContent.length - 3);
                topDisplay.textContent = display.textContent.
                    substring(0, topDisplay.textContent.length - 3);
            }
            else {
                display.textContent = display.textContent.
                    substring(0, display.textContent.length - 1);
                topDisplay.textContent = display.textContent.
                    substring(0, topDisplay.textContent.length - 1);
            }

            if(display.textContent === "-" || display.textContent === ".") {
                display.textContent = "";
                topDisplay.textContent = "";
            }
            lastBtnClicked = "bs";
        }
        else if(e.target.id === 'equal-btn') {
            let topDisplayArray = topDisplay.textContent.split(" ");
            if(topDisplayArray[topDisplayArray.length - 1] === "" || topDisplayArray.length < 3) {
                return;
            }
            else {
                equalEval();
            }
            lastBtnClicked = "equal";
        }
        else if(e.target.className.includes('op-btn')) {
            let displayArray = display.textContent.split(" ");
            if(opString.includes(displayArray[displayArray.length - 1])) {
                return;
            }
            else {
                opEval(e);
            }
            lastBtnClicked = "op";
        }
        else if(e.target.className.includes('dec-btn')) {
            if(display.textContent.includes(".")) {
                return;
            }
            else {
                display.textContent += e.target.textContent;
                topDisplay.textContent += e.target.textContent;
            }
            lastBtnClicked = "dec";
        }
        else if(e.target.className.includes('neg-btn')) {
            let topDisplayArray = topDisplay.textContent.split(" ");
            topDisplay.textContent = "";
            if(lastBtnClicked === "equal" || lastBtnClicked === "op" || lastBtnClicked === "neg") {
                if(display.textContent.includes("-")) {
                    topDisplay.textContent = display.textContent.substring(1);
                    display.textContent = display.textContent.substring(1);
                }
                else {
                    topDisplay.textContent = "-" + display.textContent;
                    display.textContent = "-" + display.textContent;
                }
            }
            else if(display.textContent.includes("-")) {
                display.textContent = display.textContent.substring(1);
                topDisplayArray[topDisplayArray.length - 1] = String(topDisplayArray[topDisplayArray.length - 1]).substring(1);
            }
            else {
                display.textContent = "-" + display.textContent;
                topDisplayArray[topDisplayArray.length - 1] = "-" + String(topDisplayArray[topDisplayArray.length - 1]);
                for(index = 0; index < topDisplayArray.length; index++) {
                    topDisplay.textContent += " " + String(topDisplayArray[index]);
                }
            }
            lastBtnClicked = "neg";
        }
        else {
            let displayArray = display.textContent.split(" ");
            let topDisplayArray = topDisplay.textContent.split(" ");
            if(String(displayArray[0]).length > 9 && lastBtnClicked === "num") {
                alert('Numbers can only be 10 digits long!');
                return;
            }
            else if(topDisplay.textContent.length > 37) {
                alert('Character limit reached!');
                return;
            }
            else if(opString.includes(topDisplayArray[topDisplayArray.length - 2]) && lastBtnClicked === "op") {
                display.textContent = "";
                display.textContent += e.target.textContent;
                topDisplay.textContent += e.target.textContent;
            }
            else if(lastBtnClicked === "equal") {
                display.textContent = e.target.textContent;
                topDisplay.textContent = e.target.textContent;
            }
            else {
                display.textContent += e.target.textContent;
                topDisplay.textContent += e.target.textContent;
            }
            lastBtnClicked = "num";
        }
    });
}


// Operation functions
function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    return Number(num1) / Number(num2);
}

function operate(num1, num2, operator) {
    let answer = 0;
    if(operator === '+') {
        answer = add(num1, num2);
    }
    else if(operator === '-') {
        answer = subtract(num1, num2);
    }
    else if(operator === '*') {
        answer = multiply(num1, num2);
    }
    else {
        answer = divide(num1, num2);
    }
    return answer;
}

function reset() {
    display.textContent = "";
    topDisplay.textContent = "";
    operator = "";
    var1 = 0;
    var2 = 0;
}

// These two functions evaluate the equations and determine what to display.
// opEval is for when a second operator is clicked.
// equalEval is for when the equals button is clicked.
function opEval(e) {
    let topDisplayArray = topDisplay.textContent.split(" ");
    if(lastBtnClicked === "equal") {
        topDisplay.textContent += " " + e.target.textContent + " ";
        display.textContent = "";
    }
    else if(topDisplayArray[2] === "") {
        return;
    }
    else if(topDisplayArray.length === 3) {
        topDisplay.textContent += " " + e.target.textContent + " ";
        var1 = topDisplayArray[topDisplayArray.length - 3];
        var2 = topDisplayArray[topDisplayArray.length - 1];
        operator = topDisplayArray[topDisplayArray.length - 2];
        var1 = operate(var1, var2, operator);
        operator = e.target.textContent;
        display.textContent = var1;
    }
    else if(topDisplayArray.length > 3) {
        topDisplay.textContent += " " + e.target.textContent + " ";
        var2 = display.textContent;
        operator = topDisplayArray[topDisplayArray.length - 2];
        var1 = operate(var1, var2, operator);
        display.textContent = var1;
    }
    else {
        topDisplay.textContent += " " + e.target.textContent + " ";
        operator = e.target.textContent;
        var1 = topDisplayArray[0];
        display.textContent = "";
    }
}

function equalEval() {
    let topDisplayArray = topDisplay.textContent.split(" ");
    var1 = operate(var1, topDisplayArray[topDisplayArray.length - 1], topDisplayArray[topDisplayArray.length - 2]);
    display.textContent = var1;
}