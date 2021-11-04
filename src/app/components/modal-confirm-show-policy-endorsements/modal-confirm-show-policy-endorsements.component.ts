import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-show-policy-endorsements',
  templateUrl: './modal-confirm-show-policy-endorsements.component.html',
  styles: [
  ]
})
export class ModalConfirmShowPolicyEndorsementsComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }
}
