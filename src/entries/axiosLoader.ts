/**
 * axios utility module
 *
 * @author caias
 * @example const response = await axiosLoader.get<model>(url, { params });
 */

// dependencies
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ICustomConfig {
  ignoreSuffix?: boolean;
}

interface IAxiosLoader {
  [k: string]: <T>(
    url: string,
    config?: AxiosRequestConfig,
    customConfig?: ICustomConfig
  ) => Promise<AxiosResponse<T>>;
}

export interface IMergedConfig extends ICustomConfig, AxiosRequestConfig {}

// 에러메시지 모음
const ERROR_MSG = {
  CONNECT: '처리 중 오류가 발생하였습니다.\n잠시 후 다시 이용해 주시기 바랍니다.',
  PROGRESS: '현재 진행중입니다.',
};

// axios util set
const axiosLoader: IAxiosLoader = {
  get: (url, config, customConfig) => {
    return axiosDecorator('get', url, config, customConfig);
  },
  post: (url, config, customConfig) => {
    return axiosDecorator('post', url, config, customConfig);
  },
  put: (url, config, customConfig) => {
    return axiosDecorator('put', url, config, customConfig);
  },
  patch: (url, config, customConfig) => {
    return axiosDecorator('patch', url, config, customConfig);
  },
  delete: (url, config, customConfig) => {
    return axiosDecorator('delete', url, config, customConfig);
  },
};

// axios instance default options
const defaultInstanceConfig = {};

// axios instance
export const axiosCreate = axios.create(defaultInstanceConfig);

// axios global instance를 통한 Api 호출
function axiosDecorator(method, url, config, customConfig?) {
  // customConfig default options
  const defaultCustomConfig = {
    useLoading: false,
  };

  return axiosCreate({
    url,
    method,
    ...config,
    ...defaultCustomConfig,
    ...customConfig,
  });
}

// request 정보를 보내기전에 세팅할 로직
axiosCreate.interceptors.request.use(
  (config: IMergedConfig) => {
    const {
      url,
      method,
      data,
      headers,
      ignoreSuffix,
    } = config;

    const ajaxSuffix = '.json';

    /**
    * API url에 .json이 안붙어있다면 자동으로 추가
    */
    if (url.indexOf(ajaxSuffix) === -1 && !ignoreSuffix) {
      config.url = (url.indexOf('?') !== -1) ? url.replace('?', ajaxSuffix + '?') : url + ajaxSuffix;
    }

    if (method === 'put' || method === 'delete') {
      const headersMethod = headers || {};

      headersMethod['wmp-http-method-override'] = method;
      config.headers = headersMethod;
      config.method = 'post';
    }

    /**
    * method가 post인 경우
    * data 없을 경우 validation 통과를 위해 emtpy object 처리
    */
    if (method === 'post') {
      if (!data) { config.data = {}; }
    }

    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  },
);

// response 응답을 받기전에 세팅할 로직
axiosCreate.interceptors.response.use(
  (res: AxiosResponse) => {
    return res?.data;
  },
  (err: AxiosError) => {

    const resJson = err.response.data?.errors?.[0] || null;
    const msg = resJson.detail || ERROR_MSG.CONNECT;
    // custom error spec
    const errorSpec = {
      xhr: err.response.request,
      status: err.response.statusText || '',
      resJson,
      msg,
    };

    return Promise.reject(errorSpec);
  },
);

export default axiosLoader;
