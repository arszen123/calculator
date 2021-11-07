/* eslint-disable max-classes-per-file */
import { ASTNode, Token } from './parser';

export class NumNode extends ASTNode {
}

export class BinOpNode extends ASTNode {
  constructor(readonly left: ASTNode, token: Token, readonly right: ASTNode) {
    super(token);
  }
}

export class UnaryOpNode extends ASTNode {
  constructor(token: Token, readonly expr: ASTNode) {
    super(token);
  }
}

export class VarNode extends ASTNode {
}
