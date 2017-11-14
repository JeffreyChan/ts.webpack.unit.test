import { add } from '../src/add';
import * as chai from 'chai';

describe('test: add', () => {
  const expect = chai.expect;

  it('add two to one', () => {
    expect(add(1, 2)).equal(3);
  });

  it("add three to one, fixed" ,()=> {
    expect(add(1, 3)).equal(4);
  });
});