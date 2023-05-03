import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { PaymentService } from '@core/services/payment/payment.service';

@Component({
    selector: 'agt-payment-list',
    templateUrl: './payment-list.container.html',
    styles: [],
})
export class PaymentListContainer extends SmartComponent implements OnChanges {
    @Input() contentType: number = 0;
    @Input() paymentStatusId: number = 0;
    isLoadedContent: boolean = false;
    isLoadingContent: boolean = false;
    payments: Payment[] = [];
    page: number = 1;
    perPage: number = 12;
    totalItems: number = 0;
    totalItemsLoaded: number = 0;

    constructor(private _paymentService: PaymentService) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.paymentStatusId && changes.paymentStatusId.currentValue) {
            this.page = 1;
            this.payments = [];
            this.isLoadedContent = false;
            this._loadPayments();
        }
    }

    get hasResults(): boolean {
        return this.payments.length > 0;
    }

    loadMoreContents(): void {
        this.page++;
        this._loadPayments();
    }

    showModalToSelectContactAction(): void {
        console.log('Mostrar modal para seleccionar la acción del contacto.');
    }

    private _loadPayments(): void {
        this.isLoadingContent = true;
        const fields: string =
            'paymentId,contactId,insurerImageUrl,paymentSourceTypeId,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceId,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment,isAutoPayment,paymentPlanId,pendingReceipts,paymentPlanReceips,netPay,feePay,coverPay,extraPay,taxPay,discount,endorsementNumber';
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
                this.totalItemsLoaded = this.payments.length;
                this.isLoadingContent = false;
                this.isLoadedContent = true;
            });
    }
}
