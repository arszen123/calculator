import { MyParser } from './program.parser';
import { SyntaxAnalyzer } from './syntax-analyzer';

describe('SyntaxAnalyzer', () => {
  it('should collect all the variables used in the expression', () => {
    const expression = '$a + $b * -$c';
    const parser = new MyParser(expression);
    const syntaxAnalyzer = new SyntaxAnalyzer(parser.parse());
    syntaxAnalyzer.analyze();

    expect(syntaxAnalyzer.getVariableStack()).toEqual(['$a', '$b', '$c']);
  });
});
