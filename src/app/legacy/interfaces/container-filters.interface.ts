import { ChartFilterData } from '@interfaces/chart-filter-data.interface';

export interface ContainerFilters {
    insurances: {
        filters: ChartFilterData[],
        specialFilter: string
    }
    insurers: {
        filters: ChartFilterData[],
        specialFilter: string
    },
    contactTypes: {
        filters: ChartFilterData[],
        specialFilter: string
    }
}
