import { AxiosResponse } from "axios";
import { createEffect } from "effector";
import { fetcher } from "./base";

export type User = {
  id: string;
  username: string;
  email: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export const userLoginFx = createEffect<LoginData, AxiosResponse<User>>(
  async (params) => {
    return await fetcher.post<User>({
      path: "sessions",
      params: params,
    });
  }
);

export const checkLogedInFx = createEffect<void, AxiosResponse<User>>(
  async () => {
    return await fetcher.get<User>({
      path: "users/current",
    });
  }
);
