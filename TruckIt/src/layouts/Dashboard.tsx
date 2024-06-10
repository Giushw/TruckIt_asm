import {FC} from 'react';
// import Intestation from '../header/Intestation';
// import Content from '../body/Content';
// import Navigation from '../aside/Navigation';
// import {ActiveViewProvider} from '../../context/ActiveView';
import {DataGrid} from '@mui/x-data-grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

const theme = createTheme();

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGrid', col2: 'Material-UI' },
];

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

const Dashboard: FC = () => {
  // const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}> 
      {/* <ActiveViewProvider>
        <Intestation dw={drawerWidth} />
        <Navigation dw={drawerWidth} />
        <Content />
      </ActiveViewProvider> */}
      <ThemeProvider theme={theme}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </ThemeProvider>
    </Box>
  )
}

export default Dashboard;
