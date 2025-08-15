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
  return light(red, 3000)
}).then(() => {
  return light(green, 2000)
}).then(() => {
  return light(yellow, 1000)
}).then(()=>{
  steps();
})
steps()