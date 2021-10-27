import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { ClientService } from '@services/client.service';

@Injectable()
export class ChartLostClientsService {
    lostClientsStatsData: any[] = [];

    constructor(private _clientService: ClientService) { }

    getLostClientsStats(range: RangeData): Observable<RangeStat[][]> {
        this.lostClientsStatsData = [];
        const rangeField: string = 'clientLossDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._clientService.getClientsStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._clientService.getClientsStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadLostClientsStatsData(lostClientsStats: RangeStat[][]): void {
        const headerData: any[] = [['Clientes', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.lostClientsStatsData = ChartHelper.generateChartDataByRanges(lostClientsStats, headerData);
    }
}
