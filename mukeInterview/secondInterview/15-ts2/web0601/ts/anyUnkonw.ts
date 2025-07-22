let a: any = 1;
a = true;
let str: string = '1';
str.push(1);

a.push(1);
let uk: unknown = 1
uk = '1'

// 这个就是类型守卫
if (uk instanceof Array) { uk.push(1) };