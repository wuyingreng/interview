import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { IlogApi } from '../types';

const toQuerystring = (params: Record<string, string> = {}) => {
  return new URLSearchParams(params).toString();
};

export const successInterceptor = (response: AxiosResponse, debug: boolean, logApi?: IlogApi) => {
  const { config, data, status, headers } = response;
  const { baseURL: baseUrl = '', url, method, params, __startTime } = config || {};
  const { data: innerData, errorCode, errorMessage, success, traceId } = data || {};

  if (debug) {
    // eslint-disable-next-line no-console
    console.log(
      `%c [Lzddt Request: ${baseUrl}${url}]: `,
      `color: ${success ? '#75D686' : '#EF3534'}`,
      params,
      data,
    );
  }

  if (!logApi) return data;
  logApi(
    {
      api: `${baseUrl}${url}`,
      httpCode: status,
      success:
        status >= 200 && status < 300 && success && innerData !== undefined && innerData !== null,
      errCode: errorCode,
      msg: errorMessage,
      traceId: traceId || headers?.['eagleeye-traceid'] || headers?.['x-eagleeye-id'],
      requestType: 'xhr',
      method: (method || 'get').toUpperCase(),
      params: method === 'get' ? toQuerystring(params) : JSON.stringify(params),
      time: __startTime && Date.now() - __startTime,
    },
    response,
  );

  return data;
};

export const errorInterceptor = (error: AxiosResponse, debug: boolean, logApi: any) => {
  const { data, config, headers } = error || {};
  const { baseURL: baseUrl = '', url = 'networkError', params = 'unknown' } = config || {};
  const { errorMessage, errorCode } = data || {};

  if (debug) {
    // eslint-disable-next-line no-console
    console.log(`%c [Lzddt Request: ${baseUrl}${url}]: `, `color: '#EF3534'`, params, data);
  }

  if (!logApi) return data;
  logApi(
    {
      api: `${baseUrl}${url}`,
      success: false,
      errCode: errorCode,
      msg: errorMessage,
      traceId: headers?.['eagleeye-traceid'] || headers?.['x-eagleeye-id'],
    },
    error,
  );

  return data;
};

export const setStartTimeInterceptor = (config: InternalAxiosRequestConfig) => {
  return {
    ...config,
    __startTime: Date.now(),
  };
};

// responseType is AxiosResponse
export const successFormatInterceptor = (response: any, isMock?: boolean) => {
  // `response.data` is what the server responded.
  const { data } = response;
  // transfer to json obj
  let jsonData = data;
  if (typeof data === 'string') {
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      // response data is not a valid json string, could be other reponseType, return the origin data.
      jsonData = {
        data,
      };
    }
  }
  if (response?.config?.responseType === 'blob') {
    jsonData = {
      data,
    };
  }
  const { data: innerData } = jsonData || {};
  // Mock api always success
  const isSuccess = isMock || response.status === 200;
  // `data.data` might be `null` in some case, here explicitly set it to `undefined` in
  // such cases to make it convenient to set default values for destructuring assignment.
  if (innerData === null) {
    return {
      ...response,
      data: {
        success: isSuccess,
        ...jsonData,
        data: undefined,
      },
    };
  }
  return isMock
    ? {
      success: isSuccess,
      ...jsonData,
    }
    : {
      ...response,
      data: {
        success: isSuccess,
        ...jsonData,
      },
    };
};

export const errorFormatInterceptor = (error: any, wrapInData = true) => {
  // always resolve
  const commonErrorObj = {
    success: false,
    errorCode: error?.code || '-1',
    errorMessage:
      typeof error === 'string' || typeof error === 'number'
        ? error
        : error.errorMessage || error.message || 'request has been rejected',
  };
  return wrapInData
    ? {
      ...error,
      data: commonErrorObj,
    }
    : {
      ...error,
      ...commonErrorObj,
    };
};

export const getParamStr = (data: Record<string, any>, paramStringify = true) => {
  return Object.entries(data)
    .filter(([, val]) => val !== undefined)
    .reduce((obj, [key, val]) => {
      let strVal = val;
      if (val instanceof Object && paramStringify) {
        strVal = JSON.stringify(val);
      }
      return { ...obj, [key]: strVal };
    }, {});
}; 