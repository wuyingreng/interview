async function fn() {
  const res1 = await request(1);//1秒后 输出 2
  const res2 = await request(res1);//2秒后输出 4
  console.log(res2)
}
fn()

const fn2 = async () => {
  throw new Error('error')
}