import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { PaymentService } from '@core/services/payment/payment.service';
import { PayTrackerService } from '@features-legacy/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-workspace-payment-list',
    templateUrl: './workspace-payment-list.container.html',
    styles: [],
})
export class WorkspacePaymentListContainer
    extends SmartComponent
    implements OnInit
{
    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    paymentStatusId: number = 0;
    payments: Payment[] = [];
    page: number = 1;
    perPage: number = 12;
    totalItems: number = 0;
    @Output() loadPolicy: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _paymentService: PaymentService,
        private _payTrackerService: PayTrackerService
    ) {
        super();
    }

    ngOnInit(): void {
        this._payTrackerService.paymentStatusId
            .pipe(this.untilComponentDestroy())
            .subscribe((paymentStatusId: number) => {
                this.paymentStatusId = paymentStatusId;
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

    loadMoreContents(): void {
        this.page++;
        this._loadPayments();
    }

    reloadContent(): void {
        this._payTrackerService.reloadContent();
    }

    requestLoadPolicy(): void {
        this.loadPolicy.emit();
    }

    private _loadPayments(): void {
        this.isLoadingContent = true;
        const fields: string =
            'paymentId,contactId,insurerImageUrl,paymentSourceTypeId,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceId,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment,isAutoPayment,paymentPlanId,pendingReceipts,paymentPlanReceips,netPay,feePay,coverPay,extraPay,taxPay,discount,endorsementNumber,paymentSource,lastReminderDate,lastReminderTypeId,totalReminders,licenseId,titularName';
        const filter: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [this.paymentStatusId]
        );
        const sortBy: string = 'paymentDate';
        this._paymentService
            .getWorkspacePayments(
                this.page,
                this.perPage,
                fields,
                filter,
                sortBy
            )
            .pipe(this.untilComponentDestroy())
            .subscribe((res: HttpResponseItems) => {
                this.payments = this.payments.concat(res.items);
                this.totalItems = res.totalItems;
                this.isLoadingContent = false;
                this.isLoadedContent = true;
            });
    }
}
