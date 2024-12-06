import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ContainerCharts } from '@core/interfaces/container-charts.interface';
import { ContainerFilters } from '@interfaces/container-filters.interface';

export class FiltersHelper {
    static generateFiltersData(
        containerCharts: ContainerCharts
    ): ContainerFilters {
        const filtersData: ContainerFilters = {
            insurances: {
                filters: [],
                specialFilter: '',
            },
            insurers: {
                filters: [],
                specialFilter: '',
            },
            contactTypes: {
                filters: [],
                specialFilter: '',
            },
        };

        if (containerCharts.insurances) {
            const insuranceIds: number[] = [];
            for (let insuranceData of containerCharts.insurances) {
                filtersData.insurances.filters.push({
                    id: insuranceData.id,
                    name: insuranceData.name,
                    selected: true,
                });
                insuranceIds.push(insuranceData.id);
            }
            filtersData.insurances.specialFilter =
                UtilitiesHelper.generateHttpFilter('insuranceId', insuranceIds);
        }

        if (containerCharts.insurers) {
            const insurerIds: number[] = [];
            for (let insurerData of containerCharts.insurers) {
                filtersData.insurers.filters.push({
                    id: insurerData.id,
                    name: insurerData.name,
                    selected: true,
                });
                insurerIds.push(insurerData.id);
            }
            filtersData.insurers.specialFilter =
                UtilitiesHelper.generateHttpFilter('insurerId', insurerIds);
        }

        if (containerCharts.contactTypes) {
            const contactTypeIds: number[] = [];
            for (let contactTypeData of containerCharts.contactTypes) {
                filtersData.contactTypes.filters.push({
                    id: contactTypeData.id,
                    name: contactTypeData.name,
                    selected: true,
                });
                contactTypeIds.push(contactTypeData.id);
            }
            filtersData.contactTypes.specialFilter =
                UtilitiesHelper.generateHttpFilter(
                    'contactTypeId',
                    contactTypeIds
                );
        }
        return filtersData;
    }
}
