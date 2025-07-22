enum Gender {
  Male,
  Female
}
// 加了等号才有值，否则就是从0开始的数字
enum Gender2 {
  'Male' = 0 << 1,
  'Female' = 2 << 2
}

enum Gender3 {
  Male = 'Male',
  Female = 'Female'
}

const g: Gender = Gender.Male;
const g2: Gender = 0;
/**
 * 这里不能写成const g3: Gender3 = 'Female'
 * 字符串枚举类型只能赋值为枚举成员（如 Gender3.Female），不能直接赋值为字符串字面量（如 'Female'）。
*/


const g3: Gender3 = Gender3.Female;

type Gender4 = 'Male' | 'Female'