import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-create-twitter-account',
    templateUrl: './modal-confirm-create-twitter-account.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmCreateTwitterAccountComponent {
    @Input() modalId: string = '';

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

}
