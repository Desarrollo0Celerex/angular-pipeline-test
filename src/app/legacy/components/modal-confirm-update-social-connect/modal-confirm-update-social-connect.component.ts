import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-update-social-connect',
  templateUrl: './modal-confirm-update-social-connect.component.html',
  styles: [
  ]
})
export class ModalConfirmUpdateSocialConnectComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }

}
