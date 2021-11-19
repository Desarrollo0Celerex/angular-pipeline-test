import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { Policy } from '@interfaces/policy.interface';
import { Payment } from '@interfaces/payment.interface';
import { PluralNameFormatPipe } from '@pipes/plural-name-format/plural-name-format.pipe';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-content-main-action',
  templateUrl: './content-main-action.component.html',
  styles: [
  ]
})
export class ContentMainActionComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Output() contentSubtypeNameSelected: EventEmitter<string>;
    @Output() groupCreated: EventEmitter<void> = new EventEmitter<void>();
    @Output() sinisterCreated: EventEmitter<void> = new EventEmitter<void>();
    @Output() partnerCreated: EventEmitter<void> = new EventEmitter<void>();
    @Output() paymentSelected: EventEmitter<Payment> = new EventEmitter<Payment>();
    CONTENT_TYPES: any;
    modalIdConfirmCreatePartner: string = 'agt-confirm-create-partner';
    modalIdConfirmCreateGroup: string = 'agt-confirm-create-group';
    modalIdCreateGroup: string = 'agt-create-group';
    modalIdCreatePartner: string = 'agt-create-partner';
    modalIdCreateSinister: string = 'agt-create-sinister';
    modalIdSearchPayment: string = 'agt-search-payment';
    modalIdSearchPolicy: string = 'agt-search-policy';
    modalIdSelectSinisterStatus: string = 'agt-select-sinister-status';
    modalIdGroupHasCoincidences: string = 'agt-group-has-coincidences';
    modalIdPartnerHasCoincidences: string = 'agt-partner-has-coincidences';
    searchPolicyMessage: string = '';
    selectContactTypeModalId: string;
    selectPolicyStatusModalId: string;
    selectQuotationStatusModalId: string;
    selectedPolicy: Policy | null = null;
    selectedName: string = '';

    constructor(
        private _pluralNameFormatPipe: PluralNameFormatPipe,
        private _router: Router
    ) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeNameSelected = new EventEmitter<string>();
        this.CONTENT_TYPES = CONTENT_TYPES;
        this.selectContactTypeModalId = 'modal-select-contact-type';
        this.selectPolicyStatusModalId = 'modal-select-policy-status';
        this.selectQuotationStatusModalId = 'modal-select-quotation-status';
    }

    ngOnInit(): void {
        if(this.contentType === CONTENT_TYPES.CONTACT_FILE.ID) {
            this.contentSubtypeNameSelected.emit('Cargado');
        }
    }

    applyPayment(payment: Payment): void {
        this.paymentSelected.emit(payment);
    }

    /**
     * Get the header title
     * @return The header title
     */
    getHeaderTitle(): string {
        let title: string = '';
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID: title = 'Nuevo '+this.contentTypeName; break;
            case CONTENT_TYPES.CLIENT.ID: title = 'Nuevo '+this.contentTypeName; break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID: title = 'Historial ' + this._pluralNameFormatPipe.transform(this.contentTypeName); break;
            case CONTENT_TYPES.POLICY.ID: title = 'Historial ' + this._pluralNameFormatPipe.transform(this.contentTypeName); break;
            case CONTENT_TYPES.CONTACT_FILE.ID: title = 'Actualizar Expediente'; break;
            case CONTENT_TYPES.GROUP.ID: title = 'Nuevo ' + this.contentTypeName; break;
            case CONTENT_TYPES.GROUP_POLICY.ID: title = 'Historial ' + this._pluralNameFormatPipe.transform(this.contentTypeName); break;
            case CONTENT_TYPES.GROUP_SINISTER.ID: title = 'Historial ' + this._pluralNameFormatPipe.transform(this.contentTypeName); break;
            case CONTENT_TYPES.PARTNER.ID: title = 'Nuevo Socio'; break;
            case CONTENT_TYPES.PAYMENT.ID: title = 'Actualizar Cobranza'; break;
            case CONTENT_TYPES.SINISTER.ID: title = 'Nuevo '+this.contentTypeName; break;
            case CONTENT_TYPES.CONTACT_SINISTER.ID: title = 'Historial ' + this._pluralNameFormatPipe.transform(this.contentTypeName); break;
        }
        return title;
    }

    /**
     * Get the button title
     * @return The button title
     */
    getButtonTitle(): string {
        let title: string = '';
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID: title = 'CREAR '+this.contentTypeName; break;
            case CONTENT_TYPES.CLIENT.ID: title = 'CREAR '+this.contentTypeName; break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
            case CONTENT_TYPES.POLICY.ID:
            case CONTENT_TYPES.CONTACT_SINISTER.ID:
            case CONTENT_TYPES.GROUP_POLICY.ID:
            case CONTENT_TYPES.GROUP_SINISTER.ID:
                title = 'EXPLORAR HISTORIAL';
            break;
            case CONTENT_TYPES.CONTACT_FILE.ID: title = 'SUBIR ARCHIVO'; break;
            case CONTENT_TYPES.GROUP.ID: title = 'CREAR '+this.contentTypeName; break;
            case CONTENT_TYPES.PARTNER.ID: title = 'CREAR SOCIO'; break;
            case CONTENT_TYPES.PAYMENT.ID: title = 'APLICAR PAGO'; break;
            case CONTENT_TYPES.SINISTER.ID: title = 'REPORTAR '+this.contentTypeName; break;
        }
        return title;
    }

    /**
     * Click event to do action
     */
    onClickDoAction(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID: ModalPlugin.show(this.selectContactTypeModalId); break;
            case CONTENT_TYPES.CLIENT.ID: ModalPlugin.show(this.selectContactTypeModalId); break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID: ModalPlugin.show(this.selectQuotationStatusModalId); break;
            case CONTENT_TYPES.POLICY.ID:
            case CONTENT_TYPES.GROUP_POLICY.ID:
                ModalPlugin.show(this.selectPolicyStatusModalId);
            break;
            case CONTENT_TYPES.GROUP.ID: ModalPlugin.show(this.modalIdCreateGroup); break;
            case CONTENT_TYPES.PARTNER.ID: ModalPlugin.show(this.modalIdCreatePartner); break;
            case CONTENT_TYPES.PAYMENT.ID: ModalPlugin.show(this.modalIdSearchPayment); break;
            case CONTENT_TYPES.SINISTER.ID:
                this.searchPolicyMessage = 'Ingresa la póliza a la que deseas reportar el siniestro.';
                ModalPlugin.show(this.modalIdSearchPolicy);
            break;
            case CONTENT_TYPES.CONTACT_SINISTER.ID:
            case CONTENT_TYPES.GROUP_SINISTER.ID:
                ModalPlugin.show(this.modalIdSelectSinisterStatus);
            break;
            case CONTENT_TYPES.CONTACT_FILE.ID: this._router.navigateByUrl(ROUTES_NAME.uploadContactFile(this.contactId)); break;
        }
    }

    /**
     * Event to catch the name of the selected content subtype
     * @param contentSubtypeName The name of the selected content subtype
     */
    onContentSubtypeNameSelected(contentSubtypeName: string): void {
        this.contentSubtypeNameSelected.emit(contentSubtypeName);
    }

    /**
     * Event to catch the found policy
     * @param policies The found policy
     */
    onPolicyFound(policy: Policy): void {
        this.selectedPolicy = policy;
        switch(this.contentType) {
            case CONTENT_TYPES.SINISTER.ID:
                ModalPlugin.show(this.modalIdCreateSinister);
                break;
        }
    }

    /**
     * Event to notify that a sinister was created
     */
    onSinisterCreated(): void {
        this.sinisterCreated.emit();
    }

    showModalGroupHasCoincidences(name: string): void {
        this.selectedName = name;
        ModalPlugin.show(this.modalIdGroupHasCoincidences);
    }

    showModalConfirmCreateGroup(name: string): void {
        this.selectedName = name;
        ModalPlugin.show(this.modalIdConfirmCreateGroup);
    }

    notifyGroupCreated(): void {
        this.groupCreated.emit();
    }

    showModalPartnerHasCoincidences(name: string): void {
        this.selectedName = name;
        ModalPlugin.show(this.modalIdPartnerHasCoincidences);
    }

    showModalConfirmCreatePartner(name: string): void {
        this.selectedName = name;
        ModalPlugin.show(this.modalIdConfirmCreatePartner);
    }

    notifyPartnerCreated(): void {
        this.partnerCreated.emit();
    }

}
