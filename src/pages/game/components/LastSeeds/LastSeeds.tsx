import { FC } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import {
  $seedStocks,
  $activeSeedStock,
  clickSeedStock,
} from "@/pages/game/model";
import { TSeedStock } from "@/types/game";

import s from "./LastSeeds.module.scss";

type TseedItem = {
  seedStockItem: TSeedStock;
  active: boolean;
};

const SeedItem: FC<TseedItem> = ({ seedStockItem, active }) => {
  const handleClick = () => {
    clickSeedStock(seedStockItem);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(s.seedItem, { [s.active]: active })}
      key={seedStockItem.id}
    >
      <img src={seedStockItem.plant.seed_image} width="40px" />
      <div className={s.seedItemCount}>{seedStockItem.count}</div>
    </div>
  );
};

export const LastSeeds: FC = () => {
  const seedStocks = useStore($seedStocks);
  const activeSeedStock = useStore($activeSeedStock);

  return (
    <div className={s.lastSeeds}>
      {seedStocks
        .filter((seedStocks) => seedStocks.count > 0)
        .map((seedStock) => (
          <SeedItem
            seedStockItem={seedStock}
            key={seedStock.id}
            active={activeSeedStock.id == seedStock.id}
          />
        ))}
    </div>
  );
};
