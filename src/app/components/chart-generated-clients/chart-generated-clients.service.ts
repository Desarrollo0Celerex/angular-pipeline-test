import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { ClientService } from '@services/client.service';

@Injectable()
export class ChartGeneratedClientsService {
    clientsGeneratedStatsData: any[] = [];

    constructor(private _clientService: ClientService) { }

    getClientsGeneratedStats(range: RangeData): Observable<RangeStat[][]> {
        this.clientsGeneratedStatsData = [];
        const rangeField: string = 'clientConversionDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._clientService.getClientsStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._clientService.getClientsStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadClientsGeneratedStatsData(clientsGeneratedStats: RangeStat[][]): void {
        const headerData: any[] = [['Clientes', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.clientsGeneratedStatsData = ChartHelper.generateChartDataByRanges(clientsGeneratedStats, headerData);
    }
}
