import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { ClientService } from '@services/client.service';

@Injectable()
export class ChartGeneratedClientsService {
    clientsGeneratedStatsData: any[] = [];

    constructor(private _clientService: ClientService) { }

    getClientsGeneratedStats(range: ComparisonRangeData): Observable<StatRangeData[][]> {
        this.clientsGeneratedStatsData = [];
        const rangeField: string = 'clientConversionDate';
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._clientService.getClientsStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._clientService.getClientsStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadClientsGeneratedStatsData(clientsGeneratedStats: StatRangeData[][]): void {
        const headerData: any[] = [['Clientes', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.clientsGeneratedStatsData = ChartHelper.generateChartDataByRanges(clientsGeneratedStats, headerData);
    }
}
