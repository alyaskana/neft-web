import {
  createEvent,
  createEffect,
  sample,
  createStore,
  split,
  combine,
} from "effector";
import { Subscription } from "@rails/actioncable";

import {
  fetchCurrentStateFx,
  buySeedFx,
  buyInstrumentFx,
  newPlotFx,
  plantSeedFx,
  harvestingFx,
  eatCropFx,
  sellCropFx,
  collectMineralFx,
  sellMineralFx,
  eatDishFx,
  cookRecipeFx,
  updateSkillsFx,
} from "@/api/games";
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
  TUserRecipe,
  TInstrumentStock,
  TMineralStock,
  TRecipe,
  TDish,
} from "@/types/game";

export type TMessage = {
  type: "plantHasGrown" | "updatePlots" | "updateSeedStocks" | "updateDishes";
  data: Record<string, unknown>;
};

type TUpdatePlotsMessage = TMessage & {
  data: {
    plots: TPlot[];
  };
};
type TSeedStocksMessage = TMessage & {
  data: {
    seed_stocks: TSeedStock[];
  };
};
type TUpdateDishesMessage = TMessage & {
  data: {
    dishes: TDish[];
    user_recipes: TUserRecipe[];
  };
};

export const $gameChannel = createStore<Subscription | null>(null);
export const setGameChannel = createEvent<Subscription | null>();

export const $plants = createStore<TPlant[]>([]);
export const $resources = createStore<TResource[]>([]);
export const $plots = createStore<TPlot[]>([]);
export const $fishes = createStore<TFish[]>([]);
export const $instruments = createStore<TInstrument[]>([]);
export const $minerals = createStore<TMineral[]>([]);
export const $recipes = createStore<TRecipe[]>([]);
export const $activeFish = $fishes.map<TFish>(
  (state) => state.find((fish) => fish.is_active) || state[0]
);
export const $wallet = createStore<TWallet>({ dsc: 0 });
export const $seedStocks = createStore<TSeedStock[]>([]);
export const $userRecipes = createStore<TUserRecipe[]>([]);
export const $instrumentStocks = createStore<TInstrumentStock[]>([]);
export const $mineralStocks = createStore<TMineralStock[]>([]);
export const $crops = createStore<TCrop[]>([]);
export const $dishes = createStore<TDish[]>([]);
export const $stash = combine(
  $seedStocks,
  $crops,
  $instrumentStocks,
  $mineralStocks,
  $dishes,
  (seedStocks, crops, instrumentStocks, mineralStocks, dishes) => {
    const filteredSeedStocks = seedStocks.filter(
      (seedStock) => seedStock.count > 0
    );
    const filteredInstrumentStocks = instrumentStocks.filter(
      (instrumentStock) => instrumentStock.count > 0
    );
    const filteredMineralStocks = mineralStocks.filter(
      (mineralStock) => mineralStock.count > 0
    );
    const filteredDishes = dishes.filter((dish) => dish.count > 0);
    const filteredCrops = crops.filter((crop) => crop.count > 0);
    return {
      seedStocks: filteredSeedStocks,
      instrumentStocks: filteredInstrumentStocks,
      mineralStocks: filteredMineralStocks,
      crops: filteredCrops,
      dishes: filteredDishes,
    };
  }
);

export const $activeSeedStock = createStore<TSeedStock | null>(null);
export const $activeInstrumentStock = createStore<TInstrumentStock | null>(
  null
);

export const gamePageMounted = createEvent();
export const messageReceived = createEvent<TMessage>();
export const clickSeedStock = createEvent<TSeedStock | null>();
export const clickInstrumentStock = createEvent<TInstrumentStock | null>();
export const plantHasGrownFX = createEffect<TMessage, void>((msg) => {
  console.log("$plantHasGrown message received :", msg);
});
export const updatePlotsFx = createEffect<
  TUpdatePlotsMessage,
  TUpdatePlotsMessage
>((msg) => msg);
export const updateSeedStocksFx = createEffect<
  TSeedStocksMessage,
  TSeedStocksMessage
>((msg) => msg);
export const updateDishesFx = createEffect<
  TUpdateDishesMessage,
  TUpdateDishesMessage
>((msg) => msg);

split({
  source: messageReceived,
  match: {
    plantHasGrown: (msg) => msg.type === "plantHasGrown",
    plotsUpdated: (msg) => msg.type === "updatePlots",
    updateDishes: (msg) => msg.type === "updateDishes",
    updateSeedStocks: (msg) => msg.type === "updateSeedStocks",
  },
  cases: {
    plantHasGrown: plantHasGrownFX,
    plotsUpdated: updatePlotsFx,
    updateSeedStocks: updateSeedStocksFx,
    updateDishes: updateDishesFx,
  },
});

$plants.on(fetchCurrentStateFx.doneData, (_, { data: { plants } }) => plants);
$resources.on(
  fetchCurrentStateFx.doneData,
  (_, { data: { resources } }) => resources
);
$plots.on(
  [
    fetchCurrentStateFx.doneData,
    updatePlotsFx.doneData,
    newPlotFx.doneData,
    plantSeedFx.doneData,
    harvestingFx.doneData,
    collectMineralFx.doneData,
  ],
  (_, { data: { plots } }) => plots
);
$fishes.on(
  [
    fetchCurrentStateFx.doneData,
    eatCropFx.doneData,
    eatDishFx.doneData,
    updateSkillsFx.doneData,
  ],
  (_, { data: { fishes } }) => fishes
);
$minerals.on(
  [fetchCurrentStateFx.doneData],
  (_, { data: { minerals } }) => minerals
);
$recipes.on(
  [fetchCurrentStateFx.doneData],
  (_, { data: { recipes } }) => recipes
);
$instruments.on(
  [fetchCurrentStateFx.doneData],
  (_, { data: { instruments } }) => instruments
);
$wallet.on(
  [
    fetchCurrentStateFx.doneData,
    buySeedFx.doneData,
    sellCropFx.doneData,
    buyInstrumentFx.doneData,
    sellMineralFx.doneData,
    newPlotFx.doneData,
  ],
  (_, { data: { wallet } }) => wallet
);
$seedStocks.on(
  [
    fetchCurrentStateFx.doneData,
    updateSeedStocksFx.doneData,
    buySeedFx.doneData,
    plantSeedFx.doneData,
  ],
  (_, { data: { seed_stocks } }) => seed_stocks
);
$userRecipes.on(
  [
    fetchCurrentStateFx.doneData,
    updateDishesFx.doneData,
    cookRecipeFx.doneData,
  ],
  (_, { data: { user_recipes } }) => user_recipes
);
$mineralStocks.on(
  [
    fetchCurrentStateFx.doneData,
    collectMineralFx.doneData,
    sellMineralFx.doneData,
    newPlotFx.doneData,
  ],
  (_, { data: { mineral_stocks } }) => mineral_stocks
);
$instrumentStocks.on(
  [
    fetchCurrentStateFx.doneData,
    buyInstrumentFx.doneData,
    collectMineralFx.doneData,
  ],
  (_, { data: { instrument_stocks } }) => instrument_stocks
);
$crops.on(
  [
    fetchCurrentStateFx.doneData,
    harvestingFx.doneData,
    eatCropFx.doneData,
    sellCropFx.doneData,
    cookRecipeFx.doneData,
  ],
  (_, { data: { crops } }) => crops
);
$dishes.on(
  [fetchCurrentStateFx.doneData, eatDishFx.doneData, updateDishesFx.doneData],
  (_, { data: { dishes } }) => dishes
);
$activeSeedStock.on(clickSeedStock, (_, seedStock) => seedStock);
$activeInstrumentStock.on(
  clickInstrumentStock,
  (_, instrumentStock) => instrumentStock
);
$gameChannel.on(setGameChannel, (_, channel) => channel);

sample({
  clock: gamePageMounted,
  target: fetchCurrentStateFx,
});

$plants.watch((data) => {
  console.log("$plants: ", data);
});
$resources.watch((data) => {
  console.log("$resources: ", data);
});
$plots.watch((data) => {
  console.log("$plots: ", data);
});
$fishes.watch((data) => {
  console.log("$fishes: ", data);
});
$recipes.watch((data) => {
  console.log("$recipes: ", data);
});
$instruments.watch((data) => {
  console.log("$instruments: ", data);
});
$minerals.watch((data) => {
  console.log("$minerals: ", data);
});
$wallet.watch((data) => {
  console.log("$wallet: ", data);
});
$seedStocks.watch((data) => {
  console.log("$seedStocks: ", data);
});
$userRecipes.watch((data) => {
  console.log("$userRecipes: ", data);
});
$instrumentStocks.watch((data) => {
  console.log("$instrumentStocks: ", data);
});
$mineralStocks.watch((data) => {
  console.log("$mineralStocks: ", data);
});
$crops.watch((data) => {
  console.log("$crops: ", data);
});
$gameChannel.watch((data) => {
  console.log("$gameChannel: ", data);
});
$stash.watch((data) => {
  console.log("$stash: ", data);
});
$activeSeedStock.watch((data) => {
  console.log("$activeSeedStock: ", data);
});
$activeInstrumentStock.watch((data) => {
  console.log("$activeInstrumentStock: ", data);
});
