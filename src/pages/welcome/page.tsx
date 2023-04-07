import { ModalBlock, Form, Button, Title } from "@/share/components";

import s from "./page.module.scss";

export const WelcomePage = () => {
  return (
    <div className={s.welcomePage}>
      <Title>
        Спаси океан, развивая
        <br />
        свою ферму!
      </Title>
      <ModalBlock>
        <Form>
          <div className={s.textContent}>
            Позже вы сможете подключить свой кошелек Web3, чтобы владеть фермой
            и всеми ее ресурсами, а пока что прототип игры доступен
            для тестирования без вложений
          </div>
          <Button type="submit" style="big" href="/game">
            играть
          </Button>
        </Form>
      </ModalBlock>
    </div>
  );
};
