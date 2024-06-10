import {FC} from 'react';
import {useTheme} from '@mui/material/styles';
import {BarChart} from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import type {KpisCommonData} from './KpisWrapper';

type GraphType = 'margin' | 'revenue';
type ColorType = 'primary' | 'secondary';
type SubDataType = Pick<KpisCommonData, 
'label' | 
'margin_abs' |
'margin_abs_per_order'|
'revenue' |
'revenue_per_order'
>;

type KpisGraphData = Pick<SubDataType,'label' | 'margin_abs' | 'margin_abs_per_order'> | 
Pick<SubDataType,'label' | 'revenue' | 'revenue_per_order'>;

interface KpisGraphProps {
  data: KpisCommonData[],
  type: GraphType
}

const KpisGraph: FC<KpisGraphProps> = ({data, type}) => {
  const theme = useTheme();
  const insertColor = (c: ColorType) => c === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main;

  const graphData = () => (data.map(g => {
    if (type === 'margin') {
      return ({
        label: g.label,
        margin_abs: g.margin_abs,
        margin_abs_per_order: g.margin_abs_per_order
      })
    } else {
      return ({
        label: g.label,
        revenue: g.revenue,
        revenue_per_order: g.revenue_per_order
      })
    }
  }));

  const graphedData: KpisGraphData[] = graphData();

  const seriesExtractor = () => {
    if (type === 'margin') {
      return [
        { dataKey: 'margin_abs', label: 'Margin', color: insertColor('secondary') },
        { dataKey: 'margin_abs_per_order', label: 'Margin per Order', color: insertColor('primary') }
      ]
    } else {
      return [
        { dataKey: 'revenue', label: 'Revenue',  color: insertColor('secondary') },
        { dataKey: 'revenue_per_order', label: 'Revenue per Order', color: insertColor('primary') },
      ]
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={type === 'margin' ? 'Margin' : 'Revenue'}
        subheader='Updated at Today'
      />

      <CardContent>
        <BarChart
          dataset={graphedData}
          xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
          series={seriesExtractor()}
          height={250}
          grid={{ vertical: true, horizontal: true }}
        />
        
      </CardContent>
    </Card>
  );
}

export default KpisGraph;
