import axios, { Axios, AxiosResponse } from 'axios';
import {
  successInterceptor,
  errorInterceptor,
  setStartTimeInterceptor,
  errorFormatInterceptor,
  successFormatInterceptor,
} from '../utils';

import type { IResultWrapper, IRequestConfig, IRequestOption } from '../types';

export class Request {
  options: IRequestOption;
  mockBaseURL: string;
  #axiosInstance: Axios;

  constructor(options: IRequestOption) {
    this.options = options;
    const { useMock = false, mockProjectCode = '', debug = false, baseURL, logApi } = options;
    this.mockBaseURL = `https://mocks.alibaba-inc.com/mock/${mockProjectCode}/`;

    const instanceParams = {
      ...options,
      baseURL: useMock ? this.mockBaseURL : baseURL,
    };
    this.#axiosInstance = axios.create(instanceParams);

    // set start time
    this.#axiosInstance.interceptors.request.use(setStartTimeInterceptor);

    // format reponse data
    this.#axiosInstance.interceptors.response.use(
      (reponse: AxiosResponse) => successFormatInterceptor(reponse),
      errorFormatInterceptor,
    );

    // log api
    this.#axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => successInterceptor(response, debug, logApi),
      (response: AxiosResponse) => errorInterceptor(response, debug, logApi),
    );

    return this;
  }

  get<T>(url: string, config?: IRequestConfig): Promise<IResultWrapper<T>> {
    return this.#axiosInstance.get(url, this.#getCurrentRequestConfig(config));
  }

  post<T>(url: string, data: any, config?: IRequestConfig): Promise<IResultWrapper<T>> {
    return this.#axiosInstance.post(url, data, this.#getCurrentRequestConfig(config));
  }

  patch<T>(url: string, data: any, config?: IRequestConfig): Promise<IResultWrapper<T>> {
    return this.#axiosInstance.patch(url, data, this.#getCurrentRequestConfig(config));
  }

  put<T>(url: string, data: any, config?: IRequestConfig): Promise<IResultWrapper<T>> {
    return this.#axiosInstance.put(url, data, this.#getCurrentRequestConfig(config));
  }

  setHeaders(headers: any) {
    this.options.headers = headers;
  }

  #getCurrentRequestConfig(config: IRequestConfig = {}) {
    const { useMock, baseURL } = this.options;
    const finalUseMock = config.useMock !== undefined ? config.useMock : useMock;
    return {
      ...this.options,
      ...config,
      baseURL: finalUseMock ? this.mockBaseURL || '' : config.baseURL || baseURL,
    };
  }
}

// Export types for external use
export type { IResultWrapper, IRequestConfig, IRequestOption, IlogApi, ILogData } from '../types'; 