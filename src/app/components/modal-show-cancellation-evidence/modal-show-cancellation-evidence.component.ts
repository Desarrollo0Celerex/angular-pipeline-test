import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

import { ModalShowCancellationEvidenceService } from './modal-show-cancellation-evidence.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-cancellation-evidence',
  templateUrl: './modal-show-cancellation-evidence.component.html',
  styles: [
  ],
  providers: [ModalShowCancellationEvidenceService]
})
export class ModalShowCancellationEvidenceComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() cancelledPolicyId: string = '';
    correctionLevel: any = NgxQrcodeElementTypes.URL;
    elementType: any = NgxQrcodeErrorCorrectionLevels.HIGH;

    constructor(public modalShowCancellationEvidenceService: ModalShowCancellationEvidenceService) { }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.cancelledPolicyId && !!changes.cancelledPolicyId.currentValue) {
            this.modalShowCancellationEvidenceService.loadEvidenceUrl(this.cancelledPolicyId);
        }
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }

}
