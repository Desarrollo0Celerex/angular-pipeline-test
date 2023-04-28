import { Injectable } from '@angular/core';

import { LEAD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { LeadService } from '@services/lead.service';

@Injectable()
export class CardKpiWorkspaceLeadsConvertedService {
    totalWorkspaceLeadsConverted: number = 0;

    constructor(private _leadService: LeadService) { }

    loadTotalWorkspaceLeadsConverted(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED]);
        this._leadService.getTotalLeads(filters, range.rangeField, range.rangeStart, range.rangeEnd).subscribe((res: number) => {
            this.totalWorkspaceLeadsConverted = res;
        });
    }
}
