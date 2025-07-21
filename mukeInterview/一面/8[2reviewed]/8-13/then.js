new Promise((resolve, reject) => {
  resolve(2);
  new Promise((resolve, reject) => {
    resolve(5)
  }
  ).then((v) => {
    console.log(v);
  })
}).then((v) => { console.log(v) })


new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
    new Promise((resolve, reject) => { resolve(5) }).then((v) => {
      console.log(v);
    });
  });
}).then((v) => console.log(v));