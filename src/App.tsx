import { useEvent, useStore } from "effector-react";
import { LoginPage, GamePage, $user } from "@/pages";
import { loginPageMounted } from "@/pages";
import { useEffect } from "react";
// import { gameChannel } from "@/api/channels/game_channel";

function App() {
  const user = useStore($user);
  const handlePageMount = useEvent(loginPageMounted);

  useEffect(() => {
    handlePageMount();
    // gameChannel;
  }, [handlePageMount]);

  return (
    <>
      <div className="App">
        {user ? (
          <>
            <GamePage />
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    </>
  );
}

export default App;
