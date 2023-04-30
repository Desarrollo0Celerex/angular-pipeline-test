import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { SINISTER_STATUS } from '@constants/global';
import { ChartHelper } from '@helpers/chart.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ChartSinistersService {
    charData: any[] = [];

    constructor(private _sinisterService: SinisterService) {}

    generateChartData(statistics: StatRangeData[][]): void {
        const header: any[] = [
            ['Siniestros', 'Periodo Seleccionado', 'Periodo Comparación'],
        ];
        this.charData = ChartHelper.generateChartDataByRanges(
            statistics,
            header
        );
    }

    loadStatistics(
        insuranceId: number,
        range: ComparisonRangeData
    ): Observable<StatRangeData[][]> {
        this.charData = [];
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'sinisterStatusId',
            [
                SINISTER_STATUS.RECENT,
                SINISTER_STATUS.PENDING,
                SINISTER_STATUS.UNFINISHED,
                SINISTER_STATUS.CONFLICTIVE,
                SINISTER_STATUS.FINISHED,
            ]
        );
        const rangeField: string = 'sinisterDate';
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(
            this._sinisterService.getInsuranceSinisterStatistics(
                insuranceId,
                filters,
                rangeField,
                range.selectedRangeStart,
                range.selectedRangeEnd
            )
        );
        requests.push(
            this._sinisterService.getInsuranceSinisterStatistics(
                insuranceId,
                filters,
                rangeField,
                range.comparedRangeStart,
                range.comparedRangeEnd
            )
        );
        return forkJoin(requests);
    }
}
