import {FC} from 'react';
import Box from '@mui/material/Box';
import {ColorMode} from '../../types/common';

interface TruckItLogoProps {
  onClick?: () => void,
  type: ColorMode;
}

const TruckItLogo: FC<TruckItLogoProps> = ({onClick, type}) => {
  return (
    <Box
      component="img"
      sx={{
        height: 'auto',
        width: '100%',
        maxWidth: 200,
        '&:hover': {
          cursor: onClick ? 'pointer' : 'default',
        },
      }}
      alt="The TruckIT logo"
      src={type === 'light' ? './logo.png' : './logo_white.png'}
      onClick={onClick}
    />
  )
}

export default TruckItLogo;
