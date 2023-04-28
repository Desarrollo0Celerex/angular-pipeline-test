import { Component, Input, EventEmitter, Output } from '@angular/core';

import { AlertHelper } from '@helpers/alert.helper';
import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';
import { LoadingService } from '@core/services/loading.service';

import { ModalSelectPaymentRegistrationTypeService } from './modal-select-payment-registration-type.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-payment-registration-type',
    templateUrl: './modal-select-payment-registration-type.component.html',
    styles: [],
    providers: [ModalSelectPaymentRegistrationTypeService],
})
export class ModalSelectPaymentRegistrationTypeComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Output() applyPayment: EventEmitter<ShowPaymentHistoryData> =
        new EventEmitter<ShowPaymentHistoryData>();
    @Output() preauthorizedPayment: EventEmitter<void> =
        new EventEmitter<void>();

    constructor(
        private _model: ModalSelectPaymentRegistrationTypeService,
        private _loadingService: LoadingService
    ) {}

    onClickPreauthorizePayment(): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this._model.preauthorizePayment(this.paymentId).subscribe(() => {
            this._loadingService.hide();
            this.preauthorizedPayment.emit();
            AlertHelper.paymentPreauthorized();
        });
    }

    /**
     * Click event to request apply the payment
     */
    onClickApplyPayment(): void {
        ModalPlugin.hide(this.modalId);
        this.applyPayment.emit({
            policyId: this.policyId,
            contactId: this.contactId,
            paymentId: this.paymentId,
        });
    }
}
