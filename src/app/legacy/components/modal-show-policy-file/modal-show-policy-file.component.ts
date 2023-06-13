import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    NgxQrcodeErrorCorrectionLevels,
    NgxQrcodeElementTypes,
} from '@techiediaries/ngx-qrcode';

import { HttpResponse } from '@core/interfaces/http-response.interface';

import { ModalShowPolicyFileService } from './modal-show-policy-file.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-policy-file',
    templateUrl: './modal-show-policy-file.component.html',
    styles: [],
    providers: [ModalShowPolicyFileService],
})
export class ModalShowPolicyFileComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() policyUrl: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    correctionLevel: any = NgxQrcodeErrorCorrectionLevels.HIGH;
    elementType: any = NgxQrcodeElementTypes.URL;

    constructor(public _model: ModalShowPolicyFileService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.contactId && this.policyId) {
            this.loadPolicyUrl(this.contactId, this.policyId);
        }
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

    private loadPolicyUrl(contactId: string, policyId: string): void {
        this._model
            .getPolicy(contactId, policyId)
            .subscribe((res: HttpResponse) => {
                this.policyUrl = res.data.policyUrl;
            });
    }
}
