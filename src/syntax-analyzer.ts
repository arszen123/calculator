import {
  BinOpNode, UnaryOpNode, VarNode,
} from './node';
import { ASTNode, Visitor } from './parser';

export class SyntaxAnalyzer extends Visitor {
  // TODO: improve stack
  private readonly variableStack: string[] = [];

  constructor(private readonly root: ASTNode) {
    super();
  }

  analyze(): void {
    this.visit(this.root);
  }

  getVariableStack(): string[] {
    return this.variableStack;
  }

  protected visitBinOpNode(node: BinOpNode) {
    this.visit(node.left);
    this.visit(node.right);
  }

  protected visitUnaryOpNode(node: UnaryOpNode) {
    this.visit(node.expr);
  }

  protected visitVarNode(node: VarNode) {
    this.variableStack.push(node.token.value as string);
  }

  protected visitNumNode() {
    // do nothing
  }
}
