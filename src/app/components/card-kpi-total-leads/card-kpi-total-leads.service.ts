import { Injectable } from '@angular/core';

import { LeadService } from '@services/lead.service';

@Injectable()
export class CardKpiTotalLeadsService {
    totalActiveLeads: number = 0;

    constructor(private _leadService: LeadService) { }

    loadTotalLeads(): void {
        const filters: string = "leadConversionDate[<>]null";
        this._leadService.getTotalLeads(filters).subscribe((res: number) => {
            this.totalActiveLeads = res;
        })
    }
}
