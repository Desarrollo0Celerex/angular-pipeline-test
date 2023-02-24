import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ACTION_TYPES, CONTENT_TYPES } from '@constants/global';
import { ContentResultData } from '@interfaces/content-result-data.interface';
import { Policy } from '@interfaces/policy.interface';

declare var ModalPlugin: any; 

@Component({
  selector: 'agt-content-results',
  templateUrl: './content-results.component.html',
  styles: [
  ]
})
export class ContentResultsComponent {
    @Input() contentResultData: ContentResultData;
    @Input() contentSubtypeName: string;
    @Input() contentType: number = 0;
    @Input() contentTypeName: string;
    @Input() isLoadingContent: boolean;
    @Output() loadMoreContents: EventEmitter<void>;
    CONTENT_TYPES: any = CONTENT_TYPES;
    contactActionType: number = 0;
    contactActionTitle: string = '';
    contactActionDescription: string = '';
    contactTypeTitle: string = '';
    contactTypeDescription: string = '';
    modalIdCreateSinister: string = 'cr-modal-create-sinister';
    modalIdSearchContact: string = 'cr-modal-search-contact';
    modalIdSearchPolicy: string = 'cr-modal-search-policy';
    modalIdSelectContactAction: string = 'cr-modal-select-contact-action';
    modalIdSelectContactType: string = 'cr-modal-select-contact-type';
    selectedContactId: string = '';
    selectedPolicyId: string = '';
    selectedInsuranceId: number = 0;

    constructor() {
        this.contentResultData = {
            loadedItems: 0,
            totalItems: 0
        };
        this.contentTypeName = '';
        this.contentSubtypeName = '';
        this.isLoadingContent = false;
        this.loadMoreContents = new EventEmitter();
    }

    /**
     * Event to load more contents
     */
    onLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }

    createSinister(policy: Policy): void {
        this.selectedContactId = policy.contactId;
        this.selectedPolicyId = policy.policyId;
        this.selectedInsuranceId = policy.insuranceId;
        ModalPlugin.show(this.modalIdCreateSinister);
    }

    showModalToReportSinister(): void {
        ModalPlugin.show(this.modalIdSearchPolicy);
    }

    showModalToSearchContact(): void {
        this._selectContactActionType();
        ModalPlugin.show(this.modalIdSearchContact);
    }

    showModalToSelectContactAction(): void {
        this._selectContactActionTitle();
        ModalPlugin.show(this.modalIdSelectContactAction);
    }

    showModalToSelectContactType(): void {
        this._selectContactTypeTitle();
        ModalPlugin.show(this.modalIdSelectContactType);
    }

    private _selectContactActionType(): void {
        switch (this.contentType) {
            case CONTENT_TYPES.WORKSPACE_QUOTATIONS_CLOSED_BY_RANGE.ID:
            case CONTENT_TYPES.WORKSPACE_QUOTATIONS_OPENED_BY_RANGE.ID:
                this.contactActionType = ACTION_TYPES.CREATE_QUOTATION;
                break;

            case CONTENT_TYPES.RENEWED_POLICIES_BY_RANGE.ID:
            case CONTENT_TYPES.WORKSPACE_POLICIES_RENEWED_BY_RANGE.ID:
            case CONTENT_TYPES.POLICY_TO_RENEW.ID:
            case CONTENT_TYPES.LAST_CANCELLED_POLICY.ID:
            case CONTENT_TYPES.WORKSPACE_POLICIES_ISSUED_BY_RANGE.ID:
            case CONTENT_TYPES.RECEIPTS_APPLIED_BY_RANGE.ID:
            case CONTENT_TYPES.PENDING_PAYMENTS_BY_RANGE.ID:
                this.contactActionType = ACTION_TYPES.CREATE_POLICY;
                break;
        }
    }

    private _selectContactActionTitle(): void {
        switch (this.contentType) {
            case CONTENT_TYPES.WORKSPACE_QUOTATIONS_CLOSED_BY_RANGE.ID:
            case CONTENT_TYPES.WORKSPACE_QUOTATIONS_OPENED_BY_RANGE.ID:
                this.contactActionTitle = 'Cotizar Seguro';
                this.contactActionDescription = 'Selecciona a quién le deseas cotizar un nuevo seguro.';
                break;

            case CONTENT_TYPES.RENEWED_POLICIES_BY_RANGE.ID:
            case CONTENT_TYPES.WORKSPACE_POLICIES_RENEWED_BY_RANGE.ID:
            case CONTENT_TYPES.POLICY_TO_RENEW.ID:
            case CONTENT_TYPES.LAST_CANCELLED_POLICY.ID:
            case CONTENT_TYPES.WORKSPACE_POLICIES_ISSUED_BY_RANGE.ID:
            case CONTENT_TYPES.RECEIPTS_APPLIED_BY_RANGE.ID:
            case CONTENT_TYPES.PENDING_PAYMENTS_BY_RANGE.ID:
                this.contactActionTitle = 'Cargar Póliza';
                this.contactActionDescription = 'Selecciona a quién le deseas cargar la póliza.';
                break;
        }
    }

    private _selectContactTypeTitle(): void {
        this.contactTypeTitle = (this.contentType === CONTENT_TYPES.WORKSPACE_CLIENTS_CONVERTED_BY_RANGE.ID) ? 'Crear Cliente' : 'Crear Prospecto';
        this.contactTypeDescription = (this.contentType === CONTENT_TYPES.WORKSPACE_CLIENTS_CONVERTED_BY_RANGE.ID) ? 'Selecciona el tipo de cliente que deseas crear.' : 'Selecciona el tipo de prospecto que deseas crear.';
    }

}
