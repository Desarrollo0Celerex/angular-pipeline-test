import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-apply-policy-changes',
  templateUrl: './modal-confirm-apply-policy-changes.component.html',
  styles: [
  ]
})
export class ModalConfirmApplyPolicyChangesComponent {
    @Input() modalId: string;
    @Output() policyChangesApplicationConfirmed: EventEmitter<void>;

    constructor() {
        this.modalId = '';
        this.policyChangesApplicationConfirmed = new EventEmitter<void>();
    }

    /**
     * Click event to confirm application of policy changes
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.policyChangesApplicationConfirmed.emit();
    }

}
