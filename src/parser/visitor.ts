import { ASTNode } from './node';

type ClassWithVisitFunctions = { [key: `visit${string}`]: (node: ASTNode) => any };

export abstract class Visitor {
  protected visit(node: ASTNode): any {
    const visitor = (this as unknown as ClassWithVisitFunctions)[`visit${node.constructor.name}`];
    if (visitor) {
      return visitor.call(this, node);
    }
    throw new Error(`No visitor defined for ${node.constructor.name}`);
  }
}
