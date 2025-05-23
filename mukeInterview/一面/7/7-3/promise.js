const url1 = '/data1.json';
const url2 = '/data2.json';
const url3 = '/data3.json';

function getData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

// 管道形式
getData(url1).then((data1) => {
  console.log('data1==>', data1)
  return getData(url2)
}).then((data2) => {
  console.log('data2==>', data2);
  return getData(url3)
}).then((data3) => {
  console.log('data3==>', data3);

}).catch(err => console.error(err))