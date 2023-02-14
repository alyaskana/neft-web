import "./App.css";
import { useEvent, useStore } from "effector-react";
import { LoginPage, LandPage, $user } from "@/pages";
import { loginPageMounted } from "@/pages";
import { useEffect } from "react";

function App() {
  const user = useStore($user);
  const handlePageMount = useEvent(loginPageMounted);

  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  return (
    <>
      <div className="App">
        {user ? (
          <>
            <LandPage />
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    </>
  );
}

export default App;
