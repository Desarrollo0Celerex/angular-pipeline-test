import { ChartPieData } from '@interfaces/chart-pie-data.interface';

export interface ContainerCharts {
    insurances: ChartPieData[] | null;
    insurers: ChartPieData[] | null;
    contactTypes: ChartPieData[] | null;
}
