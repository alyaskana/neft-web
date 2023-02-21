import {
  createEvent,
  createEffect,
  sample,
  createStore,
  split,
} from "effector";
import { fetchCurrentStateFx } from "@/api/games";
import { TPlant, TResource, TSeed, TFish, TPlot, TWallet } from "@/types/game";

export type TMessage = {
  type: "plantHasGrown";
  text: string;
};

export const $plants = createStore<TPlant[]>([]);
export const $resources = createStore<TResource[]>([]);
export const $seeds = createStore<TSeed[]>([]);
export const $plots = createStore<TPlot[]>([]);
export const $fishes = createStore<TFish[]>([]);
export const $wallet = createStore<TWallet>({ dsc: 0 });

export const gamePageMounted = createEvent();

export const messageReceived = createEvent<TMessage>();
export const plantHasGrownFX = createEffect<TMessage, void>((msg) => {
  console.log("plantHasGrown message received :", msg);
});

split({
  source: messageReceived,
  match: {
    plantHasGrown: (msg) => msg.type === "plantHasGrown",
  },
  cases: {
    plantHasGrown: plantHasGrownFX,
  },
});

$plants.on(fetchCurrentStateFx.doneData, (_, { data: { plants } }) => plants);
$resources.on(
  fetchCurrentStateFx.doneData,
  (_, { data: { resources } }) => resources
);
$seeds.on(fetchCurrentStateFx.doneData, (_, { data: { seeds } }) => seeds);
$plots.on(fetchCurrentStateFx.doneData, (_, { data: { plots } }) => plots);
$fishes.on(fetchCurrentStateFx.doneData, (_, { data: { fishes } }) => fishes);
$wallet.on(fetchCurrentStateFx.doneData, (_, { data: { wallet } }) => wallet);

sample({
  clock: gamePageMounted,
  target: fetchCurrentStateFx,
});

$seeds.watch((data) => {
  console.log("seeds: ", data);
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
