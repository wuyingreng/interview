

import axios from 'axios';
import type {
  IRefreshAccessTokenParsedResult,
  IRefreshTokenResult,
  IResultWrapper,
} from '../../types';

let fetching = false;
let promise: null | Promise<IRefreshAccessTokenParsedResult> = null;


export const refreshAccessToken = () => {
  // 如果正在请求职就返回这个promise
  if (fetching && promise) {
    return promise;
  }
  fetching = true;
  let retryCnt = 0;

  const getNewAccessToken = () => {
    const refreshToken = cookie.get(MOZI_REFRESH_TOKEN_NAME);
    return new Promise<IRefreshAccessTokenParsedResult>((resolve) => {
      const fetch = () => {
        return axios.get<IResultWrapper<IRefreshTokenResult>>('/getRefreshToken', {
          params: { refreshToken },
        }).then((res) => {
          const { access_token, error_code = '' } = res.data?.data || {};
          if (access_token) {
            resolve({
              success: true,
              data: access_token,
            });
          } else if (ALERT_ERROR_CODES.includes(error_code)) {
            // errors user can understand and can not be fixed by relogin
            resolve({
              success: false,
              errorCode: res.data?.data?.error_code,
              errorMessage: res.data?.data?.error_description,
            });
          } else {
            redirectToMoziLogin();
          }
          fetching = false;
          // 失败了自己调用自己
        }).catch(() => {
          if (retryCnt < 3) {
            retryCnt++;
            // 失败了自己调用自己
            fetch()
          } else {
            resolve({
              success: false,
              data: ''
            })
            fetching = false
          }
        })

      }
    })

  }
  promise = getNewAccessToken();
  return promise;
}