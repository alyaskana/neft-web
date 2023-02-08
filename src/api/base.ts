import axios, { AxiosRequestConfig, AxiosError } from "axios";

import { stringify } from "@/utils/stringify";

const _fetcher = axios.create({
  baseURL: "https://localhost:3000" + "/api",
  withCredentials: true,
});

// _fetcher.interceptors.response.use(undefined, async (error: AxiosError) => {
//   if (error.response?.status == 401) {
//     window.location.href = "/auth/login";
//   }

//   return Promise.reject(error);
// });

type TGetParams = {
  path: string;
  params?: Record<string, string | number | undefined | boolean>;
  headers?: Record<string, string>;
};

type TPostParams = {
  path: string;
  params?: Record<string, string | number | unknown> | FormData;
  headers?: AxiosRequestConfig<any>;
};

export class API {
  fetcher = _fetcher;

  get<R>({ path, params = {}, headers = {} }: TGetParams) {
    return this.fetcher.get<R>(`${path}?${stringify(params)}`, {
      headers: {
        ...headers,
      },
    });
  }

  async post<R>({ path, params = {}, headers = {} }: TPostParams) {
    return this.fetcher.post<R>(path, params, {
      ...headers,
    });
  }

  patch<R>({ path, params = {}, headers = {} }: TPostParams) {
    return this.fetcher.patch<R>(path, params, {
      ...headers,
    });
  }

  put<R>({ path, params = {}, headers = {} }: TPostParams) {
    return this.fetcher.put<R>(path, params, {
      ...headers,
    });
  }

  delete<R>({ path, params = {} }: TPostParams) {
    return this.fetcher.delete<R>(path, { data: params });
  }
}

export const fetcher = new API();
