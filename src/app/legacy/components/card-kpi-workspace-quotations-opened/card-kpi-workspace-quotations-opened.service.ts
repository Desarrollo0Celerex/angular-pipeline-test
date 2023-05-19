import { Injectable } from '@angular/core';

import { QUOTATION_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class CardKpiWorkspaceQuotationsOpenedService {
    totalWorkspaceQuotationsOpened: number = 0;

    constructor(private _quotationService: QuotationService) {}

    loadTotalWorkspaceQuotationsOpened(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'quotationStatusId',
            [QUOTATION_STATUS.PENDING]
        );
        this._quotationService
            .getTotalWorkspaceQuotations(
                filters,
                range.rangeField,
                range.rangeStart,
                range.rangeEnd
            )
            .subscribe((res: number) => {
                this.totalWorkspaceQuotationsOpened = res;
            });
    }
}
