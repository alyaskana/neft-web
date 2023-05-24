import { FC } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import {
  $seedStocks,
  $instrumentStocks,
  $activeSeedStock,
  $activeInstrumentStock,
  clickSeedStock,
  clickInstrumentStock,
} from "@/pages/game/model";

import s from "./QucikPanel.module.scss";

type TItem = {
  id: number;
  image: string;
  count: number;
  isActive: boolean;
  type: string;
  onClick: (id: number, type: string) => void;
};

const Item: FC<TItem> = ({ id, image, count, type, isActive, onClick }) => {
  const handleClick = () => {
    onClick(id, type);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(s.seedItem, { [s.active]: isActive })}
      key={`${type}-${id}`}
    >
      <img src={image} width="40px" />
      <div className={s.seedItemCount}>{count}</div>
    </div>
  );
};

export const QucikPanel: FC = () => {
  const seedStocks = useStore($seedStocks);
  const instrumentStocks = useStore($instrumentStocks);
  const activeSeedStock = useStore($activeSeedStock);
  const activeInstrumentStock = useStore($activeInstrumentStock);

  const handleClick = (id: number, type: string) => {
    let seedStock = null;
    let instrumentStock = null;
    if (type == "seed") {
      seedStock = seedStocks.find((seedStock) => seedStock.id == id) || null;
    }
    if (type == "instrument") {
      instrumentStock =
        instrumentStocks.find((instrumentStock) => instrumentStock.id == id) ||
        null;
    }
    clickSeedStock(seedStock);
    clickInstrumentStock(instrumentStock);
  };
  return (
    <div className={s.lastSeeds}>
      {instrumentStocks
        .filter((instrumentStocks) => instrumentStocks.count > 0)
        .map((instrumentStock) => (
          <Item
            id={instrumentStock.id}
            image={instrumentStock.instrument.image}
            count={instrumentStock.count}
            type="instrument"
            isActive={activeInstrumentStock?.id == instrumentStock.id}
            onClick={handleClick}
            key={instrumentStock.id}
          />
        ))}
      {seedStocks
        .filter((seedStocks) => seedStocks.count > 0)
        .map((seedStock) => (
          <Item
            id={seedStock.id}
            image={seedStock.plant.seed_image}
            count={seedStock.count}
            type="seed"
            isActive={activeSeedStock?.id == seedStock.id}
            onClick={handleClick}
            key={seedStock.id}
          />
        ))}
    </div>
  );
};
