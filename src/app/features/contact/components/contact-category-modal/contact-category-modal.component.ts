import { Component, ViewChild } from '@angular/core';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { ContactTypeModalComponent } from '../contact-type-modal/contact-type-modal.component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-contact-category-modal',
    templateUrl: './contact-category-modal.component.html',
    styles: [],
})
export class ContactCategoryModalComponent {
    @ViewChild(ContactTypeModalComponent)
    contactTypeModalComponent!: ContactTypeModalComponent;
    description = '';
    modalId = 'agt-contact-category-modal';
    title = '';
    private _contactAction = 0;

    openModal(contactAction: CONTACT_ACTIONS): void {
        this._contactAction = contactAction;
        this._generateTitleAndDescription();
        ModalPlugin.show(this.modalId);
    }

    selectContactType(): void {
        this.contactTypeModalComponent.openModal(this._contactAction);
    }

    private _generateTitleAndDescription(): void {
        switch (this._contactAction) {
            case CONTACT_ACTIONS.CREATE_QUOTATION:
                this.title = 'Cotizar Seguro';
                this.description =
                    'Selecciona a quién le deseas cotizar un nuevo seguro.';
                break;

            case CONTACT_ACTIONS.CREATE_POLICY:
                this.title = 'Cargar Póliza';
                this.description =
                    'Selecciona a quién le deseas cargar la póliza.';
                break;
        }
    }
}
