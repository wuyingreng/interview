// 代理模式
// scene
// 网络请求封装 暴露get post

// src/utils/request.js

import Http from './http';

export function get(options) {
  return Http.get(options);
}

export function post(options) {
  return Http.post(options);
}

// 获取图片地址
import { post, get } from '@src/utils/request.js';
import { config } from 'cypress/types/bluebird';

async function generateShareImage() {
  const body = this.generateConfig();
  try {
    const res = await post({
      url: 'getImage',
      body,
      setting: {
        // domain: config.
      },
    });

    if (res?.picUrl) {
      return res;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// graytype 后面请求当中 graytype 放入headers

let graytype = -1;
async function generateShareImage() {
  const body = this.generateConfig();
  try {
    const options = {
      url: '/getData',
      body,
      setting: {
        // domain: config.
      },
      headers: {},
    };

    if (graytype !== -1) {
      options.headers.graytype = graytype;
    }

    const res = await post(options);

    if (res.graytype) {
      graytype = res.graytype;
    }

    if (res?.picUrl) {
      return res;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// 优化
// 代理模式
// 对原有对象进行扩展 从而实现对原有对象的控制或者额外的操作

// src/utils/requestNew.js
import { post as Post, get as Get } from './request';

const getNewParams = (params) => {
  let newParams;
  if (graytype !== -1) {
    newParams = {
      ...params,
      header: {
        ...params.headers,
        graytype,
      },
    };
  }

  return newParams;
};
// 代理模式
export const get = async (params) => {
  const response = await Get(getNewParams(params));

  const res = response.data;

  if (res.graytype) {
    graytype = res.graytype;
  }

  return response;
};

export const post = async (params) => {
  const response = await Post(getNewParams(params));

  const res = response.data;

  if (res.graytype) {
    graytype = res.graytype;
  }

  return response;
};

export const requestAjax = async (params, method = 'Get') => {
  const response = await method(getNewParams(params));

  const res = response.data;

  if (res.graytype) {
    graytype = res.graytype;
  }

  return response;
};

// 总结
// 1. 不方便修改原有对象 所以只能采用代理模式包一层
// 2. 单一职责原则
