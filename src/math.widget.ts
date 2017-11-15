export interface IMathWidget {
  PI: number;
  Pow(base: number, exponent: number);
  PowAsync(base: number, exponent: number);
  PowAsyncSlow(base: number, exponent: number);
  PowAsyncReallySlow(base: number, exponent: number);
  PowAsyncTooSlow(base: number, exponent: number);
  Bad(foo: any): void;
}

export class MathWidget implements IMathWidget {
  public PI: number;

  constructor() {
    this.PI = 3.14159265359;
  }
  
  private static Delay(ms: number) {
    return new Promise<void>(resolve => {
      setTimeout(resolve, ms);
    });
  }
  public Pow(base: number, exponent: number) {
    let result = base;
    for (let i = 1; i < exponent; i++) {
      result = result * base;
    }
    return result;
  }

  public PowAsync(base: number, exponent: number) {
    const result = this.Pow(base, exponent);
    return Promise.resolve(result);
  }

  public async PowAsyncSlow(base: number, exponent: number) {
    await MathWidget.Delay(45);
    return this.Pow(base, exponent);
  }

  public async PowAsyncReallySlow(base: number, exponent: number) {
    await MathWidget.Delay(101);
    return this.Pow(base, exponent);
  }

  public async PowAsyncTooSlow(base: number, exponent: number) {
    await MathWidget.Delay(2001);
    return this.Pow(base, exponent);
  }

  public Bad(foo: any): void {
    if (foo == null) {
      throw new Error("Error!");
    }
  }
}
