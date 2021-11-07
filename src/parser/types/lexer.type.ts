export type MatcherFunction = {
  (str: string): number | false;
};

export type TokenDefinition = {
  type: string | number | symbol;
  matcher: RegExp | string | MatcherFunction;
};

export type TokenType = string | number | symbol;

export type BaseToken = {
  type: TokenType;
  value: string;
};

export const TOKEN_TYPE_EOF = Symbol('EOF');

export type EOFToken = {
  type: typeof TOKEN_TYPE_EOF,
  value: null,
};

export type Token = BaseToken | EOFToken;
