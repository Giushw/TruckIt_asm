import {
  createContext,
  useMemo,
  useState,
  FC,
  ReactNode
} from 'react';
import type {ActiveView} from '../types/common';

interface ActiveViewContextType {
  switchActiveView: (view: ActiveView) => void;
  activeView: ActiveView;
}

const ActiveViewContext = createContext<ActiveViewContextType | undefined>(undefined);

const ActiveViewProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  const switchView = useMemo(
    () => ({
      switchActiveView: (view: ActiveView) => setActiveView(view),
      activeView,
    }),
    [activeView]
  );

  return (
    <ActiveViewContext.Provider value={switchView}>
      {children}
    </ActiveViewContext.Provider>
  );
};

export {ActiveViewProvider, ActiveViewContext};
