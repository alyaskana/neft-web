import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import { Button, LinearProgressBar, Modal, TModal } from "@/share/components";
import { TFish, TSkills } from "@/types/game";
import { $activeFish } from "@/pages/game/model";

import s from "./FishModal.module.scss";
import { updateSkillsFx } from "@/api/games";

type TFishModal = TModal & {
  fish: TFish;
};

export const FishModal: FC<TFishModal> = ({ fish, ...props }) => {
  const activeFish = useStore($activeFish);
  const nextLevelXp = Math.pow(fish.level / 0.05, 2);
  const currentLevelXp = Math.pow((fish.level - 1) / 0.05, 2);
  const levelDiffXp = nextLevelXp - currentLevelXp;
  const percent = ((fish.experience - currentLevelXp) / levelDiffXp) * 100;
  const [skills, setSkills] = useState<TSkills>({
    skill_1: false,
    skill_2: false,
    skill_3: false,
    skill_4: false,
    skill_5: false,
    skill_6: false,
    skill_7: false,
    skill_8: false,
    skill_9: false,
  });

  useEffect(() => {
    const skills = fish.skills.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.is_active }),
      {}
    );
    setSkills(skills);
  }, [fish]);

  const handleClick = (key: keyof TSkills) => {
    const skill = skills[key];
    if (skill || pointsCount() <= 0) {
      return;
    }
    setSkills((prev) => ({ ...prev, [key]: true }));
  };

  const pointsCount = () => {
    return fish.level - Object.values(skills).filter((item) => item).length;
  };

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
              <LinearProgressBar
                percent={
                  (100 / 3) *
                  [skills.skill_1, skills.skill_2, skills.skill_3].filter(
                    (item) => item
                  ).length
                }
                backgroundColor="#FF69A8"
              />
            </div>
            <div className={s.skillsProgressItem}>
              <div className={s.skillsProgressItemTitle}>Очистка</div>
              <LinearProgressBar
                percent={
                  (100 / 3) *
                  [skills.skill_4, skills.skill_5, skills.skill_6].filter(
                    (item) => item
                  ).length
                }
                backgroundColor="#87B8C7"
              />
            </div>
            <div className={s.skillsProgressItem}>
              <div className={s.skillsProgressItemTitle}>Разведка</div>
              <LinearProgressBar
                percent={
                  (100 / 3) *
                  [skills.skill_7, skills.skill_8, skills.skill_9].filter(
                    (item) => item
                  ).length
                }
                backgroundColor="#FAB140"
              />
            </div>
          </div>
        </div>
        <div className={s.skillsBlock}>
          <div className={s.skills}>
            <div className={s.skillsTitle}>Навыки</div>
            <div className={s.skillsDescription}>
              Доступно очков для прокачки: {pointsCount()}
            </div>
            <div className={s.skillsTree}>
              <div className={s.skillsTreeFirst}>
                <div className={s.skillsTreeTitle}>Садоводство</div>
                <div className={cn(s.skillsTreeItems, s.gardening)}>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_1,
                    })}
                    onClick={() => handleClick("skill_1")}
                  >
                    1<div className={s.skillHint}>+5% к стоимости урожая</div>
                  </div>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_2,
                    })}
                    onClick={() => handleClick("skill_2")}
                  >
                    2<div className={s.skillHint}>Новые виды растений</div>
                  </div>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_3,
                    })}
                    onClick={() => handleClick("skill_3")}
                  >
                    3<div className={s.skillHint}>+5% к стоимости урожая</div>
                  </div>
                </div>
              </div>
              <div className={s.skillsTreeFirst}>
                <div className={s.skillsTreeTitle}>Очистка</div>
                <div className={cn(s.skillsTreeItems, s.cleaning)}>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_4,
                    })}
                    onClick={() => handleClick("skill_4")}
                  >
                    1
                    <div className={s.skillHint}>
                      Очистка земель на 5% быстрее
                    </div>
                  </div>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_5,
                    })}
                    onClick={() => handleClick("skill_5")}
                  >
                    2
                    <div className={s.skillHint}>
                      Очистка земель на 10% быстрее
                    </div>
                  </div>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_6,
                    })}
                    onClick={() => handleClick("skill_6")}
                  >
                    3
                    <div className={s.skillHint}>
                      Очистка земель на 15% быстрее
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.skillsTreeFirst}>
                <div className={s.skillsTreeTitle}>Разведка</div>
                <div className={cn(s.skillsTreeItems, s.exploring)}>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_7,
                    })}
                    onClick={() => handleClick("skill_7")}
                  >
                    1
                    <div className={s.skillHint}>
                      Возможность обнаружить редкие ресурсы
                    </div>
                  </div>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_8,
                    })}
                    onClick={() => handleClick("skill_8")}
                  >
                    2<div className={s.skillHint}>Дальние локации</div>
                  </div>
                  <div
                    className={cn(s.skillsTreeItem, {
                      [s.active]: skills.skill_9,
                    })}
                    onClick={() => handleClick("skill_9")}
                  >
                    3
                    <div className={s.skillHint}>
                      Разведка доступна два раза в день
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => updateSkillsFx({ skills })}>Прокачать</Button>
        </div>
      </div>
    </Modal>
  );
};
