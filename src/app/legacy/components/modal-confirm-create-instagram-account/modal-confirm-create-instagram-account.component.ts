import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-create-instagram-account',
    templateUrl: './modal-confirm-create-instagram-account.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmCreateInstagramAccountComponent {
    @Input() modalId: string = '';

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
