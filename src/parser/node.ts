import { Token } from './types/lexer.type';

export class ASTNode {
  constructor(readonly token: Token) {
  }
}
