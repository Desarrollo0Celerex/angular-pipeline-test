import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-update-policy-insured',
    templateUrl: './modal-confirm-update-policy-insured.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmUpdatePolicyInsuredComponent {
    @Input() modalId: string = '';
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.confirmedAction.emit();
    }
}
