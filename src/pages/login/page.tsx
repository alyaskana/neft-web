import { useNavigate } from "react-router-dom";
import { loginSubmitted } from "./model";
import { ModalBlock, TextInput, Form, Button, Title } from "@/share/components";

import s from "./page.module.scss";

export const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string | null };
      password: { value: string | null };
    };
    if (!target.email.value || !target.password.value) {
      return;
    }
    loginSubmitted({
      email: target.email.value,
      password: target.password.value,
    });
    return navigate("/game");
  };

  return (
    <div className={s.logingPage}>
      <Title>Регистрация и вход</Title>
      <ModalBlock>
        <Form onSubmit={handleSubmit}>
          <TextInput
            type="email"
            id="email"
            // defaultValue="empty_user@gmail.com"
            placeholder="Email"
          />
          <TextInput
            type="password"
            id="password"
            // defaultValue="12345678"
            placeholder="Пароль"
          />
          <Button type="submit">Войти</Button>
        </Form>
      </ModalBlock>
    </div>
  );
};
