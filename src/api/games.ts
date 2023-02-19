import { AxiosResponse } from "axios";
import { createEffect } from "effector";
import { fetcher } from "./base";
import { TUser } from "@/types/user";
import { TPlant, TResource, TSeed, TFish, TPlot } from "@/types/game";

type TGameState = {
  plants: TPlant[];
  resources: TResource[];
  seeds: TSeed[];
  fishes: TFish[];
  plots: TPlot[];
};

export const fetchCurrentStateFx = createEffect<
  void,
  AxiosResponse<TGameState>
>(async () => {
  return await fetcher.get<TGameState>({
    path: "games/state",
  });
});
