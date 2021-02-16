import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { QuotationStatus } from '@interfaces/quotation-status.interface';
import { QuotationStatusService } from '@services/quotation-status.service';

@Injectable()
export class ModalSelectQuotationStatusService {
    quotationStatus: QuotationStatus[];

    constructor(private quotationStatusService: QuotationStatusService) {
        this.quotationStatus = [];
    }

    /**
     * Load the quotation status
     */
    loadQuotationStatus(): void {
        const fields: string = 'quotationStatusId,name';
        this.quotationStatusService.getQuotationStatus(fields).subscribe( (res: HttpResponse) => {
            this.quotationStatus = res.data;
        });
    }
}
