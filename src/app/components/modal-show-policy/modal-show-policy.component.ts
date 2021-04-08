import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

import { ModalShowPolicyService } from './modal-show-policy.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-policy',
  templateUrl: './modal-show-policy.component.html',
  styles: [
  ]
})
export class ModalShowPolicyComponent implements OnChanges {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    correctionLevel: any;
    elementType: any;
    policyUrl: string;

    constructor(public modalShowPolicyService: ModalShowPolicyService) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.elementType = NgxQrcodeElementTypes.URL;
        this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
        this.policyUrl = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if((!!changes.contactId && changes.contactId.currentValue) && (!!changes.policyId && !!changes.policyId.currentValue) ) {
            this.modalShowPolicyService.resetPolicyUrl();
            this.modalShowPolicyService.loadPolicyUrl(this.contactId, this.policyId);
        }
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
