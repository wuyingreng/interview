// 代理模式
// src/utils/request.js
import Http from '../http'
export function get(options) {
  return Http.get(options)
}
export function post(options) {
  return Http.post(options)
}
import { get, post } from '@/src/utils/request';

const getNewParams = (params) => {
  let newParams;
  //有grayType
  if (grayType !== -1) {
    newParams = {
      header: {
        ...params.header,
        grayType
      }
    }
    return newParams
  }
}


const grayTypeGet = async (params) => {
  const res = await ge(getNewParams(params))
  if (res.grayType) {
    grayType = res.grayType;
  }
  return res;
}