import { Component, Input, EventEmitter, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-delete-insured',
  templateUrl: './modal-confirm-delete-insured.component.html',
  styles: [
  ]
})
export class ModalConfirmDeleteInsuredComponent {
    @Input() modalId: string = '';
    @Input() certificate: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
