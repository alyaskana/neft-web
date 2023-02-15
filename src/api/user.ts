import { AxiosResponse } from "axios";
import { createEffect } from "effector";
import { fetcher } from "./base";
import { TUser } from "@/types/user";

export type LoginData = {
  email: string;
  password: string;
};

export const userLoginFx = createEffect<LoginData, AxiosResponse<User>>(
  async (params) => {
    return await fetcher.post<TUser>({
      path: "sessions",
      params: params,
    });
  }
);

export const checkLogedInFx = createEffect<void, AxiosResponse<TUser>>(
  async () => {
    return await fetcher.get<TUser>({
      path: "users/current",
    });
  }
);
