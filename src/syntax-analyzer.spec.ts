import { ProgramParser } from './program.parser';
import { SyntaxAnalyzer } from './syntax-analyzer';

describe('SyntaxAnalyzer', () => {
  it('should collect all the variables used in the expression', () => {
    const expression = '$a + $b * -$c';
    const parser = new ProgramParser(expression);
    const syntaxAnalyzer = new SyntaxAnalyzer(parser.parse());
    syntaxAnalyzer.analyze();

    expect(syntaxAnalyzer.getVariableStack()).toEqual(['$a', '$b', '$c']);
  });

  it('should analyze syntax tree with simple function call', () => {
    const expression = 'foo()';
    const parser = new ProgramParser(expression);
    const syntaxAnalyzer = new SyntaxAnalyzer(parser.parse());
    expect(() => syntaxAnalyzer.analyze()).not.toThrow();
  });

  it('should analyze syntax tree with nested function call', () => {
    const expression = 'foo(bar())';
    const parser = new ProgramParser(expression);
    const syntaxAnalyzer = new SyntaxAnalyzer(parser.parse());
    expect(() => syntaxAnalyzer.analyze()).not.toThrow();
  });

  it('should analyze syntax tree with trailing comma in function parameters', () => {
    const expression = 'foo(1,2,3,)';
    const parser = new ProgramParser(expression);
    const syntaxAnalyzer = new SyntaxAnalyzer(parser.parse());
    expect(() => syntaxAnalyzer.analyze()).not.toThrow();
  });

  it('should analyze syntax tree with multiple function call', () => {
    const expression = 'foo(bar(), baz()) + bar() + baz()';
    const parser = new ProgramParser(expression);
    const syntaxAnalyzer = new SyntaxAnalyzer(parser.parse());
    expect(() => syntaxAnalyzer.analyze()).not.toThrow();
  });
});
