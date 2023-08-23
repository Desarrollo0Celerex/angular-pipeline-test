import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { PaymentApplied } from '@core/interfaces/payment-applied.interface';
import { ReceipPaidService } from '@core/services/receip-paid/receip-paid.service';
import { PayTrackerService } from '@features-legacy/pay-tracker/services/pay-tracker/pay-tracker.service';

@Component({
    selector: 'agt-payments-applied-list',
    templateUrl: './payments-applied-list.component.html',
    styles: [],
})
export class PaymentsAppliedListComponent
    extends SmartComponent
    implements OnChanges
{
    @Input() partnerId: string = '';
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';
    @Input() specialFilter: string = '';
    @Output() loadPolicy: EventEmitter<void> = new EventEmitter<void>();
    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    payments: PaymentApplied[] = [];
    page: number = 1;
    perPage: number = 12;
    totalItems: number = 0;

    constructor(
        private _receipPaidService: ReceipPaidService,
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
            'receiptPaidId,contactId,policyId,paymentId,insurerImageUrl,paymentSourceTypeName,insuranceName,paymentPlanName,insuranceTypeName,insuranceBackground,insuranceIcon,policyNumber,receiptsAmount,applicationDate,paymentAmountPaid,coveredProperty,paymentSourceTypeId,paymentSource,isAutoPayment,insuranceId,endorsementNumber,currencyName,previouslyAppliedReceipts,bills,paymentDate,paymentReference';
        const filter: string = '';
        const sortBy: string = 'applicationDate';
        this._receipPaidService
            .getPartnerReceipsPaid(
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
