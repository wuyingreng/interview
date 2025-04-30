const xhr = new XMLHttpRequest();
/**
 * XMLHttpRequest 支持同步和异步的请求
*/
// true是异步的请求
xhr.open('GET', '/data/test.json', true);

/**
 * 和img.onload=function(){}
 * 和img.onerror=function(){}
 * 类似
*/
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText))
      alert(xhr.responseText)
    } else {
      console.log('其他情况')
    }
  }
}

// 因为是get请求不用发送数据，直接发送null就好了。只有send了才会触发onreadystatechange
xhr.send(null)