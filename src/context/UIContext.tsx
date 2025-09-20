// src/context/UIContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode} from "react";

type UIContextType = {
  loading: boolean;
  setLoading: (val: boolean) => void;
  message: any;
  showMessage: (msg: any) => void;
  clearMessage: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<any>(null);

  const showMessage = (msg: any) => setMessage(msg);
  const clearMessage = () => setMessage(null);

  return (
    <UIContext.Provider value={{ loading, setLoading, message, showMessage, clearMessage }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
