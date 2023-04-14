import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-remove-workspace-insurance',
  templateUrl: './modal-confirm-remove-workspace-insurance.component.html',
  styles: [
  ]
})
export class ModalConfirmRemoveWorkspaceInsuranceComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
