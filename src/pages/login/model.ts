import { createEvent, createStore, sample } from "effector";
import { User, LoginData, userLoginFx, checkLogedInFx } from "@/api/user";

export const $user = createStore<User | null>(null);
export const $isLogged = $user.map((user) => user !== null);

export const loginSubmitted = createEvent<LoginData>();
export const loginPageMounted = createEvent();

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
  clock: loginPageMounted,
  target: checkLogedInFx,
});
