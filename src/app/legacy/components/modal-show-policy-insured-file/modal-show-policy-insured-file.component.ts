import { Component, Input } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-policy-insured-file',
  templateUrl: './modal-show-policy-insured-file.component.html',
  styles: [
  ]
})
export class ModalShowPolicyInsuredFileComponent {
    @Input() modalId: string = '';
    @Input() policyInsuredUrl: string = '';
    correctionLevel: any = NgxQrcodeErrorCorrectionLevels.HIGH;
    elementType: any = NgxQrcodeElementTypes.URL;

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
