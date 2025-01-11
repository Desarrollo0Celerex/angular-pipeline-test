import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-cancel-policy-insured',
    templateUrl: './modal-confirm-cancel-policy-insured.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmCancelPolicyInsuredComponent {
    @Input() modalId: string = '';
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.confirmedAction.emit();
    }
}
