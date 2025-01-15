import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-create-cardium-account',
    templateUrl: './modal-confirm-create-cardium-account.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmCreateCardiumAccountComponent {
    @Input() modalId: string = '';

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
