import type {ActiveView} from "../types/common";

export const formatNumber = (number: number, decimals = 2): string => {
  return parseFloat(number.toFixed(decimals)).toString();
};

export const normalizeKey = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const unitMappings: Record<string, string> = {
  active_carriers: 'unit',
  active_clients: 'unit',
  new_carriers: 'unit',
  new_clients: 'unit',
  total_assigned_count: 'unit',
  total_order_count: 'unit',
  average_margin_perc: '%',
  avg_order_margin_abs: '%',
  avg_order_revenue: '€',
  total_margin_abs: '€',
  total_revenue: '€'
};

export const suffixUnit = (key: string): string => {
  return unitMappings[key] || '';
};

const pathMapping: Record<string, ActiveView> = {
  active_carriers: 'carrier',
  active_clients: 'customer',
  new_carriers: 'carrier',
  new_clients: 'customer',
  total_assigned_count: 'metrics',
  total_order_count: 'order',
  average_margin_perc: 'metrics',
  avg_order_margin_abs: 'order',
  avg_order_revenue: 'order',
  total_margin_abs: 'metrics',
  total_revenue: 'metrics'
};

export const pathOverview = (key: string): ActiveView => {
  return pathMapping[key] || 'home';
};
