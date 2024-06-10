import {FC} from 'react';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {ActiveView, LV} from '../../types/common';
import useActiveView from '../../hook/useActiveView';
import useColorMode from '../../hook/useColorMode';

const COPY: LV<ActiveView>[] = [
  {label: 'Summary', value: 'home'},
  {label: 'Quick Metrics', value: 'metrics'},
  {label: 'Carrier Info', value: 'carriers'},
  {label: 'Customers Info', value: 'customers'},
  {label: 'Statistics', value: 'statistics'}
];

interface IntestationProps {
  dw: number
}

const Intestation: FC<IntestationProps> = ({dw})=> {
  const theme = useTheme();
  const {activeView} = useActiveView();
  const {toggleColorMode} = useColorMode();

  const activeViewLabel = (aView: ActiveView) => COPY.filter(c => c.value === aView)[0];

  return (
    <AppBar
      position="fixed"
      color='primary'
      enableColorOnDark
      sx={{ width: {
          xs: `calc(100% - ${60}px)`,
          md: `calc(100% - ${dw}px)`
        },
        ml: {
          xs: `${60}px`,
          md: `${dw}px`
        }
      }}
    >
      <Toolbar>
        <Typography variant="h4" noWrap component="div">
          {activeViewLabel(activeView).label}
          {}
        </Typography>
        <Box sx={{flexGrow: 1}} />
        <Box>
          <IconButton size="large" aria-label="Change mode" color="inherit" onClick={() => toggleColorMode()}>
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
};

export default Intestation;