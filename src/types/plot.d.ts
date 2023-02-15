export type TCell = {
  id: string;
  is_taken: boolean;
  land_type: "resource" | "unavailable" | "available";
  plant_type?: string;
};

export type TPlot = {
  id: number;
  cells: Cell[];
};
