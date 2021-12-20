import { Injectable } from '@angular/core';

import { SINISTER_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class CardKpiTotalOpenSinistersService {
    totalOpenSinisters: number = 0;

    constructor(private _sinisterService: SinisterService) { }

    loadTotalOpenSinisters(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE]);
        this._sinisterService.getTotalSinisters(filters).subscribe((res: number) => {
            this.totalOpenSinisters = res;
        })
    }
}
