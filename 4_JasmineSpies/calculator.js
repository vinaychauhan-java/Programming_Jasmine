function Calculator() {
    this.total = 0;
}

// JavaScript prototype property allows you to add new properties to object constructors.
Calculator.prototype.add = function (number) {
    return this.total += number;
}

Calculator.prototype.subtract = function (number) {
    return this.total -= number;
}

function computeExpression(inputParam) {
    const expression = /\+|\-/;  // For Reference Visti :- https://regex101.com/
    const numbers = inputParam.split(expression);
    // debugger;  // Uncomment the code if you want to debug the code

    const number1 = parseInt(numbers[0]);
    const number2 = parseInt(numbers[1]);

    // The match() method retrieves the result of matching a string against a regular expression.
    // Refer:- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    const operator = inputParam.match(expression);

    if (Number.isNaN(number1) || Number.isNaN(number2) || operator === null) {
        updateCalcResult('InValid Operation/Number')
        return;
    }

    const calculator = new Calculator();
    calculator.add(number1);
    let result;
    switch (operator[0]) {
        case '+':
            result = calculator.add(number2);
            break;
        case '-':
            result = calculator.subtract(number2);
            break;
    }
    updateCalcResult(result);
}

function updateCalcResult(computedResult) {
    const element = document.getElementById('calculatorResult');
    if (element) {
        element.innerText = computedResult;
    }
}

Object.defineProperty(Calculator.prototype, 'version', {
    get: function () {
        return '0.1'
    },
    enumerable: true,
    configurable: true
})

function showVersion() {
    const calc = new Calculator();
    document.getElementById('version').innerText = calc.version;
}