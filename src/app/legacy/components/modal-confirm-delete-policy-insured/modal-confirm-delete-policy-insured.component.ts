import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-delete-policy-insured',
    templateUrl: './modal-confirm-delete-policy-insured.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmDeletePolicyInsuredComponent {
    @Input() modalId: string = '';
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.confirmedAction.emit();
    }

}
