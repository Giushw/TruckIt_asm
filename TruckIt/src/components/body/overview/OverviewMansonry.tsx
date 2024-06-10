import {FC} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import type {KV} from '../../../types/common';
import type {Statistics} from '../../../types/response';
import {formatNumber} from '../../../lib/utils';
import OverviewCard from './OverviewCard';

interface OverviewMansonryProps {
  data: Statistics['scalars'],
  heights: number[]
}

const OvervieMansonry: FC<OverviewMansonryProps> = ({data, heights}) => {
  const cardData: KV<string>[] = Object.entries(data).map(
    ([key, value]) => ({ key, value: formatNumber(value, 2) })
  );

  cardData.push({
    key: 'updated_at',
    value: new Date().toLocaleDateString()
  });

  return (
    <Box>
      <Masonry columns={{xs: 2, md: 3, lg: 4}} spacing={3}>
        {heights.map((height, index) => (
          <Paper key={index} sx={{ height }}>
            <OverviewCard data={cardData[index]} />
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
};

export default OvervieMansonry;
