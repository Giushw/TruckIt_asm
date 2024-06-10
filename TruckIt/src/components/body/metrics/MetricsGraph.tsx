import {FC} from 'react';
import {useTheme} from '@mui/material/styles';
import {LineChart} from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import {Statistics} from '../../../types/response';
import useActiveView from '../../../hook/useActiveView';

type HistogramsData = Statistics['histograms'];
type HistogramsPossibleData = HistogramsData['time_margin_perc'] | HistogramsData['time_order_count'] | HistogramsData['time_revenue'];
type ColorType = 'primary' | 'secondary';

interface MetricGraphProps {
  data: HistogramsPossibleData,
  title: string,
  color: ColorType,
  main?: boolean
}

const MetricGraph: FC<MetricGraphProps> = ({data, title, color, main = true}) => {
  const theme = useTheme();
  const {switchActiveView} = useActiveView();

  const clusterData = data.data;
  const labels: Date[] = [] ;
  const entries: number[] = [];
  const subEntries: number[] = [];

  const checkColor = (c: ColorType) => c === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main;

  clusterData.map(cl => {
    const subDate = cl.date.split('-');
    labels.push(new Date(parseFloat(subDate[2]), parseFloat(subDate[1]), parseFloat(subDate[0])))

    if ('margin_perc' in cl) {
      entries.push(cl.margin_perc);
    }

    if ('order_count' in cl) {
      entries.push(cl.order_count);
    }

    if ('margin_abs' in cl) {
      entries.push(cl.margin_abs);
      subEntries.push(cl.revenue);
    }
  });

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={title}
        subheader={`Updated at ${new Date(labels[labels.length -1]).toLocaleDateString()}`}
        action={
          <IconButton aria-label="more info" onClick={() => switchActiveView('statistics')}>
            <ArrowOutwardIcon />
          </IconButton>
        }
      />

      <CardContent>
        <LineChart
          xAxis={[
            {
              id: 'Dates',
              data: labels,
              scaleType: 'point',
              valueFormatter: (date) => new Date(date).toLocaleDateString(),
            },
          ]}
          series={[
            ...(main ? [{ data: entries, color: checkColor(color)}] : []),
            ...(!main ? [{ data: subEntries, color: checkColor(color) }] : []),
          ]}
          height={250}
          grid={{ vertical: true, horizontal: true }}
        />
      </CardContent>
    </Card>
  );
}

export default MetricGraph;
