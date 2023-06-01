import { FC } from "react";
import cn from "classnames";

import BlockedIconSrc from "/src/assets/icons/blocked.svg";
import s from "./MiniCard.module.scss";

type TMiniCardProps = {
  active: boolean;
  onClick: () => void;
  image: string;
  count?: number;
  isBlocked?: boolean;
  bgStyle?: "dark" | "light";
};

export const MiniCard: FC<TMiniCardProps> = ({
  image,
  count,
  active,
  onClick,
  isBlocked = false,
  bgStyle = "dark",
}) => {
  if (isBlocked) {
    return (
      <div className={s.miniCard}>
        <div className={s.miniCardImage}>
          <img src={BlockedIconSrc} className={s.miniCardImage} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(s.miniCard, {
        [s.active]: active,
        [s.light]: bgStyle === "light",
      })}
      onClick={onClick}
    >
      <div className={s.miniCardImage}>
        <img src={image} className={s.miniCardImage} />
      </div>
      {count && <div className={s.miniCardCount}>{count}</div>}
    </div>
  );
};
