import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { Stat } from '@interfaces/stat.interface';
import { ContactSourceService } from '@services/contact-source.service';

@Injectable()
export class ChartLeadAcquisitionChannelsService {
    contactSourcesStatsData: any[] = [];

    constructor(private _contactSourceService: ContactSourceService) { }

    getContactSourcesStats(range: ComparisonRangeData): Observable<Stat[][]> {
        this.contactSourcesStatsData = [];
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._contactSourceService.getContactSourcesStats('', rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._contactSourceService.getContactSourcesStats('', rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadContactSourcesStatsData(contactSourcesStats: Stat[][]): void {
        for (let contactSourceStats of contactSourcesStats[0]) {
                this.contactSourcesStatsData.push([contactSourceStats.name]);
        }
        for (let index in contactSourcesStats[0]) {
            for (let contactSourceStats of contactSourcesStats) {
                this.contactSourcesStatsData[parseInt(index)].push(contactSourceStats[index].value);
            }
        }
        this.contactSourcesStatsData.unshift(['Canal', 'Periodo Seleccionado', 'Periodo Comparación']);
    }
}
