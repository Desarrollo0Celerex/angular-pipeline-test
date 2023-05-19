import { ChartPieData } from '@interfaces/chart-pie-data.interface';

export interface ContainerCharts {
    insurances: ChartPieData[],
    insurers: ChartPieData[],
    contactTypes: ChartPieData[]
}
