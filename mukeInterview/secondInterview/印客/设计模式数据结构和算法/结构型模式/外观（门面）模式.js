// 外观（门面）模式

// scene
// axios 支持Promise风格调用

axios
  .get('/api/services', {
    params: {
      ID: 111,
    },
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

axios
  .post(
    '/api/services',
    {
      ID: 111,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//   request.js

import axios from 'axios';

export const get = function (url, params) {
  return axios.get(url, { params });
};

export const post = function (url, params) {
  return axios.post(
    url,
    { params },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

import { get, post } from './request';
get('/api/services', {
  ID: 111,
}).then((res) => console.log(res));

post('/api/services', {
  ID: 111,
}).then((res) => console.log(res));

// 门面模式
// 简化调用

//
