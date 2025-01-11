import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-create-facebook-account',
    templateUrl: './modal-confirm-create-facebook-account.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmCreateFacebookAccountComponent { 
    @Input() modalId: string = '';

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
