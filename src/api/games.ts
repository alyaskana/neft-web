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

type TBuySeedResponse = {
  seed_stocks: TSeedStock[];
  wallet: TWallet;
};

export const buySeedFx = createEffect<
  { plant_id: number },
  AxiosResponse<TBuySeedResponse>
>(async (params) => {
  return await fetcher.post<TBuySeedResponse>({
    path: "games/buy_seed",
    params,
  });
});

type TNewPlotResponse = {
  plots: TPlot[];
};

export const newPlotFx = createEffect<void, AxiosResponse<TNewPlotResponse>>(
  async () => {
    return await fetcher.post<TNewPlotResponse>({
      path: "games/new_plot",
    });
  }
);
