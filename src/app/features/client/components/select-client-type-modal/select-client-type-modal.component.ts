import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { SelectClientTypeModalService } from './select-client-type-modal.service';
import { CreatePolicyModalService } from '@policy/components/create-policy-modal/create-policy-modal.service';
import { ContactCategoryModalService } from '@contact/components/contact-category-modal/contact-category-modal.service';
import { CONTACT_ACTIONS } from '@contact/enums/contact-actions.enum';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-select-client-type-modal',
    templateUrl: './select-client-type-modal.component.html',
    styles: [],
    standalone: false
})
export class SelectClientTypeModalComponent
    extends SmartComponent
    implements OnInit
{
    modalId = 'agt-select-client-type-modal';
    modalData:
        | {
              title: string;
              description: string;
          }
        | undefined = undefined;
    private _contactId = '';
    private _policyId = '';
    private _contactAction = 0;

    constructor(
        private _selectClientTypeModalService: SelectClientTypeModalService,
        private _createPolicyModalService: CreatePolicyModalService,
        private _contactCategoryModalService: ContactCategoryModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._selectClientTypeModalService.selectClientTypeModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this.modalData = data.modalData;
                this._contactId = data.contactId;
                this._policyId = data.policyId;
                this._contactAction = data.contactAction;
                this._openModal();
            });
    }

    createPolicy(): void {
        this._createPolicyModalService.openModal({
            contactId: this._contactId,
            contactAction: this._contactAction,
            contactType: undefined,
            oldPolicyId: this._policyId,
            newContactId: this._contactId,
        });
    }

    selectContactCategory(): void {
        this._contactCategoryModalService.openModal({
            contactAction: this._contactAction,
            contactId: this._contactId,
            policyId: this._policyId,
        });
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
