import { ICalculatorWidget, CalculatorWidget } from './calculator.widget';
import {IMathWidget, MathWidget} from './math.widget';

$(function(){
    const mathWidget:IMathWidget = new MathWidget();
    const calculator:ICalculatorWidget = new CalculatorWidget(mathWidget);
    calculator.RenderView('#widget');
});


