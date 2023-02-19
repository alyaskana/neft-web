import {
  createEvent,
  createEffect,
  sample,
  createStore,
  split,
} from "effector";
import { fetchCurrentStateFx } from "@/api/games";
import { TPlant, TResource, TSeed, TFish, TPlot } from "@/types/game";

export type TMessage = {
  type: "plantHasGrown";
  text: string;
};

export const $plants = createStore<TPlant[]>([]);
export const $resources = createStore<TResource[]>([]);
export const $seeds = createStore<TSeed[]>([]);
export const $plots = createStore<TPlot[]>([]);
export const $fishes = createStore<TFish[]>([]);

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

sample({
  clock: gamePageMounted,
  target: fetchCurrentStateFx,
});

$seeds.watch(console.log);
$plants.watch(console.log);
$resources.watch(console.log);
$plots.watch(console.log);
$fishes.watch(console.log);
