import {
  BinOpNode, NumNode, UnaryOpNode, VarNode, FunctionCallNode,
} from './node';
import {
  Parser, Lexer, ASTNode, ParserError,
} from './parser';
import { tokenDefinitions, TokenType } from './tokens';

export class ProgramParser extends Parser {
  constructor(input: string) {
    super(new Lexer(tokenDefinitions, input));
  }

  parse(): ASTNode {
    return this.expression();
  }

  /**
   * grammar: IDENTIFIER LPAR (**expression** (COMMA? **expression**)* COMMA?)* RPAR
   */
  protected functionCallStatement(): ASTNode {
    if (this.isCurrentTokenType(TokenType.IDENTIFIER)) {
      const id = this.eat(TokenType.IDENTIFIER);
      this.eat(TokenType.LPAR);

      const args: ASTNode[] = [];

      while (!this.isCurrentTokenType(TokenType.RPAR)) {
        args.push(this.expression());
        if (this.isCurrentTokenType(TokenType.COMMA)) {
          this.eat(TokenType.COMMA);
        }
      }

      this.eat(TokenType.RPAR);

      const node = new FunctionCallNode(id, args);

      return node;
    }

    return this.expression();
  }

  /**
   * grammar: **term** ((MINUS|PLUS) **term**)
   */
  protected expression(): ASTNode {
    let node = this.term();

    while (this.isCurrentTokenType(TokenType.PLUS) || this.isCurrentTokenType(TokenType.MINUS)) {
      node = new BinOpNode(node, this.eat(), this.term());
    }

    return node;
  }

  /**
   * grammar: **powTerm** ((MUL|DIV) **powTerm**)
   */
  protected term(): ASTNode {
    let node = this.powTerm();

    while (this.isCurrentTokenType(TokenType.MUL) || this.isCurrentTokenType(TokenType.DIV)) {
      node = new BinOpNode(node, this.eat(), this.powTerm());
    }

    return node;
  }

  protected powTerm(): ASTNode {
    let node = this.factor();

    if (this.isCurrentTokenType(TokenType.POWER)) {
      node = new BinOpNode(node, this.eat(), this.powTerm());
    }

    return node;
  }

  /**
   * grammar: PLUS **factor**
   *        | MINUS **factor**
   *        | REAL_CONST
   *        | INTEGER_CONST
   *        | VARIABLE_IDENTIFIER
   *        | LPAR **expression** RPAR
   *        | FUNCTION_CALL_STATEMENT
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
    if (this.isCurrentTokenType(TokenType.IDENTIFIER)) {
      return this.functionCallStatement();
    }

    this.error('unknown');
    throw new ParserError('unknown');
  }
}
