import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IResultWrapper<T = any> {
  success: boolean;
  data?: T;
  errorCode?: string;
  errorMessage?: string;
  traceId?: string;
}

export interface IRequestConfig extends AxiosRequestConfig {
  useMock?: boolean;
  baseURL?: string;
}

export interface IRequestOption extends AxiosRequestConfig {
  baseURL?: string;
  useMock?: boolean;
  mockProjectCode?: string;
  debug?: boolean;
  logApi?: IlogApi;
  headers?: Record<string, any>;
}

export interface IlogApi {
  (logData: ILogData, response?: AxiosResponse): void;
}

export interface ILogData {
  api: string;
  httpCode?: number;
  success: boolean;
  errCode?: string;
  msg?: string;
  traceId?: string;
  requestType?: string;
  method?: string;
  params?: string;
  time?: number;
}

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    __startTime?: number;
  }
} 