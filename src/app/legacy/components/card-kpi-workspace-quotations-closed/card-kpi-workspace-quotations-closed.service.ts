import { Injectable } from '@angular/core';

import { QUOTATION_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class CardKpiWorkspaceQuotationsClosedService {
    totalWorkspaceQuotations: number | null = null;
    totalWorkspaceQuotationsClosed: number | null = null;

    constructor(private _quotationService: QuotationService) { }

    loadTotalWorkspaceQuotations(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('quotationStatusId', [QUOTATION_STATUS.PENDING, QUOTATION_STATUS.ACCEPTED, QUOTATION_STATUS.REJECTED]);
        this._quotationService.getTotalWorkspaceQuotations(filters, range.rangeField, range.rangeStart, range.rangeEnd).subscribe((res: number) => {
            this.totalWorkspaceQuotations = res;
        });
    }

    loadTotalWorkspaceQuotationsClosed(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('quotationStatusId', [QUOTATION_STATUS.ACCEPTED, QUOTATION_STATUS.REJECTED]);
        this._quotationService.getTotalWorkspaceQuotations(filters, range.rangeField, range.rangeStart, range.rangeEnd).subscribe((res: number) => {
            this.totalWorkspaceQuotationsClosed = res;
        });
    }
}
