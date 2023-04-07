import { useEvent, useStore } from "effector-react";
import { WelcomePage, $user, LoginPage, GamePage } from "@/pages";
import { appMounted } from "@/pages";
import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ActionCableProvider from "./hooks/useActionCable";

function App() {
  const user = useStore($user);
  const handleAppMount = useEvent(appMounted);

  useEffect(() => {
    handleAppMount();
  }, [handleAppMount]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/game"
          element={
            <>
              {user ? (
                <ActionCableProvider>
                  <GamePage />
                </ActionCableProvider>
              ) : (
                <LoginPage />
              )}
            </>
          }
        />
        <Route path="welcome" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;
