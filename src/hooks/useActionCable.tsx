import {
  useContext,
  createContext,
  FC,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";

import { createConsumer, Consumer } from "@rails/actioncable";

type ActionCableContext = {
  consumer: Consumer | null;
};

const actionCableContext = createContext<ActionCableContext>(null!);

export const ActionCableProvider: FC<PropsWithChildren> = ({ children }) => {
  const [consumer, setConsumer] = useState<Consumer | null>(null);

  useEffect(() => {
    if (!consumer) {
      setConsumer(createConsumer("wss://localhost:3000/cable"));
    }

    return () => {
      consumer && consumer.disconnect();
    };
  }, []);

  return (
    <actionCableContext.Provider value={{ consumer }}>
      {children}
    </actionCableContext.Provider>
  );
};

export const useActionCable = () => {
  return useContext(actionCableContext);
};

export default ActionCableProvider;
