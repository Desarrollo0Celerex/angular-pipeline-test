import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoadingService } from '@services/loading.service';

import { ModalConfirmDeletePolicyCompleteService } from './modal-confirm-delete-policy-complete.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-delete-policy-complete',
  templateUrl: './modal-confirm-delete-policy-complete.component.html',
  styles: [
  ],
  providers: [ModalConfirmDeletePolicyCompleteService]
})
export class ModalConfirmDeletePolicyCompleteComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    @Output() policyCompleteDeleted: EventEmitter<string>;

    constructor(
        private _loadingService: LoadingService,
        private _modalConfirmDeletePolicyService: ModalConfirmDeletePolicyCompleteService
    ) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.policyCompleteDeleted = new EventEmitter<string>();
    }

    /**
     * Click event to delete the active policy
     */
    onClickConfirmDeletePolicy(): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this._modalConfirmDeletePolicyService.deleteActivePolicy(this.contactId, this.policyId).subscribe( () => {
            this._loadingService.hide();
            this.policyCompleteDeleted.emit(this.policyId);
        });
    }
}
