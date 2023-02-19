import { useEvent, useStore } from "effector-react";
import { LoginPage, GamePage, $user } from "@/pages";
import { appMounted } from "@/pages";
import { useEffect } from "react";
import { ActionCableProvider } from "@/hooks/useActionCable";

function App() {
  const user = useStore($user);
  const handleAppMount = useEvent(appMounted);

  useEffect(() => {
    handleAppMount();
  }, [handleAppMount]);

  return (
    <>
      <div className="App">
        {user ? (
          <>
            <ActionCableProvider>
              <GamePage />
            </ActionCableProvider>
          </>
        ) : (
          <>
            <LoginPage />
          </>
        )}
      </div>
    </>
  );
}

export default App;
