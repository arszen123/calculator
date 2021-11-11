import { Interpreter } from './interpreter';
import { ProgramParser } from './program.parser';
import { SyntaxAnalyzer } from './syntax-analyzer';

describe('Integration test', () => {
  it('should return the correct result', () => {
    const globalActivationRecord = {
      $a: 1,
      $b: 2,
    };
    const parser = new ProgramParser('$a * 2 + $b * 2');
    const exprNode = parser.parse();
    const analyzer = new SyntaxAnalyzer(exprNode);
    analyzer.analyze();

    expect(analyzer.getVariableStack()).toEqual([
      '$a',
      '$b',
    ]);

    const interpreter = new Interpreter(exprNode, globalActivationRecord);

    expect(interpreter.interpret()).toEqual(6);
  });
});
