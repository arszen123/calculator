import { ParserError } from './errors';
import { Lexer } from './lexer';
import { Token, TokenType } from './types/lexer.type';
import { ASTNode } from './node';

export abstract class Parser {
  constructor(protected readonly lexer: Lexer) {}

  protected eat(tokenType?: TokenType): Token {
    const tokenTypeToEat = tokenType || this.lexer.getToken().type;
    if (!this.isCurrentTokenType(tokenTypeToEat)) {
      this.error(tokenTypeToEat);
    }
    const res = this.lexer.getToken();
    this.lexer.next();

    return res;
  }

  abstract parse(): ASTNode;

  protected isCurrentTokenType(tokenType: TokenType): boolean {
    return this.lexer.getToken().type === tokenType;
  }

  protected error(tokenType: TokenType): asserts tokenType {
    const currentToken = this.lexer.getToken();
    throw new ParserError(
      `Syntax error: token with type "${String(tokenType)}" is expected, got "${String(currentToken.type)}"!`,
    );
  }
}
