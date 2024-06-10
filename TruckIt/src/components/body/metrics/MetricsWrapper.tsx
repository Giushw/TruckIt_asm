import {FC} from 'react';
import Grid from '@mui/material/Grid';
import type {Statistics} from '../../../types/response';
import MetricGraph from './MetricsGraph';

interface MetricsWrapperProps {
  data: Statistics['histograms']
}

const MetricsWrapper: FC<MetricsWrapperProps> = ({data}) => {
  const {time_margin_perc, time_order_count, time_revenue} = data;

  return (
    <Grid container rowSpacing={2} columnSpacing={2}  columns={{ xs: 1, md: 2 }}>
      <Grid item xs={1}>
        <MetricGraph data={time_margin_perc} title='Percentage Margin' color='secondary'/>
      </Grid>
      <Grid item xs={1}>
        <MetricGraph data={time_order_count} title='Order Count' color='primary'/>
      </Grid>
      <Grid item xs={1}>
        <MetricGraph data={time_revenue} title='Margin Abs' color='primary'/>
      </Grid>
      <Grid item xs={1}>
        <MetricGraph data={time_revenue} title='Revenue' color='secondary' main={false} />
      </Grid>
    </Grid>
  );
};

export default MetricsWrapper;

