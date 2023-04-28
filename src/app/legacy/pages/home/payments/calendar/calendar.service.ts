import { Injectable } from '@angular/core';

import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { TotalPaymentsAmountData } from '@interfaces/total-payments-amount-data.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class CalendarService {
    payments: Payment[] = [];
    totalPaymentsAmount: TotalPaymentsAmountData | null = null;
    totalPaymentsAmountByMonth: TotalPaymentsAmountData | null = null;

    constructor(private _paymentService: PaymentService) {}

    loadPayments(paymentDate: string, page: number): void {
        this.payments = [];
        const fields: string =
            'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId';
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentDate',
            [paymentDate]
        );
        this._paymentService
            .getPayments(page, fields, filters)
            .subscribe((res: HttpResponse) => {
                this.payments = res.data.items;
            });
    }

    loadTotalPaymentsAmount(selectedDate: string): void {
        const rangeField: string = 'paymentDate';
        this._paymentService
            .getTotalPaymentsAmount(rangeField, selectedDate, selectedDate)
            .subscribe((res: TotalPaymentsAmountData) => {
                this.totalPaymentsAmount = res;
            });
    }

    loadTotalPaymentsAmountByMonth(rangeStart: string, rangeEnd: string): void {
        const rangeField: string = 'paymentDate';
        this._paymentService
            .getTotalPaymentsAmount(rangeField, rangeStart, rangeEnd)
            .subscribe((res: TotalPaymentsAmountData) => {
                this.totalPaymentsAmountByMonth = res;
            });
    }
}
