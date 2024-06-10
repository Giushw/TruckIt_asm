import {useContext} from 'react';
import {ColorModeContext} from '../context/ColorMode';

/**
 * Custom hook for fetching theme color mode.
 * @returns An object containing the `toggleColorMode` function.
 */
const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within an ColorModeProvider');
  }
  return context;
}; 

export default useColorMode;
