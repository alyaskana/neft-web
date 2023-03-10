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
  user_id: number;
  name: string;
  price: number;
  image: string;
  created_at: string;
  updated_at: string;
};
