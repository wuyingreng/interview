
import nm from 'node:module';

const {isBuiltin}=nm;

console.log('createRequire==>',nm.createRequire(import.meta.url));
console.log('isBuiltin==>',isBuiltin('path'));
console.log('isBuiltin==>',isBuiltin('node:path'));
console.log('isBuiltin==>',isBuiltin('aa'));