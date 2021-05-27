import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-create-sinister',
  templateUrl: './modal-confirm-create-sinister.component.html',
  styles: [
  ]
})
export class ModalConfirmCreateSinisterComponent {
    @Input() modalId: string = '';
    @Output() createSinisterConfirmed: EventEmitter<void> = new EventEmitter<void>()

    /**
     * Click event to confirm create sinister
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this.createSinisterConfirmed.emit();
    }
}
