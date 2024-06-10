import {FC} from 'react';
import Grid from '@mui/material/Grid';
import type {Statistics} from '../../../types/response';
import KpisGraph from './KpisGraph';
import KpisTable from './KpisTable';

export interface KpisCommonData {
  id: string;
  label: string;
  margin_abs: number;
  margin_abs_per_order: number;
  margin_abs_perc_on_tot: number;
  margin_perc: number;
  order_count: number;
  order_count_perc_on_tot: number;
  revenue: number;
  revenue_per_order: number;
  revenue_perc_on_tot: number;
}

interface KpisWrapperProps {
  data: Statistics['kpis']['carrier'] | Statistics['kpis']['client']
}

const KpisWrapper: FC<KpisWrapperProps> = ({data}) => {
  const parsedData: KpisCommonData[] = Object.entries(data).map(
    ([key, value]) => ({id: key, ...value})
  );

  return (
    <Grid container rowSpacing={2} columnSpacing={2}  columns={{xs: 1, md: 2}}>
      <Grid item xs={1}>
        <KpisGraph data={parsedData} type='margin'/>
      </Grid>
      <Grid item xs={1}>
        <KpisGraph data={parsedData} type='revenue'/>
      </Grid>
      <Grid item xs={1} md={2}>
        <KpisTable  data={parsedData} />
      </Grid>
    </Grid>
  );
};

export default KpisWrapper;
