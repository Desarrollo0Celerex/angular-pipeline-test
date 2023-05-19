import { Component, OnInit } from '@angular/core';
import { PAYMENT_STATUS } from '@configs/constants.config';
import { SmartComponent } from '@core/classes/smart-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { PaymentService } from '@core/services/payment/payment.service';
import { PayTrackerService } from '@modules/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-search-payment-list',
    templateUrl: './search-payment-list.container.html',
    styles: [],
})
export class SearchPaymentListContainer
    extends SmartComponent
    implements OnInit
{
    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    payments: Payment[] = [];
    page: number = 1;
    perPage: number = 12;
    query: string = '';
    totalItems: number = 0;

    constructor(
        private _paymentService: PaymentService,
        private _payTrackerService: PayTrackerService
    ) {
        super();
    }

    ngOnInit(): void {
        this._payTrackerService.query
            .pipe(this.untilComponentDestroy())
            .subscribe((query: string) => {
                this.query = query;
                this.initData();
            });
        this._payTrackerService.canReloadContent
            .pipe(this.untilComponentDestroy())
            .subscribe((canReloadContent: boolean) => {
                if (canReloadContent) {
                    this.initData();
                }
            });
    }

    initData(): void {
        this.page = 1;
        this.payments = [];
        this.isLoadedContent = false;
        this._loadPayments();
    }

    reloadContent(): void {
        this.initData();
    }

    loadMoreContents(): void {
        this.page++;
        this._loadPayments();
    }

    private _loadPayments(): void {
        this.isLoadingContent = true;
        const fields: string =
            'paymentId,contactId,insurerImageUrl,paymentSourceTypeId,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceId,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment,isAutoPayment,paymentPlanId,pendingReceipts,paymentPlanReceips,netPay,feePay,coverPay,extraPay,taxPay,discount,endorsementNumber,paymentSource,lastReminderDate,lastReminderTypeId,totalReminders,licenseId';
        const filter: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [
                PAYMENT_STATUS.IN_TRANSIT,
                PAYMENT_STATUS.IN_TIME,
                PAYMENT_STATUS.LATE,
                PAYMENT_STATUS.OVERDUE,
            ]
        );
        const sortBy: string = 'paymentDate';
        const search: string = `multiple:${this.query}`;
        // Send value (-1) to hide the results in the search engine while the new search is loading.
        this._payTrackerService.setTotalResults(-1);
        this._paymentService
            .getWorkspacePayments(
                this.page,
                this.perPage,
                fields,
                filter,
                sortBy,
                search
            )
            .pipe(this.untilComponentDestroy())
            .subscribe((res: HttpResponseItems) => {
                this.payments = this.payments.concat(res.items);
                this.totalItems = res.totalItems;
                this.isLoadingContent = false;
                this.isLoadedContent = true;
                this._payTrackerService.setTotalResults(res.totalItems);
            });
    }
}
