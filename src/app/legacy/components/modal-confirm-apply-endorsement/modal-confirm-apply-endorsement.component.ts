import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-apply-endorsement',
    templateUrl: './modal-confirm-apply-endorsement.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmApplyEndorsementComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
