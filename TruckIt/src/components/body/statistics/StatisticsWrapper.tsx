import {FC} from 'react';
import Grid from '@mui/material/Grid';
import type {Statistics} from '../../../types/response';
import StatisticsGraph from './StatisticsGraph';
import StatisticsTable from './StatisticsTable';

export interface StatisticsCommonData {
  active_carrier: number;
  active_client: number;
  aggregate_date: string;
  assigned_count: number;
  margin_abs: number;
  margin_abs_per_order: number;
  margin_perc: number;
  new_carriers: number;
  new_clients: number;
  order_count: number;
  order_per_period: number;
  revenue: number;
  revenue_assigned: number;
  revenue_per_order: number;
}

interface StatisticsWrapperProps {
  data: Statistics['data_table']
}

const StatisticsWrapper: FC<StatisticsWrapperProps> = ({data}) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={2}  columns={{xs: 1, md: 2}}>
      <Grid item xs={1}>
        <StatisticsGraph data={data} type='active'/>
      </Grid>
      <Grid item xs={1}>
        <StatisticsGraph data={data} type='new'/>
      </Grid>
      <Grid item xs={1}>
        <StatisticsGraph data={data} type='order'/>
      </Grid>
      <Grid item xs={1}>
        <StatisticsGraph data={data} type='revenue'/>
      </Grid>
      <Grid item xs={1} md={2}>
        <StatisticsTable data={data} />
      </Grid>
    </Grid>
  );
};

export default StatisticsWrapper;
