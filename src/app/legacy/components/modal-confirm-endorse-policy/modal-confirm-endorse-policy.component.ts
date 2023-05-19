import { Component, Input } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-endorse-policy',
  templateUrl: './modal-confirm-endorse-policy.component.html',
  styles: [
  ]
})
export class ModalConfirmEndorsePolicyComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    ROUTES_NAME: any;

    constructor() {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.ROUTES_NAME = ROUTES_NAME;
    }

    /**
     * Event to close the modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
