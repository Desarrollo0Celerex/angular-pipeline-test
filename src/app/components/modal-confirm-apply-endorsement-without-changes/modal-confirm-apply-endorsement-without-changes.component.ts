import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-apply-endorsement-without-changes',
  templateUrl: './modal-confirm-apply-endorsement-without-changes.component.html',
  styles: [
  ]
})
export class ModalConfirmApplyEndorsementWithoutChangesComponent {
    @Input() modalId: string = '';
    @Output() endorsementApplicationConfirmed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Click event to confirm the enorsement application without changes
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.endorsementApplicationConfirmed.emit();
    }
}
