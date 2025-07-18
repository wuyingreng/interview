ajax({
  type: 'GET',
  url: 'http://localhost:3000/posts',
  timeout: 1000,
  success: data => {
    console.log('success', data);
  },
  error: err => {
    console.log('error', err);
  },
});
