import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-delete-contact',
  templateUrl: './modal-confirm-delete-contact.component.html',
  styles: [
  ]
})
export class ModalConfirmDeleteContactComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
