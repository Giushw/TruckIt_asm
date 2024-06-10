import {FC} from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import type {Statistics} from '../../../../types/response';
import type {KV} from '../../../../types/common';
import {formatNumber} from '../../../../lib/utils';
import OverviewCard from './OverviewCard';

interface OverviewInfoProps {
  data: Statistics['scalars']
}

const OverviewInfo: FC<OverviewInfoProps> = ({data}) => {
  const cardData: KV<string>[] = Object.entries(data).map(
    ([key, value]) => ({ key, value: formatNumber(value, 2) })
  );

  return (
    <Grid container spacing={2} columns={{ xs: 2, sm: 6, md: 8, lg: 12 }}>
      {cardData.map((c, index) => (
        <Grid item xs={1} sm={2} md={2} lg={2} key={index}>
          <Item>
            <OverviewCard data={c}/>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default OverviewInfo;
