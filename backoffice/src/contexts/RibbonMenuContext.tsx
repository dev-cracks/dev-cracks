import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface RibbonMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  action: () => void;
  disabled?: boolean;
}

interface RibbonMenuGroup {
  id: string;
  label: string;
  icon?: ReactNode;
  items: RibbonMenuItem[];
}

interface RibbonMenuContextType {
  groups: RibbonMenuGroup[];
  setGroups: (groups: RibbonMenuGroup[]) => void;
  addGroup: (group: RibbonMenuGroup) => void;
  removeGroup: (groupId: string) => void;
  clearGroups: () => void;
}

const RibbonMenuContext = createContext<RibbonMenuContextType | undefined>(undefined);

export const RibbonMenuProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<RibbonMenuGroup[]>([]);

  const addGroup = useCallback((group: RibbonMenuGroup) => {
    setGroups((prev) => {
      // Si el grupo ya existe, reemplazarlo
      const existingIndex = prev.findIndex((g) => g.id === group.id);
      if (existingIndex >= 0) {
        const newGroups = [...prev];
        newGroups[existingIndex] = group;
        return newGroups;
      }
      return [...prev, group];
    });
  }, []);

  const removeGroup = useCallback((groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  }, []);

  const clearGroups = useCallback(() => {
    setGroups([]);
  }, []);

  return (
    <RibbonMenuContext.Provider
      value={{
        groups,
        setGroups,
        addGroup,
        removeGroup,
        clearGroups,
      }}
    >
      {children}
    </RibbonMenuContext.Provider>
  );
};

export const useRibbonMenu = () => {
  const context = useContext(RibbonMenuContext);
  if (!context) {
    throw new Error('useRibbonMenu must be used within a RibbonMenuProvider');
  }
  return context;
};

