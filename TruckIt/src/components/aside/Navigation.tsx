import {FC} from 'react';
import {useTheme} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type {ActiveView, LV} from '../../types/common';
import useActiveView from '../../hook/useActiveView';
import TruckItLogo from '../logo/TruckItLogo';

interface NavigationProps {
  dw: number
}

const MENU_VOICES: LV<ActiveView>[] = [
  { label: 'Summary', value: 'home' },
  { label: 'Quick Metrics', value: 'metrics' },
  { label: 'Carriers', value: 'carriers' },
  { label: 'Clients', value: 'customers' },
  { label: 'Statistics', value: 'statistics' }
];

const Navigation: FC<NavigationProps> = ({dw})=> {
  const theme = useTheme();
  const {switchActiveView, activeView} = useActiveView();

  return (
    <Drawer
      sx={{
        width: {xs: 60, md: dw},
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: {xs: 60, md: dw},
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Paper elevation={3}>
        <Toolbar>
          <Box
            display={{xs:'none', md: 'flex'}}
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            {theme.palette.mode === 'dark' &&
              <TruckItLogo type='dark' onClick={() => switchActiveView('home')}/>
            }
            {theme.palette.mode === 'light' &&
              <TruckItLogo type='light' onClick={() => switchActiveView('home')}/>
            }
          </Box>
        </Toolbar>
      </Paper>
      <Divider />
      <List>
        {MENU_VOICES.map((voice) => (
          <ListItem key={voice.value} disablePadding>
            <ListItemButton onClick={() => switchActiveView(voice.value)}>
              <ListItemIcon>
                {voice.value === 'home' && <HomeIcon color={activeView === 'home' ? 'secondary' : 'inherit' } />}
                {voice.value === 'metrics' && <TrendingUpIcon color={activeView === 'metrics' ? 'secondary' : 'inherit' } />}
                {voice.value === 'carriers' && <LocalShippingIcon color={activeView === 'carriers' ? 'secondary' : 'inherit' } />}
                {voice.value === 'customers' && <PeopleIcon color={activeView === 'customers' ? 'secondary' : 'inherit' } />}
                {voice.value === 'statistics' && <InventoryIcon color={activeView === 'statistics' ? 'secondary' : 'inherit' } />}
              </ListItemIcon>
              <ListItemText primary={voice.label} sx={{ display: {xs: 'none', md: 'block'}}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
};

export default Navigation;