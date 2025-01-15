import { Component, Input, EventEmitter, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-delete-partner',
    templateUrl: './modal-confirm-delete-partner.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmDeletePartnerComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
