import { createEvent, createStore, sample } from "effector";
import { LoginData, userLoginFx, checkLogedInFx } from "@/api/user";
import { TUser } from "@/types/user";

export const $user = createStore<TUser | null>(null);
export const $isLogged = $user.map((user) => user !== null);

export const loginSubmitted = createEvent<LoginData>();
export const appMounted = createEvent();

sample({
  clock: loginSubmitted,
  target: userLoginFx,
});

$user.on([userLoginFx.doneData, checkLogedInFx.doneData], (_, response) => {
  if (response?.status === 200) {
    return response.data;
  }
  return undefined;
});

sample({
  clock: appMounted,
  target: checkLogedInFx,
});
