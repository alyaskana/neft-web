import { Land } from "./Land/Land";
import { FishAvatar } from "./fishes";
import { StashIcon } from "./stash";
import { ShopIcon } from "./shop";
import { MoneyLabel } from "./money";
import { ActionCableProvider } from "@/hooks/useActionCable";

export const GamePage = () => {
  return (
    <div>
      <div>
        <ActionCableProvider>
          <FishAvatar />
          <MoneyLabel />
          <StashIcon />
          <ShopIcon />
          <Land />
        </ActionCableProvider>
      </div>
    </div>
  );
};
