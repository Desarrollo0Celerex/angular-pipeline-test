import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoadingService } from '@core/services/loading/loading.service';

import { ModalConfirmDeletePolicyService } from './modal-confirm-delete-policy.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-delete-policy',
    templateUrl: './modal-confirm-delete-policy.component.html',
    styles: [],
})
export class ModalConfirmDeletePolicyComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    @Output() policyDeleted: EventEmitter<string>;

    constructor(
        private _loadingService: LoadingService,
        private _modalConfirmDeletePolicyService: ModalConfirmDeletePolicyService
    ) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.policyDeleted = new EventEmitter<string>();
    }

    /**
     * Click event to delete the contact policy
     */
    onClickConfirmDeletePolicy(): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this._modalConfirmDeletePolicyService
            .deleteIncompletePolicy(this.contactId, this.policyId)
            .subscribe(() => {
                this._loadingService.hide();
                this.policyDeleted.emit(this.policyId);
            });
    }
}
