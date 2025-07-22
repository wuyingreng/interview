function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      const err = new Error(`图片加载失败${src}`);
      reject(err)
    }
  })
};

(async function () {

  const img = await loadImg('https://ww2.sinaimg.cn/mw690/005EUiO2ly1hxj8yk8u5oj30m81c37d9.jpg')
  // 如果上面抛出了错误，下面这行console.log代码就不会执行了。
  console.log('img==>', img)
})()