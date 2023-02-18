import StashUrl from "/src/assets/sprites/stash.png";
import s from "./StashIcon.module.scss";

export const StashIcon = () => {
  return (
    <div className={s.stashIcon}>
      <img src={StashUrl} alt="Stash" />
    </div>
  );
};
