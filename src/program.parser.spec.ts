import {
  BinOpNode, NumNode, UnaryOpNode, VarNode,
} from './node';
import { MyParser } from './program.parser';
import { TokenType } from './tokens';

describe('MyParser', () => {
  it('should parse simple multiplication expression', () => {
    // 10 * 20
    const expected = new BinOpNode(
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
      { type: TokenType.MUL, value: '*' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '20' }),
    );

    const parser = new MyParser('10 * 20');
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

    const parser = new MyParser('10 / 20');
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

    const parser = new MyParser('10 + 20');
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

    const parser = new MyParser('10 - 20');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });

  it('should parse simple negation expression', () => {
    // -10
    const expected = new UnaryOpNode(
      { type: TokenType.MINUS, value: '-' },
      new NumNode({ type: TokenType.INTEGER_CONST, value: '10' }),
    );

    const parser = new MyParser('-10');
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

    const parser = new MyParser('10+ -20');
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

    const parser = new MyParser('10 ^ 20');
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

    const parser = new MyParser('10.15 + 20');
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

    const parser = new MyParser('10 * (20 / 2 + 30) - ((5)+55)');
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

    const parser = new MyParser('$x + $y + $otherCustomIdentifier0');
    const res = parser.parse() as BinOpNode;

    expect(res).toEqual(expected);
  });
});
