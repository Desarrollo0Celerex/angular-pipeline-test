import { Component } from '@angular/core';
declare var ModalPlugin: any;
@Component({
    selector: 'agt-payments',
    templateUrl: './payments.page.html',
    styles: [],
})
export class PaymentsPage {
    modalIdSelectContactAction: string = 'agt-modal-select-contact-action';
    modalIdSelectContactType: string = 'agt-modal-select-contact-type';
    modalIdSearchContact: string = 'agt-modal-search-contact';

    showModalToSelectContactAction(): void {
        ModalPlugin.show(this.modalIdSelectContactAction);
    }

    showModalToSelectContactType(): void {
        ModalPlugin.show(this.modalIdSelectContactType);
    }

    showModalToSearchContact(): void {
        ModalPlugin.show(this.modalIdSearchContact);
    }
}
