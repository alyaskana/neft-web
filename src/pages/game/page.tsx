import { Land } from "./Land/Land";
import { ActionCableProvider } from "@/hooks/useActionCable";

export const GamePage = () => {
  return (
    <div>
      <div>
        <ActionCableProvider>
          <Land />
        </ActionCableProvider>
      </div>
    </div>
  );
};
