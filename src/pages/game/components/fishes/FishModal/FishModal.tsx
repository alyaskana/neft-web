import { FC } from "react";
import { useStore } from "effector-react";

import { Button, LinearProgressBar, Modal, TModal } from "@/share/components";
import { TFish, TCrop } from "@/types/game";
import { $activeFish } from "@/pages/game/model";

import s from "./FishModal.module.scss";

type TFishModal = TModal & {
  fish: TFish;
};

export const FishModal: FC<TFishModal> = ({ fish, ...props }) => {
  const activeFish = useStore($activeFish);
  const nextLevelXp = Math.pow(fish.level / 0.05, 2);
  const currentLevelXp = Math.pow((fish.level - 1) / 0.05, 2);
  const levelDiffXp = nextLevelXp - currentLevelXp;
  const percent = ((fish.experience - currentLevelXp) / levelDiffXp) * 100;

  return (
    <Modal {...props}>
      <div className={s.fish}>
        <div className={s.fishCard}>
          <div className={s.experience}>
            <div className={s.experienceProgress}>
              <LinearProgressBar percent={percent} backgroundColor="#BEC563" />
            </div>
            <div className={s.level}>{activeFish.level}</div>
          </div>
          <div className={s.image}>
            <img src={activeFish.image} />
          </div>
          <div className={s.skillsProgress}>
            <div className={s.skillsProgressItem}>
              <div className={s.skillsProgressItemTitle}>Садоводство</div>
              <LinearProgressBar percent={33} backgroundColor="#FF69A8" />
            </div>
            <div className={s.skillsProgressItem}>
              <div className={s.skillsProgressItemTitle}>Очистка</div>
              <LinearProgressBar percent={66} backgroundColor="#87B8C7" />
            </div>
            <div className={s.skillsProgressItem}>
              <div className={s.skillsProgressItemTitle}>Разведка</div>
              <LinearProgressBar percent={100} backgroundColor="#FAB140" />
            </div>
          </div>
        </div>
        <div className={s.skillsBlock}>
          <div className={s.skills}>
            <div className={s.skillsTitle}>Навыки</div>
            <div className={s.skillsDescription}>
              Доступно очков для прокачки: {1}
            </div>
            <div className={s.skillsTree}>
              <div className={s.skillsTreeFirst}>
                <div className={s.skillsTreeTitle}>Садоводство</div>
                <div className={s.skillsTreeItems}>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                    <div className={s.skillHint}>+5% к стоимости урожая</div>
                  </div>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                    <div className={s.skillHint}>+5% к стоимости урожая</div>
                  </div>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                    <div className={s.skillHint}>+5% к стоимости урожая</div>
                  </div>
                </div>
              </div>
              <div className={s.skillsTreeFirst}>
                <div className={s.skillsTreeTitle}>Очистка</div>
                <div className={s.skillsTreeItems}>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                  </div>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                  </div>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
              <div className={s.skillsTreeFirst}>
                <div className={s.skillsTreeTitle}>Разведка</div>
                <div className={s.skillsTreeItems}>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                  </div>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                  </div>
                  <div className={s.skillsTreeItem}>
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button>Прокачать</Button>
        </div>
      </div>
    </Modal>
  );
};
