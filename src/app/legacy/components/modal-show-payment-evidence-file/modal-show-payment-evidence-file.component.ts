import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-payment-evidence-file',
    templateUrl: './modal-show-payment-evidence-file.component.html',
    styles: [],
})
export class ModalShowPaymentEvidenceFileComponent {
    @Input() modalId: string = '';
    @Input() paymentEvidenceUrl: string = '';

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
