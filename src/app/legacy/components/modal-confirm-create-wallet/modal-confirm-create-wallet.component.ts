import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-create-wallet',
    templateUrl: './modal-confirm-create-wallet.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmCreateWalletComponent {
    @Input() modalId: string = '';
    @Output() actionConfirmed: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.actionConfirmed.emit();
    }
}
