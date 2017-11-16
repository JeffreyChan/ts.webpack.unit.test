import { IMathWidget, MathWidget } from "./math.widget";

export interface ICalculatorWidget {
  onSubmit(): void;
  RenderView(elementId):void;
}

export class CalculatorWidget implements ICalculatorWidget {
  private _mathWidget: IMathWidget;
  private _txtBase: any;
  private _txtExponent: any;
  private _txtResult: any;
  private _btnCalcuator: any;

  constructor(mathWidget: IMathWidget) {
    if (mathWidget == null) throw new Error("Argument null exception!");
    this._mathWidget = mathWidget;
  }

  public RenderView(elementId) {
    $(elementId).html(this._htmlTemplate);
    this._txtBase = $("#base");
    this._txtExponent = $("#exponent");
    this._txtResult = $("#result");
    this._btnCalcuator = $("#submit");
    this._btnCalcuator.on("click", (e) => {
      this.onSubmit();
    });
  }

  public onSubmit() {
    var base = parseInt(this._txtBase.val());
    var exponent = parseInt(this._txtExponent.val());

    if (isNaN(base) || isNaN(exponent)) {
      alert("Base and exponent must be a number!");
    } else {
      this._txtResult.val(this._mathWidget.Pow(base, exponent));
    }
  }

  private _htmlTemplate: string = `
<div class="row">
  <div class="col-md-3">
      <div class="form-group">
          <label>Base</label>
          <input type="text" class="form-control" id="base" placeholder="0">
      </div>
  </div>
  <div class="col-md-3">
      <div class="form-group">
          <label>Exponent</label>
          <input type="text" class="form-control" id="exponent" placeholder="0">
      </div>
  </div>
  <div class="col-md-3">
      <div class="form-group">
          <label>Result</label>
          <input type="text" class="form-control" id="result" placeholder="1" disabled="disabled">
      </div>
  </div>
  <div class="col-md-3">
      <div class="form-group">
          <button id="submit" type="submit" class="btn btn-primary">Submit</button>
      </div>
  </div>
</div>
  `;
}
