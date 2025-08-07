
// user.mjs
const name = 'lily';
const age = 28;

export default { name, age };

// 命名导出方式1
export const name2 = 'value'
// export function func() { }
// export class MyClass { }
// 命名导出方式2。如果变量名重复是不能重复导出的
export { name2 }