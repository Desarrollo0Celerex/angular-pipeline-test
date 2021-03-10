import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-apply-endorsement',
  templateUrl: './modal-confirm-apply-endorsement.component.html',
  styles: [
  ]
})
export class ModalConfirmApplyEndorsementComponent {
    @Input() modalId: string;
    @Output() applyEndorsement: EventEmitter<void>;

    constructor() {
        this.modalId = '';
        this.applyEndorsement = new EventEmitter<void>();
    }

    /**
     * Click event to confirm apply endorsement
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.applyEndorsement.emit();
    }

}
