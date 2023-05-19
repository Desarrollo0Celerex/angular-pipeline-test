import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { QUOTATION_STATUS } from '@constants/global';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ResumeService {
    QUOTATION_STATUS: any = QUOTATION_STATUS;
    conversionRate: number = 0;
    totalQuotations: number = 0;
    totalPendingQuotations: number = 0;
    totalQuotationsAccepted: number = 0;
    totalQuotationsRejected: number = 0;

    constructor(private _quotationService: QuotationService) {}

    /**
     * Calculate the conversion rate
     */
    calculateConversionRate(): void {
        if (this.totalQuotationsAccepted === 0) {
            this.conversionRate = 0;
        } else {
            this.totalQuotations =
                this.totalPendingQuotations +
                this.totalQuotationsAccepted +
                this.totalQuotationsRejected;
            if (this.totalQuotations === 0) {
                this.conversionRate = 0;
            } else {
                this.conversionRate = Math.ceil(
                    (this.totalQuotationsAccepted * 100) / this.totalQuotations
                );
            }
        }
    }

    /**
     * Load the total pending quotations
     * @param contactId The contact ID
     */
    loadTotalPendingQuotations(contactId: string): Observable<void> {
        return this._quotationService
            .getTotalQuotations(contactId, QUOTATION_STATUS.PENDING)
            .pipe(
                tap((res: HttpResponse) => {
                    this.totalPendingQuotations = res.data;
                }),
                map(() => {})
            );
    }

    /**
     * Load the total quotations accepted
     * @param contactId The contact ID
     */
    loadTotalQuotationsAccepted(contactId: string): Observable<void> {
        return this._quotationService
            .getTotalQuotations(contactId, QUOTATION_STATUS.ACCEPTED)
            .pipe(
                tap((res: HttpResponse) => {
                    this.totalQuotationsAccepted = res.data;
                }),
                map(() => {})
            );
    }

    /**
     * Load the total quotations rejected
     * @param contactId The contact ID
     */
    loadTotalQuotationsRejected(contactId: string): Observable<void> {
        return this._quotationService
            .getTotalQuotations(contactId, QUOTATION_STATUS.REJECTED)
            .pipe(
                tap((res: HttpResponse) => {
                    this.totalQuotationsRejected = res.data;
                }),
                map(() => {})
            );
    }
}
