import { Component, Input, OnInit } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-reactivation-evidence',
  templateUrl: './modal-show-reactivation-evidence.component.html',
  styles: [
  ]
})
export class ModalShowReactivationEvidenceComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() evidenceUrl: string = '';
    correctionLevel: any = NgxQrcodeElementTypes.URL;
    elementType: any = NgxQrcodeErrorCorrectionLevels.HIGH;

    constructor() { }

    ngOnInit(): void { }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }

}
