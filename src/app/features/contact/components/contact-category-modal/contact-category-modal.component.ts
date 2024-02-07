import { Component, OnInit, ViewChild } from '@angular/core';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';
import { ContactTypeModalComponent } from '../contact-type-modal/contact-type-modal.component';
import { SearchContactModalComponent } from '../search-contact-modal/search-contact-modal.component';
import { ContactCategoryModalService } from './contact-category-modal.service';
import { SmartComponent } from '@core/classes/smart-component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-contact-category-modal',
    templateUrl: './contact-category-modal.component.html',
    styles: [],
})
export class ContactCategoryModalComponent
    extends SmartComponent
    implements OnInit
{
    @ViewChild(ContactTypeModalComponent)
    contactTypeModalComponent!: ContactTypeModalComponent;
    @ViewChild(SearchContactModalComponent)
    searchContactModalComponent!: SearchContactModalComponent;
    description = '';
    modalId = 'agt-contact-category-modal';
    title = '';
    private _contactAction = 0;
    private _contactId: string | undefined = undefined;
    private _policyId: string | undefined = undefined;

    constructor(
        private _contactCategoryModalService: ContactCategoryModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._contactCategoryModalService.contactCategoryModal$
            .pipe(this.untilComponentDestroy())
            .subscribe(
                (data: {
                    contactAction: CONTACT_ACTIONS;
                    contactId?: string;
                    policyId?: string;
                }) => {
                    this._contactAction = data.contactAction;
                    this._contactId = data.contactId;
                    this._policyId = data.policyId;
                    this._openModal();
                }
            );
    }

    searchContact(): void {
        this.searchContactModalComponent.openModal({
            contactAction: this._contactAction,
            contactId: this._contactId,
            policyId: this._policyId,
        });
    }

    selectContactType(): void {
        this.contactTypeModalComponent.openModal({
            contactAction: this._contactAction,
            contactId: this._contactId,
            policyId: this._policyId,
        });
    }

    private _generateTitleAndDescription(): void {
        switch (this._contactAction) {
            case CONTACT_ACTIONS.CREATE_QUOTATION:
                this.title = 'Cotizar Seguro';
                this.description =
                    'Selecciona a quién le deseas cotizar un nuevo seguro.';
                break;

            case CONTACT_ACTIONS.CREATE_POLICY:
            case CONTACT_ACTIONS.RENEW_POLICY:
            case CONTACT_ACTIONS.REISSUE_POLICY:
                this.title = 'Cargar Póliza';
                this.description =
                    'Selecciona a quién le deseas cargar la póliza.';
                break;
        }
    }

    private _openModal(): void {
        this._generateTitleAndDescription();
        ModalPlugin.show(this.modalId);
    }
}
