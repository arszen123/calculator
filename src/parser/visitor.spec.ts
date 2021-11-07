/* eslint-disable max-classes-per-file */
import { ASTNode } from './node';
import { Visitor } from './visitor';

class TestVisitor extends Visitor {
  visitNode(node: ASTNode) {
    this.visit(node);
  }

  visitTestNode() {}
}

class TestNode extends ASTNode {}
class TestNotExistingNode extends ASTNode {}

describe('Visitor', () => {
  let visitor: TestVisitor;

  beforeEach(() => {
    visitor = new TestVisitor();
  });

  it('should visit a node', () => {
    jest.spyOn(visitor, 'visitTestNode');

    const node = new TestNode({ type: 'test', value: 'test' });
    visitor.visitNode(node);

    expect(visitor.visitTestNode).toBeCalledWith(node);
  });

  it('should fail when the visitor not defined', () => {
    jest.spyOn(visitor, 'visitTestNode');

    const node = new TestNotExistingNode({ type: 'test', value: 'test' });
    expect(() => visitor.visitNode(node)).toThrowError(
      'No visitor defined for TestNotExistingNode',
    );
    expect(visitor.visitTestNode).not.toBeCalled();
  });
});
