import {FC} from 'react';
import {ColorModeProvider} from './context/ColorMode';
import Dashboard from './layouts/Dashboard';

const App: FC = () => {
  return (
    <ColorModeProvider>
      <Dashboard />
    </ColorModeProvider>
  )
}

export default App;
