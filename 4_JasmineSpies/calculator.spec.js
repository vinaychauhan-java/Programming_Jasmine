describe('Test Suite for Calculator', function () {
    let calc1;
    let calc2;

    beforeEach(function () {
        calc1 = new Calculator();
        calc2 = new Calculator();
    });

    afterEach(function () {
        // Anyting within this block will get executed
        // after each spec(it) with respec to Suite(describe) 
    });

    describe('Operation - Add', function () {
        it('should add value to total', function () {
            calc1.add(100);
            expect(calc1.total).toBe(100);
        });
    });

    describe('Operation - Subtract', () => {
        it('should subtract value from total', function () {
            calc1.total = 50
            calc1.subtract(25);
            expect(calc1.total).toBe(25);
        });
    });

    describe('Operation - Common', () => {
        it('should initialize the Constructor ', function () {
            expect(calc1).toBeTruthy();
            expect(calc2).toBeTruthy();
            expect(calc1).toEqual(calc2); // Refer to URL :- https://jasmine.github.io/api/3.5/matchers.html
        });

        it('should have unique objects', () => {
            expect(calc1).not.toBe(calc2);
        });

        it('should have operations', () => {
            expect(calc1.add).not.toBeUndefined();
            expect(calc1.subtract).toBeDefined();
        });

        it('should override the total', function () {
            calc1.total = null;
            expect(calc1.total).toBeNull();
        });

        it('should handle NaN', function () {
            calc1.total = 50;
            calc1.subtract('DummyValue');
            expect(calc1.total).toBeNaN();
        });

        it('should return total value', () => {
            calc1.total = 10;
            expect(calc1.add(10)).toBe(20);
            expect(calc1.total).toMatch(/-?\d+/);
            expect(typeof calc1.total).toMatch('number');
            expect(calc1.total).toEqual(jasmine.anything());
        });
    });

    describe('Operation - UpdateCalculatorResult ', () => {
        let element;

        beforeAll(function () {
            element = document.createElement('div');
            element.setAttribute('id', 'calculatorResult');
            document.body.appendChild(element);
        });

        afterAll(function () {
            const element = document.getElementById('calculatorResult')
            document.body.removeChild(element);
        });

        it('add results to DOM element', () => {
            updateCalcResult('5');
            expect(element.innerText).toBe('5');
        });
    });

    describe('Operation - ComputeExpression using Spy', function () {

        it('should validate the expression when first number is invalid', function () {
            spyOn(window, 'updateCalcResult').and.stub();
            computeExpression('a+1');
            expect(window.updateCalcResult).toHaveBeenCalled();
        });

        it('should validate the expression when second number is invalid', function () {
            spyOn(window, 'updateCalcResult'); // and.stub() is default and could be omitted
            computeExpression('1+a');
            expect(window.updateCalcResult).toHaveBeenCalledWith('InValid Operation/Number');
        });

        it('should validate the expression when operator is invalid', function () {
            spyOn(window, 'updateCalcResult').and.stub();
            computeExpression('1_2');
            expect(window.updateCalcResult).toHaveBeenCalledTimes(1);
        });

        it('calls add', function () {
            const spyObj = spyOn(Calculator.prototype, 'add');
            computeExpression('1+2');
            //expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
            expect(spyObj).toHaveBeenCalledTimes(2);
        });

        it('calls subtract', function () {
            const spyObj = spyOn(Calculator.prototype, 'subtract');
            computeExpression('8-5');
            expect(spyObj).toHaveBeenCalled();
            expect(spyObj).toHaveBeenCalledWith(5);
        });

        it('calls updateCalcResult (using and.callThrough)', function () {
            const spyObj = spyOn(window, 'updateCalcResult');
            spyOn(Calculator.prototype, 'add').and.callThrough();
            computeExpression('1+2');
            expect(spyObj).toHaveBeenCalled();
            expect(spyObj).toHaveBeenCalledWith(3);
        });

        it('calls updateCalcResult (using and.callFake)', function () {
            const spyObj = spyOn(window, 'updateCalcResult');
            spyOn(Calculator.prototype, 'add').and.callFake(function (number) {
                return 'Doing Addition'
            });
            computeExpression('1+2');
            expect(spyObj).toHaveBeenCalled();
            expect(spyObj).toHaveBeenCalledWith('Doing Addition');
        });

        it('calls updateCalcResult (using and.returnValue)', function () {
            const spyObj = spyOn(window, 'updateCalcResult');
            spyOn(Calculator.prototype, 'add').and.returnValue('Doing Addition');
            computeExpression('1+2');
            expect(spyObj).toHaveBeenCalled();
            expect(spyObj).toHaveBeenCalledWith('Doing Addition');
        });

        it('calls updateCalcResult (using and.returnValues)', function () {
            const spyObj = spyOn(window, 'updateCalcResult');
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'Doing Addition');
            computeExpression('1+2');
            expect(spyObj).toHaveBeenCalled();
            expect(spyObj).toHaveBeenCalledWith('Doing Addition');
        });

        it('handling errors explicitly', function () {
            spyOn(Calculator.prototype, 'add').and.throwError('Error Occured');
            expect(function () { computeExpression('1+2') }).toThrowError('Error Occured')
        });

    });

    describe('Operation - ShowVersion using Spy', function () {

        it('calls calculator.version', function () {
            spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            })
            const spyObj = spyOnProperty(Calculator.prototype, 'version', 'get')
            showVersion();
            expect(spyObj).toHaveBeenCalled();
        });

    });

});