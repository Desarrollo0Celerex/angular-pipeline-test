import { Injectable } from '@angular/core';

import { QuotationService } from '@services/quotation.service';

@Injectable()
export class CardKpiTotalQuotesService {
    totalQuotations: number = 0;

    constructor(private _quotationService: QuotationService) { }

    loadTotalQuotations(): void {
        this._quotationService.getTotalWorkspaceQuotations().subscribe((res: number) => {
            this.totalQuotations = res;
        })
    }
}
