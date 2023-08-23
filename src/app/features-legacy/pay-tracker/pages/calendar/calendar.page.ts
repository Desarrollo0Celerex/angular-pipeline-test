import { Component } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { PaymentService } from '@core/services/payment/payment.service';
import { TotalPaymentsAmountData } from '@interfaces/total-payments-amount-data.interface';
import { PayTrackerService } from '@features-legacy/pay-tracker/services/pay-tracker/pay-tracker.service';
import * as moment from 'moment';
declare var CounterPlugin: any;

@Component({
    selector: 'agt-calendar',
    templateUrl: './calendar.page.html',
    styles: [],
})
export class CalendarPage extends SmartComponent {
    paymentDate: string = moment().format('YYYY-MM-DD');
    selectedDate: string = moment().format('DD/MM/YYYY');
    selectedDateMonthStart: string = moment()
        .startOf('month')
        .format('DD/MM/YYYY');
    selectedDateMonthEnd: string = moment().endOf('month').format('DD/MM/YYYY');
    payments: Payment[] = [];
    totalPaymentsAmount: TotalPaymentsAmountData | null = null;
    totalPaymentsAmountByMonth: TotalPaymentsAmountData | null = null;

    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    page: number = 1;
    perPage: number = 12;
    totalItems: number = 0;

    constructor(
        private _paymentService: PaymentService,
        private _payTrackerService: PayTrackerService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initData();
        this._payTrackerService.canReloadContent
            .pipe(this.untilComponentDestroy())
            .subscribe((canReloadContent: boolean) => {
                if (canReloadContent) {
                    this.initData();
                }
            });
    }

    initData(): void {
        this.initPaymentData();
        this._loadTotalPaymentsAmountAux(this.selectedDate);
        this.private_loadTotalPaymentsAmountByMonthAux(
            this.selectedDateMonthStart,
            this.selectedDateMonthEnd
        );
    }

    initPaymentData(): void {
        this.page = 1;
        this.payments = [];
        this.isLoadedContent = false;
        this._loadPayments();
    }

    loadPayments(date: any): void {
        this.paymentDate = date.format('YYYY-MM-DD');
        this.initPaymentData();
        this._loadTotalPaymentsAmount(date);
        this._loadTotalPaymentsAmountByMonth(date);
    }

    loadMoreContents(): void {
        this.page++;
        this._loadPayments();
    }

    reloadContent(): void {
        this._payTrackerService.reloadContent();
    }

    private _loadPayments(): void {
        this.isLoadingContent = true;
        const fields: string =
            'paymentId,contactId,insurerImageUrl,paymentSourceTypeId,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceId,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment,isAutoPayment,paymentPlanId,pendingReceipts,paymentPlanReceips,netPay,feePay,coverPay,extraPay,taxPay,discount,endorsementNumber,paymentSource,lastReminderDate,lastReminderTypeId,totalReminders,licenseId';
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentDate',
            [this.paymentDate]
        );
        const sortBy: string = 'paymentDate';
        this._paymentService
            .getWorkspacePayments(
                this.page,
                this.perPage,
                fields,
                filters,
                sortBy
            )
            .pipe(this.takeOne())
            .subscribe((res: HttpResponseItems) => {
                this.payments = this.payments.concat(res.items);
                this.totalItems = res.totalItems;
                this.isLoadingContent = false;
                this.isLoadedContent = true;
            });
    }

    private _loadTotalPaymentsAmount(date: any): void {
        this.selectedDate = date.format('DD/MM/YYYY');
        this._loadTotalPaymentsAmountAux(this.selectedDate);
    }

    private _loadTotalPaymentsAmountByMonth(date: any): void {
        const selectedDateMonthStartAux: string = date
            .startOf('month')
            .format('DD/MM/YYYY');
        // If was selected a new month
        if (selectedDateMonthStartAux !== this.selectedDateMonthStart) {
            this.selectedDateMonthStart = selectedDateMonthStartAux;
            this.selectedDateMonthEnd = date
                .endOf('month')
                .format('DD/MM/YYYY');
            this.private_loadTotalPaymentsAmountByMonthAux(
                this.selectedDateMonthStart,
                this.selectedDateMonthEnd
            );
        }
    }

    private _loadTotalPaymentsAmountAux(selectedDate: string): void {
        if (this.totalPaymentsAmount) {
            this.totalPaymentsAmount.totalPaymentsAmount = 0;
        }
        const rangeField: string = 'paymentDate';
        this._paymentService
            .getTotalWorkspacePaymentsAmount(
                rangeField,
                selectedDate,
                selectedDate
            )
            .subscribe((res: TotalPaymentsAmountData) => {
                this.totalPaymentsAmount = res;
                CounterPlugin.countUp('counter-total-payments-amount');
            });
    }

    private_loadTotalPaymentsAmountByMonthAux(
        rangeStart: string,
        rangeEnd: string
    ): void {
        if (this.totalPaymentsAmountByMonth) {
            this.totalPaymentsAmountByMonth.totalPaymentsAmount = 0;
        }
        const rangeField: string = 'paymentDate';
        this._paymentService
            .getTotalWorkspacePaymentsAmount(rangeField, rangeStart, rangeEnd)
            .subscribe((res: TotalPaymentsAmountData) => {
                this.totalPaymentsAmountByMonth = res;
                CounterPlugin.countUp('counter-total-payments-amount-by-month');
            });
    }
}
