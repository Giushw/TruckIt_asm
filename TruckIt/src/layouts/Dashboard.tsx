import {FC} from 'react';
import Box from '@mui/material/Box';
import {ActiveViewProvider} from '../context/ActiveView';
import Intestation from '../components/header/Intestation';
import Navigation from '../components/aside/Navigation';
import Content from '../components/body/Content';

const Dashboard: FC = () => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}> 
      <ActiveViewProvider>
        <Intestation dw={drawerWidth} />
        <Navigation dw={drawerWidth} />
        <Content />
      </ActiveViewProvider>
    </Box>
  )
}

export default Dashboard;
