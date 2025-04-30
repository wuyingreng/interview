const xhr = new XMLHttpRequest();

// true是异步的请求
xhr.open('GET', '/data/test2.json', true);

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
    } else if (xhr.status === 404) {
      console.log('404 not found')
    }
  }
}

// 因为是get请求不用发送数据，直接发送null就好了。只有send了才会触发onreadystatechange
xhr.send(null)