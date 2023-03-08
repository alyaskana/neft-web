import { FC } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import {
  $seedStock,
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
  const seedStock = useStore($seedStock);
  const activeSeedStock = useStore($activeSeedStock);
  console.log("activeSeedStock", activeSeedStock);

  return (
    <div className={s.lastSeeds}>
      {seedStock.slice(0, 3).map((seedStockItem) => (
        <SeedItem
          seedStockItem={seedStockItem}
          key={seedStockItem.id}
          active={activeSeedStock.id == seedStockItem.id}
        />
      ))}
    </div>
  );
};
