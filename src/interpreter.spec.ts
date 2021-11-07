import { Interpreter } from './interpreter';
import { MyParser } from './program.parser';

describe('Interpreter', () => {
  it('should return the correct result for a simple expression', () => {
    const parser = new MyParser('1 + 2 - 0');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(3);
  });
  it('should return the correct result for a complex expression', () => {
    const parser = new MyParser('(1 + 3 * 10 + 4 / 2) + -1 - +10');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(22);
  });
});
