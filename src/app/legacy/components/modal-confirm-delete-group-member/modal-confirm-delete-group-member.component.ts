import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-delete-group-member',
  templateUrl: './modal-confirm-delete-group-member.component.html',
  styles: [
  ]
})
export class ModalConfirmDeleteGroupMemberComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }
}
