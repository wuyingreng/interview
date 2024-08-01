const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const code = `const x=1+2`;

const ast = parser.parse(code)

console.log('ast==>', ast)



traverse(ast, {
  enter(path) {
    console.log('path.node==>', path.node);
  }
});

const output = generate(ast);
console.log('output==>', output.code);