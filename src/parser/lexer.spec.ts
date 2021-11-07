import { Lexer } from './lexer';
import { TokenDefinition, TOKEN_TYPE_EOF } from './types/lexer.type';

describe('Lexer', () => {
  let tokens: TokenDefinition[];

  beforeEach(() => {
    tokens = [
      {
        type: 'hello',
        matcher: 'Hello',
      },
      {
        type: 'world',
        matcher: (str: string) => (str.substring(0, 'world'.length) === 'world' ? 'world'.length : false),
      },
      {
        type: 'mark',
        matcher: /!$/,
      },
    ];
  });

  it('should tokenize', () => {
    const lexer = new Lexer(tokens, 'Hello world!');

    expect(lexer.getToken()).toEqual({ type: 'hello', value: 'Hello' });
    expect(lexer.next()).toEqual({ type: 'world', value: 'world' });
    expect(lexer.next()).toEqual({ type: 'mark', value: '!' });
    expect(lexer.next()).toEqual({ type: TOKEN_TYPE_EOF, value: null });

    expect.assertions(4);
  });

  it('tokenization should fail when no token is matched', () => {
    const lexer = new Lexer(tokens, 'Hello WORLD!');

    expect(lexer.getToken()).toEqual({ type: 'hello', value: 'Hello' });
    expect(() => lexer.next()).toThrow();

    expect.assertions(2);
  });

  it('should treat tab as a whitespace', () => {
    const lexer = new Lexer(tokens, 'Hello\tworld!');

    expect(lexer.getToken()).toEqual({ type: 'hello', value: 'Hello' });
    expect(lexer.next()).toEqual({ type: 'world', value: 'world' });
    expect(lexer.next()).toEqual({ type: 'mark', value: '!' });
    expect(lexer.next()).toEqual({ type: TOKEN_TYPE_EOF, value: null });

    expect.assertions(4);
  });
});
