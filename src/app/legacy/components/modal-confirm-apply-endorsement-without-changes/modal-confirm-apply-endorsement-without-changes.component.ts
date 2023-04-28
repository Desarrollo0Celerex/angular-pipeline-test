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
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }
}
