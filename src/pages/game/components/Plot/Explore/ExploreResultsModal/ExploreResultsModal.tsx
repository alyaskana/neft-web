import { FC } from "react";

import s from "./ExploreResultsModal.module.scss";
import { Button, MiniCard, Modal, TModal } from "@/share/components";
import { useStore } from "effector-react";
import { $plants, $recipes } from "@/pages/game/model";
import { collectExploreResultsFx } from "@/api/games";

type TExploreResultsModalProps = TModal;

export const ExploreResultsModal: FC<TExploreResultsModalProps> = (props) => {
  const plants = useStore($plants);
  const recipes = useStore($recipes);

  const handleConfirm = async () => {
    await collectExploreResultsFx();
    if (props.onRequestClose) {
      props.onRequestClose();
    }
  };

  return (
    <Modal {...props}>
      <div className={s.exploreResultsModal}>
        <div className={s.title}>Ура! 🎉</div>
        <div className={s.description}>
          Ваша рыбка вернулась из разведки.
          <br />
          Смотрите, что ей удалось добыть:
        </div>
        <div className={s.content}>
          <MiniCard
            active={false}
            image={recipes[0].image}
            onClick={() => {}}
            key="recipe"
            bgStyle="light"
          />
          <MiniCard
            active={false}
            image={plants[0].seed_image}
            onClick={() => {}}
            count={5}
            key="seed"
            bgStyle="light"
          />
        </div>
        <div className={s.confirm}>
          <Button onClick={handleConfirm} style="big">
            Забрать
          </Button>
        </div>
      </div>
    </Modal>
  );
};
