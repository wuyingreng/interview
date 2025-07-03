new Promise((resolve, reject) => {
  resolve()
}).then(() => {
  console.log('then11');
  new Promise((resolve, reject) => {
    resolve()
  }).then(() => {
    console.log('then21');
  }).then(() => {
    console.log('then22')
  })
}).then(() => {
  console.log('then12')
})