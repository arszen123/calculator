import { Interpreter } from './interpreter';
import { ProgramParser } from './program.parser';

describe('Interpreter', () => {
  it('should return the correct result for a simple expression', () => {
    const parser = new ProgramParser('1 + 2 - 0');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(3);
  });

  it('should return the correct result for a complex expression', () => {
    const parser = new ProgramParser('(1 + 3 * 10 + 4 / 2) + -1 - +10');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(22);
  });

  it('should return the correct result for simple division expression', () => {
    const parser = new ProgramParser('6/3');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(2);
  });

  it('should return the correct result for simple multiplication expression', () => {
    const parser = new ProgramParser('2*3');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(6);
  });

  it('should return the correct result for simple subtraction expression', () => {
    const parser = new ProgramParser('2-3');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(-1);
  });

  it('should return the correct result for simple addition expression', () => {
    const parser = new ProgramParser('2+3');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(5);
  });

  it('should return the correct result for simple power expression', () => {
    const parser = new ProgramParser('2^3');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(8);
  });

  it('should return the correct result for simple multiplication and power expression', () => {
    const parser = new ProgramParser('10*2^3');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(80);
  });

  it('should return the correct result for complex power expression', () => {
    const parser = new ProgramParser('2^3^2');
    const interpreter = new Interpreter(parser.parse());
    const result = interpreter.interpret();

    expect(result).toBe(512);
  });

  it('should return the correct result for \'floor(10/3)\'', () => {
    const parser = new ProgramParser('floor(10/3)');
    const interpreter = new Interpreter(parser.parse(), {}, { global: { floor: Math.floor } });
    const result = interpreter.interpret();

    expect(result).toBe(3);
  });

  it('should return the correct result for \'min(floor(10/3), 10/4) + 10\'', () => {
    const parser = new ProgramParser('min(floor(10/3), 10/4) + 10');
    const interpreter = new Interpreter(
      parser.parse(),
      {},
      { global: { floor: Math.floor, min: Math.min } },
    );
    const result = interpreter.interpret();

    expect(result).toBeCloseTo(12.5);
  });
});
