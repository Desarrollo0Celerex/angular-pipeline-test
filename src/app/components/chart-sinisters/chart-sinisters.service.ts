import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { SINISTER_STATUS } from '@constants/global';
import { ChartHelper } from '@helpers/chart.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ChartSinistersService {
    charData: any[] = [];

    constructor(private _sinisterService: SinisterService) { }

    generateChartData(statistics: RangeStat[][]): void {
        const header: any[] = [['Siniestros', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.charData = ChartHelper.generateChartDataByRanges(statistics, header);
    }

    loadStatistics(range: RangeData): Observable<RangeStat[][]> {
        this.charData = [];
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE, SINISTER_STATUS.FINISHED])
        const rangeField: string = 'sinisterDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._sinisterService.getSinisterStatistics(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._sinisterService.getSinisterStatistics(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }
}
