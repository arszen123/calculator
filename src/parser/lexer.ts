import { LexerError } from './errors';
import { TokenDefinition, Token, TOKEN_TYPE_EOF } from './types/lexer.type';

export class Lexer {
  private index = 0;

  private token!: Token;

  constructor(
    private readonly tokens: TokenDefinition[],
    private readonly text: string,
  ) {
    this.next();
  }

  next(): Token {
    if (this.index >= this.text.length) {
      this.token = { type: TOKEN_TYPE_EOF, value: null };

      return this.getToken();
    }
    let matchLength = 0;
    let matchedToken: TokenDefinition | null = null;
    for (const token of this.tokens) {
      const res = this.matchToken(token, this.text.substring(this.index));
      if (res !== false) {
        matchLength = res;
        matchedToken = token;
        break;
      }
    }

    if (matchedToken === null) {
      // TODO: make errors more informative.
      throw new LexerError(`Unknown token at position: ${this.index} ${this.text.substring(this.index, this.index + 10)}...`);
    }

    const value = this.text.substring(this.index, this.index + matchLength);
    this.index += matchLength;

    this.skipWhitespaces();

    this.token = { type: matchedToken.type, value };

    return this.getToken();
  }

  getToken(): Token {
    return this.token;
  }

  protected skipWhitespaces(): void {
    while (/( |\t)/.test(this.text[this.index])) {
      this.index += 1;
    }
  }

  /**
   * @returns The matched token length or false if not matched
   */
  protected matchToken(token: TokenDefinition, str: string): number | false {
    if (typeof token.matcher === 'string') {
      if (token.matcher === str.substring(0, token.matcher.length)) {
        return token.matcher.length;
      }

      return false;
    }
    if (typeof token.matcher === 'function') {
      return token.matcher(str);
    }

    const match = new RegExp(`^${token.matcher.source}`).exec(str);
    if (match === null) {
      return false;
    }

    return match[0].length;
  }
}
