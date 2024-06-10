import type {Nullable} from "./common";

// Decoding params
type AggregatedBy = 'day' | 'week' | 'month';
type TimeTarget = 'pickup_date' | 'created_at';

export interface ResParam {
  aggregateBy: AggregatedBy,
  timeTarget: TimeTarget,
  startDate: Nullable<string>,
  endDate: Nullable<string>
}

// Decoding Response
interface DataTableEntity {
  active_carrier: number,
  active_client: number,
  aggregate_date: string,
  assigned_count: number,
  margin_abs: number,
  margin_abs_per_order: number,
  margin_perc: number,
  new_carriers: number,
  new_clients: number,
  order_count: number,
  order_per_period: number,
  revenue: number,
  revenue_assigned: number,
  revenue_per_order: number
}

interface HistogramEntity {
  date: string
}

interface TimeMarginPercEntity extends HistogramEntity {
  margin_perc: number
}

interface TimeOrderCountEntity extends HistogramEntity {
  order_count: number
}

interface TimeRevenueEntity extends HistogramEntity {
  margin_abs: number,
  revenue: number
}

type HistogramCluster = Array<TimeMarginPercEntity | TimeOrderCountEntity | TimeRevenueEntity>;

type IndexteBy = 'date';

interface HistogramGroup {
  data: HistogramCluster,
  index_by: IndexteBy
}

interface Histograms {
  'time_margin_perc': HistogramGroup,
  'time_order_count': HistogramGroup,
  'time_revenue': HistogramGroup
}

interface KpisEntity {
  label: string,
  margin_abs: number,
  margin_abs_per_order: number,
  margin_abs_perc_on_tot: number,
  margin_perc: number,
  order_count: number,
  order_count_perc_on_tot: number,
  revenue: number,
  revenue_per_order: number,
  revenue_perc_on_tot: number
}

interface KipsGroup {
  [key: string]: KpisEntity;
}

interface Kips {
  carrier: KipsGroup,
  client: KipsGroup
}

interface Scalars {
  'active_carriers': number,
  'active_clients': number,
  'average_margin_perc': number,
  'avg_order_margin_abs': number,
  'avg_order_revenue': number
  'new_carriers': number,
  'new_clients': number,
  'total_assigned_count': number,
  'total_margin_abs': number,
  'total_order_count': number,
  'total_revenue': number,
}

export interface Statistics {
  'data_table': DataTableEntity[],
  histograms: Histograms,
  kpis: Kips,
  scalars: Scalars,
}
