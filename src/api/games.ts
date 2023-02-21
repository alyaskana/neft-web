import { AxiosResponse } from "axios";
import { createEffect } from "effector";
import { fetcher } from "./base";
import { TPlant, TResource, TSeed, TFish, TPlot, TWallet } from "@/types/game";

type TGameState = {
  plants: TPlant[];
  resources: TResource[];
  seeds: TSeed[];
  fishes: TFish[];
  plots: TPlot[];
  wallet: TWallet;
};

export const fetchCurrentStateFx = createEffect<
  void,
  AxiosResponse<TGameState>
>(async () => {
  return await fetcher.get<TGameState>({
    path: "games/state",
  });
});
