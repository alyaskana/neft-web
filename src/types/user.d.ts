import { TPlot } from "./plot";

export type TUser = {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  plots: Plot[];
};
