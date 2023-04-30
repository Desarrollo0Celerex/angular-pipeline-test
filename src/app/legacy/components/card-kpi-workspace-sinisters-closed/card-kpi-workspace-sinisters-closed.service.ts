import { Injectable } from '@angular/core';

import { SINISTER_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class CardKpiWorkspaceSinistersClosedService {
    totalWorkspaceSinisters: number | null = null;
    totalWorkspaceSinistersClosed: number | null = null;

    constructor(private _sinisterService: SinisterService) {}

    loadTotalWorkspaceSinisters(range: RangeData): void {
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
        this._sinisterService
            .getTotalWorkspaceSinisters(
                filters,
                range.rangeField,
                range.rangeStart,
                range.rangeEnd
            )
            .subscribe((res: number) => {
                this.totalWorkspaceSinisters = res;
            });
    }

    loadTotalWorkspaceSinistersClosed(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'sinisterStatusId',
            [SINISTER_STATUS.FINISHED]
        );
        this._sinisterService
            .getTotalWorkspaceSinisters(
                filters,
                range.rangeField,
                range.rangeStart,
                range.rangeEnd
            )
            .subscribe((res: number) => {
                this.totalWorkspaceSinistersClosed = res;
            });
    }
}
