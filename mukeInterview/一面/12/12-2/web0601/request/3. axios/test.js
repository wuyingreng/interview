const axios = require('axios');

axios
  .get('http://localhost:3000/posts')
  .then(function (response) {
    // handle success
    console.log('response==>', response, 'response data==>', response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
