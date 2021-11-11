# Grammar

```grammar
expression = term ( ( '+' | '-' ) term )*
term = powerTerm ( ( '*' | '/' ) powerTerm )*
powerTerm = factor ( '^' powerTerm )*
factor = ( '-' | '+' ) factor | real_const | integer_const | variable_identifier | '(' expression ')' | function_call_statement
real_const = DIGIT+ '.' DIGIT+
integer_const = DIGIT+
variable_identifier = '$' ( LETTER | '_' ) ( LETTER | DIGIT | '_' )*
function_call_statement = identifier '(' (expression ( ',' expression )* ','? )*  ')'
identifier = LETTER ( LETTER | DIGIT | '_' )*
```

The implemented parser can be found [here](./src/program.parser.ts).
The token types and definitions are defined in the [tokens.ts](./src/tokens.ts) file.