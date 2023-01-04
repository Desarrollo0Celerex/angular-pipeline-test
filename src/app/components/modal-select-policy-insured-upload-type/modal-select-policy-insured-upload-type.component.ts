import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name'

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-policy-insured-upload-type',
  templateUrl: './modal-select-policy-insured-upload-type.component.html',
  styles: [
  ]
})
export class ModalSelectPolicyInsuredUploadTypeComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(private _router: Router) { }

    goToCreatePolicyInsured(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.createPolicyInsured(this.contactId, this.policyId));
    }

    goToImportPolicyInsureds(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.importPolicyInsureds(this.contactId, this.policyId));
    }
}
