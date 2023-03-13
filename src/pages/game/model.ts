import {
  createEvent,
  createEffect,
  sample,
  createStore,
  split,
} from "effector";
import { Subscription } from "@rails/actioncable";

import {
  fetchCurrentStateFx,
  buySeedFx,
  newPlotFx,
  plantSeedFx,
  harvestingFx,
} from "@/api/games";
import {
  TPlant,
  TResource,
  TFish,
  TPlot,
  TWallet,
  TSeedStock,
  TCrop,
} from "@/types/game";

export type TMessage = {
  type: "plantHasGrown" | "updatePlots" | "updateSeedStocks";
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

export const $gameChannel = createStore<Subscription | null>(null);
export const setGameChannel = createEvent<Subscription | null>();

export const $plants = createStore<TPlant[]>([]);
export const $resources = createStore<TResource[]>([]);
export const $plots = createStore<TPlot[]>([]);
export const $fishes = createStore<TFish[]>([]);
export const $wallet = createStore<TWallet>({ dsc: 0 });
export const $seedStock = createStore<TSeedStock[]>([]);
export const $crops = createStore<TCrop[]>([]);
export const $activeSeedStock = $seedStock.map<TSeedStock>((state, lastState) =>
  lastState == undefined ? state[state.length - 1] : lastState
);

export const gamePageMounted = createEvent();
export const messageReceived = createEvent<TMessage>();
export const clickSeedStock = createEvent<TSeedStock>();
export const plantHasGrownFX = createEffect<TMessage, void>((msg) => {
  console.log("plantHasGrown message received :", msg);
});
export const updatePlotsFx = createEffect<
  TUpdatePlotsMessage,
  TUpdatePlotsMessage
>((msg) => msg);
export const updateSeedStocksFx = createEffect<
  TSeedStocksMessage,
  TSeedStocksMessage
>((msg) => msg);

split({
  source: messageReceived,
  match: {
    plantHasGrown: (msg) => msg.type === "plantHasGrown",
    plotsUpdated: (msg) => msg.type === "updatePlots",
    updateSeedStocks: (msg) => msg.type === "updateSeedStocks",
  },
  cases: {
    plantHasGrown: plantHasGrownFX,
    plotsUpdated: updatePlotsFx,
    updateSeedStocks: updateSeedStocksFx,
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
  ],
  (_, { data: { plots } }) => plots
);
$fishes.on(fetchCurrentStateFx.doneData, (_, { data: { fishes } }) => fishes);
$wallet.on(
  [fetchCurrentStateFx.doneData, buySeedFx.doneData],
  (_, { data: { wallet } }) => wallet
);
$seedStock.on(
  [
    fetchCurrentStateFx.doneData,
    updateSeedStocksFx.doneData,
    buySeedFx.doneData,
    plantSeedFx.doneData,
  ],
  (_, { data: { seed_stocks } }) => seed_stocks
);
$crops.on(
  [fetchCurrentStateFx.doneData, harvestingFx.doneData],
  (_, { data: { crops } }) => crops
);
$activeSeedStock.on(clickSeedStock, (_, seedStock) => seedStock);
$gameChannel.on(setGameChannel, (_, channel) => channel);

sample({
  clock: gamePageMounted,
  target: fetchCurrentStateFx,
});

$plants.watch((data) => {
  console.log("plants: ", data);
});
$resources.watch((data) => {
  console.log("resources: ", data);
});
$plots.watch((data) => {
  console.log("plots: ", data);
});
$fishes.watch((data) => {
  console.log("fishes: ", data);
});
$wallet.watch((data) => {
  console.log("wallet: ", data);
});
$seedStock.watch((data) => {
  console.log("seedStocks: ", data);
});
$crops.watch((data) => {
  console.log("crops: ", data);
});
$gameChannel.watch((data) => {
  console.log("gameChannel: ", data);
});
