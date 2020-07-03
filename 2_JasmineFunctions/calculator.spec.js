// describe is a global function in Jasmine which takes a string and a function as its parameters
describe('Test Suite for Calculator', function () {
    // xit is used to disable the specs from execution and to disable the suite, we will use xdescribe
    xit('should have correct webPage title', function () {
        expect(document.title).toBe("Programming Jasmine | Functions");
    });

    it('should initialize the Constructor ', function () {
        const calc1 = new Calculator();
        const calc2 = new Calculator();
        expect(calc1).toBeTruthy();
        expect(calc2).toBeTruthy();
        expect(calc1).toEqual(calc2); // Refer to URL :- https://jasmine.github.io/api/3.5/matchers.html
    });

    it('should have unique objects', () => {
        const calc1 = new Calculator();
        const calc2 = new Calculator();
        expect(calc1).not.toBe(calc2);
    });

    it('should have operations', () => {
        const calc1 = new Calculator();
        expect(calc1.add).not.toBeUndefined();
        expect(calc1.subtract).toBeDefined();
    });


    it('should have operations', () => {
        const calc1 = new Calculator();
        expect(calc1.add).not.toBeUndefined();
        expect(calc1.subtract).toBeDefined();
    });

    it('should override the total', function () {
        const calc = new Calculator();
        calc.total = null;
        expect(calc.total).toBeNull();
    });

    it('should add value to total', function () {
        const calc = new Calculator();
        calc.add(100);
        expect(calc.total).toBe(100);
    });

    it('should subtract value from total', function () {
        const calc = new Calculator();
        calc.total = 50
        calc.subtract(25);
        expect(calc.total).toBe(25);
    });

    it('should handle NaN', function () {
        const calc = new Calculator();
        calc.total = 50;
        calc.subtract('DummyValue');
        //console.log('should handle NaN >> Total val :: ' + calc.total);
        expect(calc.total).toBeNaN();
    });

    it('should return total value', () => {
        const calc = new Calculator();
        calc.total = 10;
        expect(calc.add(10)).toBe(20);
        expect(calc.total).toMatch(/-?\d+/);
        expect(typeof calc.total).toMatch('number');
        expect(calc.total).toEqual(jasmine.anything());
    });

    it('should check Calculator Object with Custom Mather', () => {
        jasmine.addMatchers(calculatorCustoMatcher);
        const calc = new Calculator();
        expect(calc).toBeCalculator();
    });
});
