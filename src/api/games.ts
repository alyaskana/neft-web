import { AxiosResponse } from "axios";
import { createEffect } from "effector";
import { fetcher } from "./base";
import {
  TPlant,
  TResource,
  TFish,
  TPlot,
  TWallet,
  TSeedStock,
  TCrop,
} from "@/types/game";

type TGameState = {
  plants: TPlant[];
  resources: TResource[];
  fishes: TFish[];
  plots: TPlot[];
  wallet: TWallet;
  seed_stocks: TSeedStock[];
  crops: TCrop[];
};

export const fetchCurrentStateFx = createEffect<
  void,
  AxiosResponse<TGameState>
>(async () => {
  return await fetcher.get<TGameState>({
    path: "games/state",
  });
});
