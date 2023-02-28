import { ReactComponent as Fish } from "@/assets/fishes/violet.svg";
import s from "./FishAvatar.module.scss";
export const FishAvatar = () => {
  return (
    <div className={s.fishAvatar}>
      <Fish />
    </div>
  );
};
