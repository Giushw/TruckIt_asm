import {FC} from 'react';
import {useTheme} from '@mui/material/styles';
import {BarChart} from '@mui/x-charts/BarChart';
import {LineChart} from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import type {StatisticsCommonData} from './StatisticsWrapper';
import {formatNumber} from '../../../lib/utils';

type GraphType = 'active' | 'new' | 'order' | 'revenue' | 'margin';
type ColorType = 'primary' | 'secondary' | 'info';

type CommonSubType = Pick<StatisticsCommonData, 'aggregate_date'>;

type SubDataTypeActive  = Pick<StatisticsCommonData, 'active_carrier' | 'active_client'> & CommonSubType;
type SubDataTypeNew  = Pick<StatisticsCommonData, 'new_carriers' | 'new_clients'> & CommonSubType;
type SubDataTypeOrder  = Pick<StatisticsCommonData, 'order_count' | 'order_per_period' | 'assigned_count'> & CommonSubType;
type SubDataTypeRevenue  = Pick<StatisticsCommonData, 'revenue' | 'revenue_assigned' | 'revenue_per_order'> & CommonSubType;
type SubDataTypeMargins  = Pick<StatisticsCommonData, 'margin_abs' | 'margin_abs_per_order' | 'margin_perc'> & CommonSubType;

type StatisticsGraphData = SubDataTypeActive | SubDataTypeNew | SubDataTypeOrder | SubDataTypeRevenue | SubDataTypeMargins;

interface StatisticsGraphProps {
  data: StatisticsCommonData[],
  type: GraphType
}

const StatisticsGraph: FC<StatisticsGraphProps> = ({data, type}) => {
  const theme = useTheme();
  const insertColor = (c: ColorType) => {
    switch (c) {
      case 'primary':
        return theme.palette.primary.main;

      case 'secondary':
        return theme.palette.secondary.main;

      case 'info':
        return theme.palette.info.main;
    }
  };

  const graphData = () => (data.map(g => {
    switch (type) {
      case 'active':
        return {
          aggregate_date: g.aggregate_date,
          active_carrier: g.active_carrier,
          active_client: g.active_client
        };

      case 'new':
        return {
          aggregate_date: g.aggregate_date,
          new_carriers: g.new_carriers,
          new_clients: g.new_clients
        };

      case 'order':
        return {
          aggregate_date: g.aggregate_date,
          order_count: g.order_count,
          order_per_period: g.order_per_period,
          assigned_count: g.assigned_count
        };

      case 'margin':
        return {
          aggregate_date: g.aggregate_date,
          margin_abs: g.margin_abs,
          margin_abs_per_order: g.margin_abs_per_order,
          margin_perc: g.margin_perc
        };

      case 'revenue':
        return {
          aggregate_date: g.aggregate_date,
          revenue: g.revenue,
          revenue_assigned: g.revenue_assigned,
          revenue_per_order: g.revenue_per_order
        };
  }
  }));

  const graphedData: StatisticsGraphData[] = graphData();

  const mainSeries: number[] = [];
  const subSeries: number[] = [];
  const optSeries: number[] = [];
  const labels: string[] = [];

  graphedData.map(g => {
    labels.push(new Date(g.aggregate_date).toLocaleDateString());

    if ('active_carrier' in g) {
      mainSeries.push(g.active_carrier);
      subSeries.push(g.active_client);
    }

    if ('new_carriers' in g) {
      mainSeries.push(g.new_carriers);
      subSeries.push(g.new_clients);
    }

    if ('order_count' in g) {
      mainSeries.push(g.assigned_count);
      subSeries.push(g.order_count);
      optSeries.push(g.order_per_period);
    }

    if ('revenue' in g) {
        mainSeries.push(g.revenue_assigned);
        subSeries.push(g.revenue);
        optSeries.push(parseFloat(formatNumber(g.revenue_per_order)));
    }
  })

  const titleExtractor = () => {
    switch (type) {
      case 'active':
        return 'Active';

      case 'new':
        return 'New';

      case 'order':
        return 'Orders';

      case 'margin':
        return 'Margin';

      case 'revenue':
        return 'Revenue';
    }
  };
  

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={titleExtractor()}
        subheader={`Updated at ${new Date(labels[labels.length -1]).toLocaleDateString()}`}
      />

      <CardContent>
        {type === 'active' &&
          <LineChart
            series={[
              { data: mainSeries, label: 'Carriers',  color: insertColor('secondary'), area: true},
              { data: subSeries, label: 'Clients',  color: insertColor('primary'), area: true},
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
            height={250}
            grid={{ vertical: true, horizontal: true }}
          />
        }

        {type === 'new' &&
          <LineChart
            series={[
              { data: mainSeries, label: 'Carriers',  color: insertColor('secondary'), area: true},
              { data: subSeries, label: 'Clients',  color: insertColor('primary'), area: true},
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
            height={250}
            grid={{ vertical: true, horizontal: true }}
          />
        }

        {type === 'order' &&
          <LineChart
            series={[
              { data: mainSeries, label: 'Assigned',  color: insertColor('secondary')},
              { data: subSeries, label: 'Count',  color: insertColor('primary'), stack: 'A'},
              { data: optSeries, label: 'Per Period',  color: insertColor('info'), stack: 'A'},
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
            height={250}
            grid={{ vertical: true, horizontal: true }}
          />
        }

        {type === 'revenue' &&
          <BarChart
            series={[
              { data: mainSeries, label: 'Assigned', color: insertColor('secondary')},
              { data: subSeries, label: 'Count',  color: insertColor('primary'), stack: 'A'},
              { data: optSeries, label: 'Per Order',  color: insertColor('info'), stack: 'A'}
            ]}
            xAxis={[{ scaleType: 'band', data: labels }]}
            height={250}
            grid={{ vertical: true, horizontal: true }}
          />
        }
      </CardContent>
    </Card>
  );
}

export default StatisticsGraph;
