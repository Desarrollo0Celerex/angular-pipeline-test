import { Component, ViewChild } from '@angular/core';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { CreateContactModalComponent } from '../create-contact-modal/create-contact-modal.component';
import { CONTACT_TYPES } from '@contact/enums/contact-types.enum';

declare var ModalPlugin: any;
@Component({
    selector: 'agt-contact-type-modal',
    templateUrl: './contact-type-modal.component.html',
    styles: [],
})
export class ContactTypeModalComponent {
    @ViewChild(CreateContactModalComponent)
    createContactModalComponent!: CreateContactModalComponent;
    modalId = 'agt-contact-type-modal';
    private _contactAction = 0;

    createCompany(): void {
        this.createContactModalComponent.openModal(
            this._contactAction,
            CONTACT_TYPES.COMPANY
        );
    }

    createPerson(): void {
        this.createContactModalComponent.openModal(
            this._contactAction,
            CONTACT_TYPES.PERSON
        );
    }

    openModal(contactAction: CONTACT_ACTIONS): void {
        this._contactAction = contactAction;
        ModalPlugin.show(this.modalId);
    }
}
