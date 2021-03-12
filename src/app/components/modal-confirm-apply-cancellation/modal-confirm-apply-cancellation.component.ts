import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-apply-cancellation',
  templateUrl: './modal-confirm-apply-cancellation.component.html',
  styles: [
  ]
})
export class ModalConfirmApplyCancellationComponent {
    @Input() modalId: string;
    @Output() actionConfirmed: EventEmitter<void>;

    constructor() {
        this.modalId = '';
        this.actionConfirmed = new EventEmitter<void>();
    }

    /**
     * Click event to comfirm action
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
