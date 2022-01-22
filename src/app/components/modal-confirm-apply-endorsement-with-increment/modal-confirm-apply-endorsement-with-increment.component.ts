import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ENDORSEMENT_PAYMENT_METHODS } from '@constants/global';

declare var ModalPlugin: any;
@Component({
  selector: 'agt-modal-confirm-apply-endorsement-with-increment',
  templateUrl: './modal-confirm-apply-endorsement-with-increment.component.html',
  styles: [
  ]
})
export class modalConfirmApplyEndorsementWithIncrementComponent {
    @Input() currencyName: string = "";
    @Input() capturedFractionalReceiptAmount: number = 0;
    @Input() endorsementAmount: number = 0;
    @Input() endorsementEmissionDate: string = '';
    @Input() modalId: string = "";
    @Input() policyAmount: number = 0;
    @Input() selectedEndorsementPaymentMethod: number = 0;
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();
    ENDORSEMENT_PAYMENT_METHODS: any = ENDORSEMENT_PAYMENT_METHODS;

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
