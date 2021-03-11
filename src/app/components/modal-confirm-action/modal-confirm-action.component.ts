import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-action',
  templateUrl: './modal-confirm-action.component.html',
  styles: [
  ]
})
export class ModalConfirmActionComponent {
    @Input() title: string;
    @Input() description: string;
    @Input() modalId: string;
    @Input() question: string;
    @Output() actionConfirmed: EventEmitter<void>;

    constructor() {
        this.title = '';
        this.description = '';
        this.modalId = '';
        this.question = '';
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
