import {
  BinOpNode, NumNode, UnaryOpNode, VarNode, FunctionCallNode,
} from './node';
import { ASTNode, Visitor } from './parser';
import { TokenType } from './tokens';

export type Package = { [key: string]: CallableFunction; };
export type Packages = { [key: string]: Package };

export class Interpreter extends Visitor {
  // TODO: implement activation record
  constructor(
    private readonly root: ASTNode,
    private readonly activationRecord: { [key: string]: number } = {},
    private readonly packages: Packages = {},
  ) {
    super();
  }

  interpret() {
    return this.visit(this.root);
  }

  protected visitFunctionCallNode(node: FunctionCallNode) {
    const args = node.args.map((arg) => this.visit(arg));

    return this.findFunction(node.token.value as string)(...args);
  }

  protected findFunction(name: string) {
    let [packageName, funcName] = name.split('.');

    if (typeof funcName === 'undefined') {
      funcName = packageName;
      packageName = 'global';
    }

    const pkg = this.packages[packageName];
    if (!pkg) {
      throw new Error(`Package ${packageName} not found`);
    }
    const func = pkg[funcName];
    if (!func) {
      throw new Error(`Function ${name} not found`);
    }

    return func;
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
    if (node.token.type === TokenType.POWER) {
      return this.visit(node.left) ** this.visit(node.right);
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
