import {FC} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {DataGrid} from '@mui/x-data-grid';
import './App.css';

const theme = createTheme();

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGrid', col2: 'Material-UI' },
];

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];


const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </ThemeProvider>
  )
};


export default App;
