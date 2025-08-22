/**
 * 红灯3秒亮一次，绿灯2秒亮一次，黄灯1秒亮一次;如何让三个灯不断交替重复亮灯?
 * */

const red = () => {
  console.log('red', new Date());
};

const green = () => {
  console.log('green', new Date());
};


const yellow = () => {
  console.log('yellow', new Date());
};

const light = (cb, time) => {
  return new Promise((resolve, reject) => {
    cb();
    setTimeout(() => {
      resolve()
    }, time);
  })

};


const steps = () => Promise.resolve().then(() => {
  /**
   * 要加return ,不加就很快的执行，起不到暂停的效果。想想源码，是返回值是promise才会等待promise resolve 继续then
   * 否则就是同步resolve
  * 
   * */ 
  return light(red, 3000)
}).then(() => {
  return light(green, 2000)
}).then(() => {
  return light(yellow, 1000)
}).then(()=>{
  steps();
})
steps()