
const num1 = 1;

function Num(val) {
  return { val }
}


// before 对num2进行+2
const num2 = Num(2);
num2.val + 2;
console.log(num2)

// // after 对num2进行+2

const fMap = (fn, n) => {
  // 先对num2进行相加，再调用Num生成一个新的对象。而不是在原来对象上修改
  return Num(fn(n.val))
};

const addOne = x => x + 2;
const num3c = fMap(addOne, num2)

[1, 2, 3].map((v) => v + 1)

