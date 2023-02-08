import { loginSubmitted } from "./model";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" defaultValue="ialina240200@gmail.com" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" defaultValue="12345678" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
