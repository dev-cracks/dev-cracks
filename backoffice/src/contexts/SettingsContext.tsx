import { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextValue {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSettings = () => setIsOpen(true);
  const closeSettings = () => setIsOpen(false);

  return (
    <SettingsContext.Provider value={{ isOpen, openSettings, closeSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

