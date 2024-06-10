import {useContext} from 'react';
import {ActiveViewContext} from '../context/ActiveView';

/**
 * Custom hook for fetching the actual view visible.
 * @returns An object containing the `switchActiveView` function.
 */
const useActiveView = () => {
  const context = useContext(ActiveViewContext);
  if (!context) {
    throw new Error('useActiveView must be used within an ActiveViewProvider');
  }
  return context;
};

export default useActiveView;
