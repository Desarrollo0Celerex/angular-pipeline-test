import { Component, Input } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-payment-evidence-file',
  templateUrl: './modal-show-payment-evidence-file.component.html',
  styles: [
  ]
})
export class ModalShowPaymentEvidenceFileComponent {
    @Input() modalId: string = '';
    @Input() paymentEvidenceUrl: string = '';
    correctionLevel: any = NgxQrcodeErrorCorrectionLevels.HIGH;
    elementType: any = NgxQrcodeElementTypes.URL;

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
