import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { QuotationStatus } from '@interfaces/quotation-status.interface';
import { QuotationStatusService } from '@services/quotation-status.service';

@Injectable()
export class ModalSelectQuotationStatusService {
    quotationStatus: QuotationStatus[];

    constructor(private quotationStatusService: QuotationStatusService) {
        this.quotationStatus = [];
    }

    /**
     * Get the quotation status name
     * @param  contentSubtype The content subtype
     * @return                The quotation status name
     */
    getQuotationStatusName(contentSubtype: number): string {
        const quotationStatus: QuotationStatus | undefined =
            this.quotationStatus.find(
                (element: QuotationStatus) =>
                    element.quotationStatusId === contentSubtype
            );
        return !!quotationStatus ? quotationStatus.name : '';
    }

    /**
     * Load the quotation status
     * @return Notice of action done
     */
    loadQuotationStatus(): Observable<void> {
        const fields: string = 'quotationStatusId,name';
        return new Observable((observer) => {
            this.quotationStatusService
                .getQuotationStatus(fields)
                .subscribe((res: HttpResponse) => {
                    this.quotationStatus = res.data;
                    observer.next();
                    observer.complete();
                });
        });
    }
}
