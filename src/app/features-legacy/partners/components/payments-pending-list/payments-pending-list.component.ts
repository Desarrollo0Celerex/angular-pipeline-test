import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { PAYMENT_STATUS } from '@core/constants/settings';
import { SmartComponent } from '@core/classes/smart-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { PaymentService } from '@core/services/payment/payment.service';
import { PayTrackerService } from '@features-legacy/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-payments-pending-list',
    templateUrl: './payments-pending-list.component.html',
    styles: [],
})
export class PaymentsPendingListComponent
    extends SmartComponent
    implements OnChanges, OnInit
{
    @Input() partnerId: string = '';
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    @Output() loadPolicy: EventEmitter<void> = new EventEmitter<void>();
    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    payments: Payment[] = [];
    page: number = 1;
    perPage: number = 12;
    totalItems: number = 0;

    constructor(
        private _paymentService: PaymentService,
        private _payTrackerService: PayTrackerService
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initData();
    }

    ngOnInit(): void {}

    initData(): void {
        this.page = 1;
        this.payments = [];
        this.isLoadedContent = false;
        this._loadPartnerPayments();
    }

    loadMoreContents(): void {
        this.page++;
        this._loadPartnerPayments();
    }

    reloadContent(): void {
        this._payTrackerService.reloadContent();
    }

    requestLoadPolicy(): void {
        this.loadPolicy.emit();
    }

    private _loadPartnerPayments(): void {
        this.isLoadingContent = true;
        const fields: string =
            'paymentId,contactId,insurerImageUrl,paymentSourceTypeId,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceId,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment,isAutoPayment,paymentPlanId,pendingReceipts,paymentPlanReceips,netPay,feePay,coverPay,noTaxPay,extraPay,taxPay,discount,endorsementNumber,paymentSource,lastReminderDate,lastReminderTypeId,totalReminders,licenseId,titularName,firstReceiptAmount,subsequentReceiptsAmount';
        const filter: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [
                PAYMENT_STATUS.IN_TRANSIT,
                PAYMENT_STATUS.IN_TIME,
                PAYMENT_STATUS.LATE,
                PAYMENT_STATUS.OVERDUE,
                PAYMENT_STATUS.STANDBY,
            ]
        );
        const sortBy: string = 'paymentDate';
        this._paymentService
            .getPartnerPayments(
                this.partnerId,
                this.page,
                this.perPage,
                fields,
                filter,
                sortBy,
                '',
                this.rangeField,
                this.rangeStart,
                this.rangeEnd,
                this.specialFilter
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
