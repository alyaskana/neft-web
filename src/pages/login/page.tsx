import { loginSubmitted } from "./model";

import { ModalBlock, TextInput, Form, Button, Title } from "@/share/components";

import s from "./page.module.scss";

export const LoginPage = () => {
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
  };

  return (
    <div className={s.logingPage}>
      <Title>Регистрация и вход</Title>
      <ModalBlock>
        <Form onSubmit={handleSubmit}>
          <TextInput
            type="email"
            id="email"
            defaultValue="ialina240200@gmail.com"
            placeholder="email"
          />
          <TextInput
            type="password"
            id="password"
            defaultValue="12345678"
            placeholder="password"
          />
          <Button type="submit">Войти</Button>
        </Form>
      </ModalBlock>
    </div>
  );
};
