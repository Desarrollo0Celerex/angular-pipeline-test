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
    private data?: {
        contactAction: CONTACT_ACTIONS;
        contactId?: string;
        policyId?: string;
    };

    createCompany(): void {
        this.createContactModalComponent.openModal({
            contactType: CONTACT_TYPES.COMPANY,
            ...this.data!,
        });
    }

    createPerson(): void {
        this.createContactModalComponent.openModal({
            contactType: CONTACT_TYPES.PERSON,
            ...this.data!,
        });
    }

    openModal(data: {
        contactAction: CONTACT_ACTIONS;
        contactId?: string;
        policyId?: string;
    }): void {
        this.data = data;
        ModalPlugin.show(this.modalId);
    }
}
