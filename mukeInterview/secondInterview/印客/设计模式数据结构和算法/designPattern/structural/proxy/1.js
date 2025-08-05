// 无代理的设计

// src/utils/request.js
import Http from '../http'
export function get(options) {
  return Http.get(options)
}
export function post(options) {
  return Http.post(options)
}
import { get, post } from '@/src/utils/request';


// 前端初始值，表示没有灰度类型
let grayType = -1;
async function generateImage() {
  const body = this.generateBody();
  const options = {
    url: '/getData',
    body,
    header
  };
  // 后端有返回grayType.在 grayType = res.grayType 这里设置全局的grayType
  if (grayType !== -1) options.header.grayType = grayType;

  const res = await post(options)
  if (res.grayType) {
    grayType = res.grayType
  }
  if (res?.picUrl) {
    return res?.picUrl


  }
  return null
}

