function loadImg(src) {
  // promise接受一个参数，这个参数是个函数，这个函数有两个参数，resolve,reject。这两个参数都是函数
  const p = new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      const err = new Error(`图片加载失败${src}`);
      reject(err)
    }
    /**
     * 一旦设置了img.src 就会触发图片加载,
     * 加载成功触发onload事件，加载失败触发onerror事件
    */

    img.src = src;
  })
  return p;
}

/*---------------------   获取第一张图片不停的then,catch        ---------------------*/
const url = 'https://img2.baidu.com/it/u=3499624784,2407834498&fm=253&fmt=auto&app=138&f=JPEG?w=849&h=500';
// then是上面resolve(img)
loadImg(url).then((img) => {
  console.log('img.width==>', img.width)
  return img
}).then((img) => {
  console.log('img.height==>', img.height)
  return img
}).catch(error => {
  console.log('error==>', error)
})

/*---------------------   模拟回调地狱        ---------------------*/
const url1 = 'https://img2.baidu.com/it/u=653006313,3991244757&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067';
const url2 = 'https://img2.baidu.com/it/u=3499624784,2407834498&fm=253&fmt=auto&app=138&f=JPEG?w=849&h=500';

loadImg(url1).then((img1) => {
  console.log('img1.width==>', img1.width)
  return img1
}).then((img1) => {
  console.log('img1.height==>', img1.height);
  return loadImg(url2)
}).then((img2) => {
  // then里面可以返回一个普通对象也可以返回一个promise
  console.log('img2.height==>', img2.height);
  return img2
}).catch(error => {
  console.log('error==>', error)
})