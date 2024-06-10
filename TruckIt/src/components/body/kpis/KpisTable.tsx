import {FC} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import type {KpisCommonData} from './KpisWrapper';
import {normalizeKey, formatNumber} from '../../../lib/utils';

type KpisTableData = Pick<KpisCommonData, 
'id' |
'label' | 
'margin_abs_perc_on_tot'|
'margin_perc' |
'order_count' |
'order_count_perc_on_tot' |
'revenue_perc_on_tot'
>;

interface KpisGraphProps {
  data: KpisCommonData[]
}

const KpisTable: FC<KpisGraphProps> = ({data}) => {
  const tabledData: KpisTableData[] = data.map(g =>  ({
    id: g.id,
    label: g.label,
    margin_abs_perc_on_tot: g.margin_abs_perc_on_tot,
    margin_perc: g.margin_perc,
    order_count: g.order_count,
    order_count_perc_on_tot: g.order_count_perc_on_tot,
    revenue_perc_on_tot: g.revenue_perc_on_tot
  }));
  
  const tableDataKeys = Object.keys(tabledData[0]);

  const tableColumns: GridColDef[] = tableDataKeys.map((key) => ({
    field: key,
    headerName: normalizeKey(key),
    type: key === 'id' || key === 'label' ? 'string': 'number',
    sortable: key === 'id' ? false : true,
    width: 225 
  }));

  const tableRows = tabledData.map(row => ({
    id: row.id,
    label: row.label,
    'margin_abs_perc_on_tot': formatNumber(row.margin_abs_perc_on_tot),
    'margin_perc': formatNumber(row.margin_perc),
    'order_count': formatNumber(row.order_count),
    'order_count_perc_on_tot': formatNumber(row.order_count_perc_on_tot),
    'revenue_perc_on_tot': formatNumber(row.margin_abs_perc_on_tot),
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

export default KpisTable;
