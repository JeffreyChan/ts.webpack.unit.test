import { IMathWidget, MathWidget } from "../src/math.widget";
import { assert, expect } from "chai";
import { polyfill } from "es6-promise";

describe("Math Widget Test Suite \n", () => {
  const mathWidget: IMathWidget = new MathWidget();
  before(() => {
    polyfill();
  });

  it("Math PI Unit Test \n", () => {
    assert.isNumber(mathWidget.PI, "Math PI");
    assert.equal(mathWidget.PI, 3.14159265359);
  });

  it("hould return the correct numeric value for Pow \n", () => {
    var result = mathWidget.Pow(2, 3);
    var expected = 8;
    assert.isNumber(result, "Math.Pow");
    assert.equal(result, expected);
  });

  // to test asyn code we need to invoke done() when the execution is completed
  it("should return the correct numeric value for pow (async) \n", done => {
    mathWidget.PowAsync(2, 3).then(result => {
      const expected = 8;
      assert.isNumber(result, "Math.PowAsync");
      assert.equal(result, expected);
      done(); // invoke done() inside your call back or fulfilled promises
    });
  });

  // Is slow and we will get a warning
  it("should return the correct numeric value for pow (async) in slow networks\n", done => {
    mathWidget.PowAsyncSlow(2, 3).then(result => {
      const expected = 8;
      assert.isNumber(result, "Math.PowAsyncSlow");
      assert.equal(result, expected);
      done();
    });
  });

  // Is really slow and we will get a warning
  it("should return the correct numeric value for pow (async) in really slow networks\n", done => {
    mathWidget.PowAsyncReallySlow(2, 3).then(result => {
      const expected = 8;
      assert.isNumber(result, "Math.PowAsyncReallySlow");
      assert.equal(result, expected);
      done();
    });
  });

  it('should throw an exception when no parameters passed \n', () => {
    assert.throw(mathWidget.Bad);
  });
});
