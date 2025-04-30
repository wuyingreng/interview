function fn() {
    console.log('fn')
}
const name = 'b'

export {  // 注意这里不能有 default ！！！
    fn,
    name
}

export default {
    fn,name
}