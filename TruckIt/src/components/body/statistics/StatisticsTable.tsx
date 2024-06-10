import {FC} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import type {StatisticsCommonData} from './StatisticsWrapper';
import {normalizeKey, formatNumber} from '../../../lib/utils';

interface StatisticsGraphProps {
  data: StatisticsCommonData[]
}

const StatisticsTable: FC<StatisticsGraphProps> = ({data}) => {
  const singleColumns = Object.keys(data[0]);

  const tableColumns: GridColDef[] = singleColumns.map((col) => ({
    field: col,
    headerName: normalizeKey(col),
    type: col === 'aggregate_date' ? 'string': 'number',
    sortable: true,
    width: 112 
  }));

  const tableRows = data.map((row, index) => ({
    id: index,
    'aggregate_date': new Date(row.aggregate_date).toLocaleDateString(),
    'margin_abs': row.margin_abs,
    'margin_abs_per_order': formatNumber(row.margin_abs_per_order),
    'margin_perc': formatNumber(row.margin_perc),
    'active_carrier': row.active_carrier,
    'active_client': row.active_client,
    'new_carriers': row.new_carriers,
    'new_clients': row.new_clients,
    'assigned_count': row.assigned_count,
    'order_count': row.order_count,
    'order_per_period': row.order_per_period,
    'revenue_assigned': row.revenue_assigned,
    'revenue': row.revenue,
    'revenue_per_order': formatNumber(row.revenue_per_order)
  }));

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title='All Data'
        subheader='Updated at Today'
      />

      <CardContent>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={tableRows} columns={tableColumns} autoHeight />
        </div>
      </CardContent>
    </Card>
  );
}

export default StatisticsTable;
