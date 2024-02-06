import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { SelectClientTypeModalService } from './select-client-type-modal.service';
import { CreatePolicyModalService } from '@policy/components/create-policy-modal/create-policy-modal.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-select-client-type-modal',
    templateUrl: './select-client-type-modal.component.html',
    styles: [],
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
    private _policyAction = 0;

    constructor(
        private _selectClientTypeModalService: SelectClientTypeModalService,
        private _createPolicyModalService: CreatePolicyModalService
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
                this._policyAction = data.policyAction;
                this._openModal();
            });
    }

    createPolicy(): void {
        this._createPolicyModalService.openModal({
            contactId: this._contactId,
            contactType: undefined,
            policyAction: this._policyAction,
            oldPolicyId: this._policyId,
            newContactId: this._contactId,
        });
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
