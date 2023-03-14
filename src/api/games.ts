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

type TPlantSeedResponse = {
  plots: TPlot[];
  seed_stocks: TSeedStock[];
};

export const plantSeedFx = createEffect<
  { cell_id: number; seed_stock_id: number },
  AxiosResponse<TPlantSeedResponse>
>(async (params) => {
  return await fetcher.post<TPlantSeedResponse>({
    path: "games/plant_seed",
    params,
  });
});

type THarvestingResponse = {
  plots: TPlot[];
  crops: TCrop[];
};

export const harvestingFx = createEffect<
  { growing_seed_id: number },
  AxiosResponse<THarvestingResponse>
>(async (params) => {
  return await fetcher.post<THarvestingResponse>({
    path: "games/harvesting",
    params,
  });
});

type TEatCropResponse = {
  crops: TCrop[];
  fishes: TFish[];
};

export const eatCropFx = createEffect<
  { crop_id: number; fish_id: number },
  AxiosResponse<TEatCropResponse>
>(async (params) => {
  return await fetcher.post<TEatCropResponse>({
    path: "games/eat_crop",
    params,
  });
});
