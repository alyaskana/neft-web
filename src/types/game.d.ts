export type TCell = {
  id: number;
  is_taken: boolean;
  land_type: "stone" | "grass" | "garden_bed";
  growing_seed?: TGrowingSeed;
  cell_mineral?: TCellMineral;
};

export type TPlot = {
  id: number;
  cells: TCell[];
};

export type TFish = {
  id: number;
  level: number;
  experience: number;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type TPlant = {
  id: number;
  name: string;
  description: string;
  rarity: number;
  image: string;
  seed_image: string;
  price: number;
  seed_price: number;
  growing_time: number;
  experience: number;
  created_at: string;
  updated_at: string;
};

export type TResource = {
  user_id: number;
  name: string;
  material_type: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export type TMineral = {
  id: number;
  name: string;
  description: string;
  price: number;
  recovery_time: number;
  image: string;
};

export type TRecipe = {
  id: number;
  name: string;
  description: string;
  experience: number;
  image: string;
};

export type TInstrument = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type TWallet = {
  dsc: number;
};

export type TSeedStock = {
  id: number;
  count: number;
  plant: TPlant;
  type: "seed_stock";
};

export type TRecipeStock = {
  id: number;
  count: number;
  recipe: TRecipe;
  type: "recipe_stock";
};

export type TMineralStock = {
  id: number;
  count: number;
  mineral: TMineral;
  type: "mineral_stock";
};

export type TInstrumentStock = {
  id: number;
  count: number;
  instrument: TInstrument;
  type: "instrument_stock";
};

export type TCrop = {
  id: number;
  count: number;
  plant: TPlant;
  type: "crop";
};

export type TGrowingSeed = {
  id: number;
  created_at: number;
  growing_time: number;
  final_grow_time: string;
  stage: "growing" | "complete";
  plant: TPlant;
};

export type TCellMineral = {
  id: number;
  created_at: number;
  final_recover_time: string;
  stage: "ready" | "recovering";
  mineral: TMineral;
};

export type TStash = {
  seedStocks: TSeedStock[];
  recipeStocks: TRecipeStock[];
  instrumentStocks: TInstrumentStock[];
  mineralStocks: TMineralStock[];
  crops: TCrop[];
};
