import { Component, Input } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-policy',
  templateUrl: './modal-show-policy.component.html',
  styles: [
  ]
})
export class ModalShowPolicyComponent {
    @Input() modalId: string;
    @Input() policyUrl: string;
    correctionLevel: any;
    elementType: any;

    constructor() {
        this.modalId = '';
        this.policyUrl = '';
        this.elementType = NgxQrcodeElementTypes.URL;
        this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
