import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-delete-renewed-policy',
    templateUrl: './modal-confirm-delete-renewed-policy.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmDeleteRenewedPolicyComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }
}
