export type TCell = {
  id: number;
  is_taken: boolean;
  land_type: "stone" | "grass" | "garden_bed";
  growing_seed?: TGrowingSeed;
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

export type TWallet = {
  dsc: number;
};

export type TSeedStock = {
  id: number;
  count: number;
  plant: TPlant;
  type: "seed_stock";
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
