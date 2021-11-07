import {
  BinOpNode, NumNode, UnaryOpNode, VarNode,
} from './node';
import { ASTNode, Visitor } from './parser';
import { TokenType } from './tokens';

export class Interpreter extends Visitor {
  // TODO: implement activation record
  constructor(
    private readonly root: ASTNode,
    private readonly activationRecord: { [key: string]: number } = {},
  ) {
    super();
  }

  interpret() {
    return this.visit(this.root);
  }

  protected visitBinOpNode(node: BinOpNode) {
    if (node.token.type === TokenType.PLUS) {
      return this.visit(node.left) + this.visit(node.right);
    }
    if (node.token.type === TokenType.MINUS) {
      return this.visit(node.left) - this.visit(node.right);
    }
    if (node.token.type === TokenType.MUL) {
      return this.visit(node.left) * this.visit(node.right);
    }
    if (node.token.type === TokenType.DIV) {
      return this.visit(node.left) / this.visit(node.right);
    }

    throw new Error('Unknown operator');
  }

  protected visitUnaryOpNode(node: UnaryOpNode) {
    if (node.token.type === TokenType.PLUS) {
      return +this.visit(node.expr);
    }
    if (node.token.type === TokenType.MINUS) {
      return -this.visit(node.expr);
    }

    throw new Error('Unknown operator');
  }

  protected visitVarNode(node: VarNode) {
    return this.activationRecord[node.token.value as string];
  }

  protected visitNumNode(node: NumNode) {
    return parseInt(node.token.value || '0', 10);
  }
}
