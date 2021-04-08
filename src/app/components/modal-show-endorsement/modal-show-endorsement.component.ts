import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

import { ModalShowEndorsementService } from './modal-show-endorsement.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-endorsement',
  templateUrl: './modal-show-endorsement.component.html',
  styles: [
  ]
})
export class ModalShowEndorsementComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() endorsementId: string = '';
    @Input() modalId: string = '';
    @Input() policyId: string = '';
    correctionLevel: any = NgxQrcodeElementTypes.URL;
    elementType: any = NgxQrcodeErrorCorrectionLevels.HIGH;

    constructor(public modalShowEndorsementService: ModalShowEndorsementService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.endorsementId.currentValue) {
            this.modalShowEndorsementService.resetEndorsementUrl();
            this.modalShowEndorsementService.loadEndorsementUrl(this.contactId, this.policyId, this.endorsementId);
        }
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
