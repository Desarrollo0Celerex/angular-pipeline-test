import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class CardReportPartnerPaymentsPendingService {
    constructor(private _paymentService: PaymentService) {}

    downloadReport(
        partnerId: string,
        rangeField: string,
        rangeStart: string,
        rangeEnd: string,
        specialFilter: string,
        formatType: number
    ): Promise<void> {
        return new Promise((resolve) => {
            const filters: string = UtilitiesHelper.generateHttpFilter(
                'paymentStatusId',
                [
                    PAYMENT_STATUS.INTIME,
                    PAYMENT_STATUS.PENDING,
                    PAYMENT_STATUS.LATE,
                    PAYMENT_STATUS.OVERDUE,
                    PAYMENT_STATUS.STANDBY,
                ]
            );
            const sortBy: string = 'paymentDate';
            this._paymentService
                .downloadReportPartnerPaymentsPending(
                    partnerId,
                    filters,
                    rangeField,
                    rangeStart,
                    rangeEnd,
                    formatType,
                    sortBy,
                    specialFilter,
                )
                .then((response: any) => {
                    const filename = response.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .split('"')[1]
                        .trim();
                    const blob = new Blob([response.body], {
                        type: response.type.toString(),
                    });
                    saveAs(blob, filename);
                    resolve();
                });
        });
    }
}
