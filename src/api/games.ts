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
  TInstrument,
  TMineral,
  TRecipe,
  TUserRecipe,
  TMineralStock,
  TInstrumentStock,
  TDish,
  TSkills,
} from "@/types/game";

type TGameState = {
  plants: TPlant[];
  resources: TResource[];
  fishes: TFish[];
  plots: TPlot[];
  instruments: TInstrument[];
  minerals: TMineral[];
  recipes: TRecipe[];
  wallet: TWallet;
  seed_stocks: TSeedStock[];
  user_recipes: TUserRecipe[];
  mineral_stocks: TMineralStock[];
  instrument_stocks: TInstrumentStock[];
  crops: TCrop[];
  dishes: TDish[];
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

type TBuyInstrumentResponse = {
  instrument_stocks: TInstrumentStock[];
  wallet: TWallet;
};

export const buyInstrumentFx = createEffect<
  { instrument_id: number },
  AxiosResponse<TBuyInstrumentResponse>
>(async (params) => {
  return await fetcher.post<TBuyInstrumentResponse>({
    path: "games/buy_instrument",
    params,
  });
});

type TNewPlotResponse = {
  plots: TPlot[];
  mineral_stocks: TMineralStock[];
  wallet: TWallet;
};

export const newPlotFx = createEffect<void, AxiosResponse<TNewPlotResponse>>(
  async () => {
    return await fetcher.post<TNewPlotResponse>({
      path: "games/new_plot",
    });
  }
);

type TExploreResponse = {
  fishes: TFish[];
  wallet: TWallet;
  mineral_stocks: TMineralStock[];
};

export const exploreFx = createEffect<void, AxiosResponse<TExploreResponse>>(
  async () => {
    return await fetcher.post<TExploreResponse>({
      path: "games/explore",
    });
  }
);

type TCollectExploreResults = {
  fishes: TFish[];
  user_recipes: TUserRecipe[];
  seed_stocks: TSeedStock[];
};

export const collectExploreResultsFx = createEffect<
  void,
  AxiosResponse<TCollectExploreResults>
>(async () => {
  return await fetcher.post<TCollectExploreResults>({
    path: "games/collect_explore_results",
  });
});

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

type TCollectMineralResponse = {
  plots: TPlot[];
  mineral_stocks: TMineralStock[];
  instrument_stocks: TInstrumentStock[];
};

export const collectMineralFx = createEffect<
  { cell_mineral_id: number; instrument_stock_id: number },
  AxiosResponse<TCollectMineralResponse>
>(async (params) => {
  return await fetcher.post<TCollectMineralResponse>({
    path: "games/collect_mineral",
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

type TEatDishResponse = {
  dishes: TDish[];
  fishes: TFish[];
};

export const eatDishFx = createEffect<
  { dish_id: number; fish_id: number },
  AxiosResponse<TEatDishResponse>
>(async (params) => {
  return await fetcher.post<TEatDishResponse>({
    path: "games/eat_dish",
    params,
  });
});

type TCookRecipeResponse = {
  user_recipes: TUserRecipe[];
  crops: TCrop[];
};

export const cookRecipeFx = createEffect<
  { user_recipe_id: number },
  AxiosResponse<TCookRecipeResponse>
>(async (params) => {
  return await fetcher.post<TCookRecipeResponse>({
    path: "games/cook_recipe",
    params,
  });
});

type TSellCropResponse = {
  crops: TCrop[];
  wallet: TWallet;
};
export const sellCropFx = createEffect<
  { crop_id: number },
  AxiosResponse<TSellCropResponse>
>(async (params) => {
  return await fetcher.post<TSellCropResponse>({
    path: "games/sell_crop",
    params,
  });
});

type TSellMineralResponse = {
  mineral_stocks: TMineralStock[];
  wallet: TWallet;
};
export const sellMineralFx = createEffect<
  { mineral_stock_id: number },
  AxiosResponse<TSellMineralResponse>
>(async (params) => {
  return await fetcher.post<TSellMineralResponse>({
    path: "games/sell_mineral",
    params,
  });
});

type TSkillsResponse = {
  fishes: TFish[];
};
export const updateSkillsFx = createEffect<
  { skills: TSkills },
  AxiosResponse<TSkillsResponse>
>(async (params) => {
  return await fetcher.post<TSkillsResponse>({
    path: "games/update_skills",
    params,
  });
});
