import {
  BinOpNode, NumNode, UnaryOpNode, VarNode,
} from './node';
import {
  Parser, Lexer, ASTNode, ParserError,
} from './parser';
import { tokenDefinitions, TokenType } from './tokens';

export class MyParser extends Parser {
  constructor(input: string) {
    super(new Lexer(tokenDefinitions, input));
  }

  parse(): ASTNode {
    return this.expression();
  }

  /**
   * grammar: **term** ((MINUS|PLUS) **term**)
   */
  protected expression(): ASTNode {
    let node = this.term();

    if (this.isCurrentTokenType(TokenType.PLUS) || this.isCurrentTokenType(TokenType.MINUS)) {
      node = new BinOpNode(node, this.eat(), this.expression());
    }

    return node;
  }

  /**
   * grammar: **factor** ((MUL|DIV) **factor**)
   */
  protected term(): ASTNode {
    let node = this.factor();

    if (this.isCurrentTokenType(TokenType.MUL) || this.isCurrentTokenType(TokenType.DIV)) {
      node = new BinOpNode(node, this.eat(), this.term());
    }

    return node;
  }

  /**
   * grammar: PLUS **factor**
   *        | MINUS **factor**
   *        | NUMBER_CONST
   *        | VARIABLE_IDENTIFIER
   *        | LPAR **expression** RPAR
   *
   */
  protected factor(): ASTNode {
    if (this.isCurrentTokenType(TokenType.PLUS)) {
      return new UnaryOpNode(this.eat(TokenType.PLUS), this.factor());
    }
    if (this.isCurrentTokenType(TokenType.MINUS)) {
      return new UnaryOpNode(this.eat(TokenType.MINUS), this.factor());
    }
    if (this.isCurrentTokenType(TokenType.REAL_CONST)) {
      return new NumNode(this.eat(TokenType.REAL_CONST));
    }
    if (this.isCurrentTokenType(TokenType.INTEGER_CONST)) {
      return new NumNode(this.eat(TokenType.INTEGER_CONST));
    }
    if (this.isCurrentTokenType(TokenType.VARIABLE_IDENTIFIER)) {
      return new VarNode(this.eat(TokenType.VARIABLE_IDENTIFIER));
    }
    if (this.isCurrentTokenType(TokenType.LPAR)) {
      let node: ASTNode | null = null;

      this.eat(TokenType.LPAR);
      node = this.expression();
      this.eat(TokenType.RPAR);

      return node;
    }

    throw new ParserError('Unknown error');
  }
}
