import { Injectable } from '@angular/core';

import { QUOTATION_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class CardKpiTotalQuotesService {
    totalPendingQuotations: number = 0;

    constructor(private _quotationService: QuotationService) { }

    loadTotalPendingQuotations(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('quotationStatusId', [QUOTATION_STATUS.PENDING])
        this._quotationService.getTotalWorkspaceQuotations(filters).subscribe((res: number) => {
            this.totalPendingQuotations = res;
        })
    }
}
