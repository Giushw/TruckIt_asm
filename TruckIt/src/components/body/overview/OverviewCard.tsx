import {FC} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import type {KV} from '../../../types/common';
import {normalizeKey, suffixUnit, pathOverview} from '../../../lib/utils';
import useActiveView from '../../../hook/useActiveView';

interface OverviewCardProps {
  data: KV<string>
}

const OverviewCard: FC<OverviewCardProps> = ({data}) => {
  const {switchActiveView} = useActiveView();

  return (
    <Card variant='elevation' sx={{height: '100%'}}>
      <CardActionArea sx={{height: '100%'}} onClick={() => switchActiveView(pathOverview(data.key))}>
        <CardContent sx={{height: '100%'}}>
          <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{height: '100%'}}>
            <Typography variant='h5' sx={{mb: 1.5}} gutterBottom>
              {normalizeKey(data.key)}
            </Typography>

            <Box display='flex' justifyContent='flex-end' alignItems='center'>
              <Typography variant="h2" color='secondary'>
                {data.value}
              </Typography>

              <Typography variant='h5' sx={{ ml: 1.5 }} color="text.secondary">
                {suffixUnit(data.key)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OverviewCard;
