# Calculator

Calculator interpreter written in TypeScript.

[![License](https://badgen.net/github/license/arszen123/calculator)](https://github.com/arszen123/calculator/blob/main/LICENSE)
[![CodeFactor](https://www.codefactor.io/repository/github/arszen123/calculator/badge)](https://www.codefactor.io/repository/github/arszen123/calculator)

## Test coverage

![Coverage Statements](./badges/badge-statements.svg)
![Coverage Branches](./badges/badge-branches.svg)
![Coverage Functions](./badges/badge-functions.svg)
![Coverage Functions](./badges/badge-lines.svg)

## Description

To learn more about the grammar, see the [grammar page](./GRAMMAR.md).

## Example usage

```ts
// Import the module
import { MyParser, SyntaxAnalyzer, Interpreter } from './calculator';

// Create a new parser and build the syntax tree
const parser = new MyParser('$a * 2 + $b * 2');
const exprNode = parser.parse();

// Analyze the syntax tree
const analyzer = new SyntaxAnalyzer(exprNode);
analyzer.analyze();

// Create global activation record
const globalActivationRecord = {
  $a: 1,
  $b: 2,
};

// Create an interpreter with the syntax tree and the global activation record
const interpreter = new Interpreter(exprNode, globalActivationRecord);

// Evaluate the syntax tree
console.log(interpreter.interpret()); // 6
```
