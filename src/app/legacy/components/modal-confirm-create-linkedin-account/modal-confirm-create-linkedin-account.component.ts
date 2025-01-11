import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-create-linkedin-account',
    templateUrl: './modal-confirm-create-linkedin-account.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmCreateLinkedinAccountComponent {
    @Input() modalId: string = '';

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
