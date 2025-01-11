import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-delete-policy-by-capture-error',
    templateUrl: './modal-confirm-delete-policy-by-capture-error.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmDeletePolicyByCaptureErrorComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }
}
