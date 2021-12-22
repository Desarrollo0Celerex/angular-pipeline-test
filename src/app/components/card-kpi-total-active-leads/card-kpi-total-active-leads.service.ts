import { Injectable } from '@angular/core';

import { LEAD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { LeadService } from '@services/lead.service';

@Injectable()
export class CardKpiTotalActiveLeadsService {
    totalActiveLeads: number = 0;

    constructor(private _leadService: LeadService) { }

    loadTotalLeads(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED]);
        this._leadService.getTotalLeads(filters).subscribe((res: number) => {
            this.totalActiveLeads = res;
        })
    }
}
