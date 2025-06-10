/** 
 *  1.用数组模拟栈  方法一  push,pop
 * 2后进但是先出
 * 
 * */


const arrP = []
arrP.push(1)
arrP.push(2)

arrP.pop()

/** 
 *  1.用数组模拟栈  方法二  unshift,shift
 * 2后进但是先出
 * 
 * */
const arrS = []
arrS.unshift(1)
arrS.unshift(2)

arrS.shift()