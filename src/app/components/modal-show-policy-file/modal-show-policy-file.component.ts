import { Component, Input } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-policy-file',
  templateUrl: './modal-show-policy-file.component.html',
  styles: [
  ]
})
export class ModalShowPolicyFileComponent {
    @Input() modalId: string = '';
    @Input() policyUrl: string = '';
    correctionLevel: any = NgxQrcodeErrorCorrectionLevels.HIGH;
    elementType: any = NgxQrcodeElementTypes.URL;

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
