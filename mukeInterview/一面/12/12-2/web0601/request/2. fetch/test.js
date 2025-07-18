fetch('http://localhost:3000/posts')
  // 异步的流式返回，需要转换为json格式
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
