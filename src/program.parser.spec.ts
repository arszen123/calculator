import { FunctionCallNode } from '.';
import {
  BinOpNode, NumNode, UnaryOpNode, VarNode,
} from './node';
import { ProgramParser } from './program.parser';
import { TokenType } from './tokens';

describe('MyParser', () => {
  it('should parse simple multiplication expression', () => {
    // 10 * 20
    const expected = new BinOpNode(
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
      { type: TokenType.MUL, value: '*' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
    );

    const parser = new ProgramParser('10 * 20');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple division expression', () => {
    // 10 / 20
    const expected = new BinOpNode(
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
      { type: TokenType.DIV, value: '/' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
    );

    const parser = new ProgramParser('10 / 20');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple addition expression', () => {
    // 10 + 20
    const expected = new BinOpNode(
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
      { type: TokenType.PLUS, value: '+' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
    );

    const parser = new ProgramParser('10 + 20');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple subtraction expression', () => {
    // 10 - 20
    const expected = new BinOpNode(
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
      { type: TokenType.MINUS, value: '-' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
    );

    const parser = new ProgramParser('10 - 20');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple negation expression', () => {
    // -10
    const expected = new UnaryOpNode(
      { type: TokenType.MINUS, value: '-' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
    );

    const parser = new ProgramParser('-10');
    const res = parser.parse() as UnaryOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple expression with unary operator', () => {
    // 10 + -20
    const expected = new BinOpNode(
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
      { type: TokenType.PLUS, value: '+' },
      new UnaryOpNode(
        { type: TokenType.MINUS, value: '-' },
        new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
      ),
    );

    const parser = new ProgramParser('10+ -20');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple power expression', () => {
    // 10 ^ 20
    const expected = new BinOpNode(
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
      { type: TokenType.POWER, value: '^' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
    );

    const parser = new ProgramParser('10 ^ 20');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple expression with with real and integer value', () => {
    // 10.15 + 20
    const expected = new BinOpNode(
      new NumNode({ type: TokenType.REAL_CONST, value: '10.15' }),
      { type: TokenType.PLUS, value: '+' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
    );

    const parser = new ProgramParser('10.15 + 20');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse complex expression', () => {
    // 10 * (20 / 2 + 30) - ((5)+55)
    const expected = new BinOpNode(
      // 10 * (20 / 2 + 30)
      new BinOpNode(
        new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
        { type: TokenType.MUL, value: '*' },
        // 20 / 2 + 30
        new BinOpNode(
          // 20 / 2
          new BinOpNode(
            new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
            { type: TokenType.DIV, value: '/' },
            new NumNode({ type: TokenType.INTEGER_CONST, value: '2' }),
          ),
          { type: TokenType.PLUS, value: '+' },
          new NumNode({ type: TokenType.INTEGER_CONST, value: '30' }),
        ),
      ),
      { type: TokenType.MINUS, value: '-' },
      // ((5)+55)
      new BinOpNode(
        new NumNode({ type: TokenType.INTEGER_CONST, value: '5' }),
        { type: TokenType.PLUS, value: '+' },
        new NumNode({ type: TokenType.INTEGER_CONST, value: '55' }),
      ),
    );

    const parser = new ProgramParser('10 * (20 / 2 + 30) - ((5)+55)');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse expression with external identifiers', () => {
    // $x + $y + $otherCustomIdentifier0
    const expected = new BinOpNode(
      new BinOpNode(
        new VarNode({ type: TokenType.VARIABLE_IDENTIFIER, value: '$x' }),
        { type: TokenType.PLUS, value: '+' },
        new VarNode({ type: TokenType.VARIABLE_IDENTIFIER, value: '$y' }),
      ),
      { type: TokenType.PLUS, value: '+' },
      new VarNode({ type: TokenType.VARIABLE_IDENTIFIER, value: '$otherCustomIdentifier0' }),
    );

    const parser = new ProgramParser('$x + $y + $otherCustomIdentifier0');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple function call', () => {
    // foo()
    const expected = new FunctionCallNode(
      { type: TokenType.IDENTIFIER, value: 'foo' },
      [],
    );

    const parser = new ProgramParser('foo()');

    expect(parser.parse()).toEqual(expected);
  });

  it('should parse nested function call', () => {
    // foo(bar())
    const expected = new FunctionCallNode(
      { type: TokenType.IDENTIFIER, value: 'foo' },
      [
        new FunctionCallNode(
          { type: TokenType.IDENTIFIER, value: 'bar' },
          [],
        ),
      ],
    );

    const parser = new ProgramParser('foo(bar())');

    expect(parser.parse()).toEqual(expected);
  });

  it('should parse simple function call with parameters', () => {
    // foo(10, 20)
    const expected = new FunctionCallNode(
      { type: TokenType.IDENTIFIER, value: 'foo' },
      [
        new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
        new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
      ],
    );

    const parser = new ProgramParser('foo(10, 20)');

    expect(parser.parse()).toEqual(expected);
  });

  it('should parse multiple nested function call with parameters', () => {
    // foo(bar(10, 20), bar(30, 40)) + baz(50, 60)
    const expected = new BinOpNode(
      new FunctionCallNode(
        { type: TokenType.IDENTIFIER, value: 'foo' },
        [
          new FunctionCallNode(
            { type: TokenType.IDENTIFIER, value: 'bar' },
            [
              new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
              new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
            ],
          ),
          new FunctionCallNode(
            { type: TokenType.IDENTIFIER, value: 'bar' },
            [
              new NumNode({ type: TokenType.INTEGER_CONST, value: '30' }),
              new NumNode({ type: TokenType.INTEGER_CONST, value: '40' }),
            ],
          ),
        ],
      ),
      { type: TokenType.PLUS, value: '+' },
      new FunctionCallNode(
        { type: TokenType.IDENTIFIER, value: 'baz' },
        [
          new NumNode({ type: TokenType.INTEGER_CONST, value: '50' }),
          new NumNode({ type: TokenType.INTEGER_CONST, value: '60' }),
        ],
      ),
    );

    const parser = new ProgramParser('foo(bar(10, 20), bar(30, 40)) + baz(50, 60)');

    expect(parser.parse()).toEqual(expected);
  });
});
