import {
  createContext,
  useMemo,
  useState,
  FC,
  ReactNode
} from 'react';
import {createTheme, ThemeProvider, type Theme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type {ColorMode} from '../types/common';
import themeOptions from '../themes/main';

interface ColorModeContextType {
  toggleColorMode: () => void;
  colorMode: ColorMode;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

const ColorModeProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  const {palette, typography} = themeOptions;

  const switchColor = useMemo(
    () => ({
      toggleColorMode: () => {
        setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      colorMode
    }),
    [colorMode]
  );

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...palette,
          mode: colorMode
        },
        typography: {
          ...typography
        }
      }),
    [colorMode, palette, typography]
  );

  return (
    <ColorModeContext.Provider value={switchColor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export {ColorModeProvider, ColorModeContext};
