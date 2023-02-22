export type TCell = {
  id: string;
  is_taken: boolean;
  land_type: "resource" | "unavailable" | "available";
  plant_type?: string;
};

export type TPlot = {
  id: number;
  cells: TCell[];
};

export type TFish = {
  id: number;
  level: number;
  experience: number;
  created_at: string;
  updated_at: string;
};

export type TPlant = {
  id: number;
  name: string;
  image: string;
  price: number;
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

export type TSeed = {
  id: number;
  user_id: number;
  name: string;
  price: number;
  image: string;
  created_at: string;
  updated_at: string;
};

export type TWallet = {
  dsc: number;
};

export type TSeedStockItem = {
  id: number;
  count: number;
  seed: TSeed;
};

export type TCrop = {
  id: number;
  count: number;
  plant: TPlant;
};
