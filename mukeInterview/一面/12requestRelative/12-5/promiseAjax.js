function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      console.log('xhr.readyState==>', xhr.readyState)
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 400) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send(null)
  });

  return p
}

ajax('/data/test.json').then((res) => {
  console.log('res==>', res)
}).catch((err) => {
  console.log('err==>', err)
})