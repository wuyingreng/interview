
const xhr = new XMLHttpRequest();

// true是异步的请求
xhr.open('POST', '/login', true);

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

const postData = {
  userName: "张三",
  password: "123456"
}
// 只能发送字符串
xhr.send(JSON.stringify(postData))