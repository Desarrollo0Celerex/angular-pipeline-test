import { Component, Input } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-cancel-policy',
    templateUrl: './modal-confirm-cancel-policy.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmCancelPolicyComponent {
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
     * Click event to close the modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }

}
