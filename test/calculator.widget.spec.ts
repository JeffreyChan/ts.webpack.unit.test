import { assert, expect } from "chai";
import * as sinon from 'sinon';
import { polyfill } from "es6-promise";

import { IMathWidget, MathWidget } from "../src/math.widget";
import { ICalculatorWidget, CalculatorWidget } from '../src/calculator.widget';


describe("Calculator Widget Test Suite \n", () => {
  const mathWidget: IMathWidget = new MathWidget();
  const calculator:ICalculatorWidget = new CalculatorWidget(mathWidget);
  before(() => {
    polyfill();
    $("body").append('<div id="widget"/>');
  });

  beforeEach(() => {
    $("#widget").empty();
  });

  // showcases how to spy on functions to assert that a function has been invoked
  it('should invoke onSubmit when #submit.click is triggered \n', () => {

    calculator.RenderView("#widget");
    // spy on onSubmit
    var onSubmitSpy = sinon.spy(calculator, "onSubmit");

    // initialize inputs and trigger click on #submit
    $('#base').val("2");
    $('#exponent').val("3");
    $("#submit").trigger("click");

    // assert calculator.onSubmit was invoked
    expect(onSubmitSpy.called).to.equal(true);
    expect(onSubmitSpy.callCount).to.equal(1);
    expect($("#result").val()).to.equal('8');
  });

  it('onSubmit should set #result value when #submit.click is triggered \n', (done) => {

    /* // replace pow method with stub
    sinon.stub(mathWidget, "Pow", (base, exp) => {
      // assert that CalculatorWidget.onSubmit is invoking
      // math.pow with the rigth arguments
      expect(base).to.equal(2);
      expect(exp).to.equal(3);

      done();
    }); */

    sinon.stub(mathWidget, "Pow").callsFake((base,exp) => {
      expect(base).to.equal(2);
      expect(exp).to.equal(3);
      done();
    });

    // initialize inputs and trigger click on #submit

    calculator.RenderView("#widget");
    $('#base').val("2");
    $('#exponent').val("3");

    $("#submit").trigger("click");
  });
});