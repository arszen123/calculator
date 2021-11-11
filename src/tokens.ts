import { TokenDefinition } from './parser';

export const TokenType = {
  NUMBER: 'NUMBER',
  PLUS: 'PLUS',
  MINUS: 'MINUS',
  MUL: 'MUL',
  DIV: 'DIV',
  POWER: 'POWER',
  REAL_CONST: 'REAL_CONST',
  INTEGER_CONST: 'INTEGER_CONST',
  IDENTIFIER: 'IDENTIFIER',
  VARIABLE_IDENTIFIER: 'VARIABLE_IDENTIFIER',
  COMMA: 'COMMA',
  LPAR: 'LPAR',
  RPAR: 'RPAR',
};

export type TokenTypes = keyof typeof TokenType;

export const tokenDefinitions: TokenDefinition[] = [
  {
    type: TokenType.REAL_CONST,
    matcher: /(\d+\.\d+)/,
  },
  {
    type: TokenType.INTEGER_CONST,
    matcher: /(\d+)/,
  },
  {
    type: TokenType.IDENTIFIER,
    matcher: /[a-zA-Z_][a-zA-Z0-9_]*/,
  },
  {
    type: TokenType.VARIABLE_IDENTIFIER,
    matcher: /\$[a-zA-Z_][a-zA-Z0-9_]*/,
  },
  {
    type: TokenType.COMMA,
    matcher: ',',
  },
  {
    type: TokenType.MINUS,
    matcher: '-',
  },
  {
    type: TokenType.PLUS,
    matcher: '+',
  },
  {
    type: TokenType.LPAR,
    matcher: '(',
  },
  {
    type: TokenType.RPAR,
    matcher: ')',
  },
  {
    type: TokenType.MUL,
    matcher: '*',
  },
  {
    type: TokenType.DIV,
    matcher: '/',
  },
  {
    type: TokenType.POWER,
    matcher: '^',
  },
];
