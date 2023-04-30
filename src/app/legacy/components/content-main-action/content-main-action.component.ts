import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { Policy } from '@interfaces/policy.interface';
import { Payment } from '@interfaces/payment.interface';
import { PluralPipe } from '@shared/pipes/plural/plural.pipe';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-content-main-action',
    templateUrl: './content-main-action.component.html',
    styles: [],
})
export class ContentMainActionComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Input() groupId: string = '';
    @Output() contentSubtypeNameSelected: EventEmitter<string>;
    @Output() insuranceListTypeSelected: EventEmitter<number> =
        new EventEmitter<number>();
    @Output() groupCreated: EventEmitter<void> = new EventEmitter<void>();
    @Output() partnerCreated: EventEmitter<void> = new EventEmitter<void>();
    @Output() paymentSelected: EventEmitter<Payment> =
        new EventEmitter<Payment>();
    @Output() showPolicyInsuredActions: EventEmitter<void> =
        new EventEmitter<void>();
    CONTENT_TYPES: any;
    modalIdSelectClient: string = 'agt-modal-select-client';
    modalIdSelectInsuranceListType: string =
        'agt-modal-select-insurance-list-type';
    modalIdConfirmAddClient: string = 'agt-modal-confirm-add-client';
    modalIdConfirmCreatePartner: string = 'agt-confirm-create-partner';
    modalIdConfirmCreateGroup: string = 'agt-confirm-create-group';
    modalIdCreateGroup: string = 'agt-create-group';
    modalIdCreatePartner: string = 'agt-create-partner';
    modalIdCreateSinister: string = 'agt-create-sinister';
    modalIdSearchClient: string = 'agt-search-client';
    modalIdSearchPayment: string = 'agt-search-payment';
    modalIdSearchPolicy: string = 'agt-search-policy';
    modalIdSelectSinisterStatus: string = 'agt-select-sinister-status';
    modalIdGroupHasCoincidences: string = 'agt-group-has-coincidences';
    modalIdPartnerHasCoincidences: string = 'agt-partner-has-coincidences';
    searchPolicyMessage: string = '';
    selectContactTypeModalId: string;
    selectPolicyStatusModalId: string;
    selectQuotationStatusModalId: string;
    //selectedPolicy: Policy | null = null;
    selectedName: string = '';
    selectedPolicyId: string = '';
    insuranceId: number = 0;

    constructor(private _pluralPipe: PluralPipe, private _router: Router) {
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
        switch (this.contentType) {
            case CONTENT_TYPES.CONTACT_FILE.ID:
                this.contentSubtypeNameSelected.emit('Cargado');
                break;

            case CONTENT_TYPES.INCOMPLETE_POLICIES.ID:
                this.contentSubtypeNameSelected.emit('Incompleta');
                break;
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
        switch (this.contentType) {
            case CONTENT_TYPES.CONTACT.ID:
            case CONTENT_TYPES.LEAD.ID:
            case CONTENT_TYPES.CLIENT.ID:
                title = 'Nuevo ' + this.contentTypeName;
                break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                title =
                    'Historial ' +
                    this._pluralPipe.transform(this.contentTypeName);
                break;
            case CONTENT_TYPES.POLICY.ID:
                title =
                    'Historial ' +
                    this._pluralPipe.transform(this.contentTypeName);
                break;
            case CONTENT_TYPES.POLICY_INSURED.ID:
                title = 'Acciones Disponibles';
                break;
            case CONTENT_TYPES.CONTACT_FILE.ID:
                title = 'Actualizar Expediente';
                break;
            case CONTENT_TYPES.GROUP.ID:
                title = 'Nuevo ' + this.contentTypeName;
                break;
            case CONTENT_TYPES.GROUP_MEMBER.ID:
                title = 'Nuevo Miembro';
                break;
            case CONTENT_TYPES.GROUP_POLICY.ID:
                title =
                    'Historial ' +
                    this._pluralPipe.transform(this.contentTypeName);
                break;
            case CONTENT_TYPES.GROUP_SINISTER.ID:
                title =
                    'Historial ' +
                    this._pluralPipe.transform(this.contentTypeName);
                break;
            case CONTENT_TYPES.PARTNER.ID:
                title = 'Nuevo Socio';
                break;
            case CONTENT_TYPES.PARTNER_CLIENT.ID:
                title = 'Nueva Póliza';
                break;
            case CONTENT_TYPES.PARTNER_POLICY.ID:
                title =
                    'Historial ' +
                    this._pluralPipe.transform(this.contentTypeName);
                break;
            case CONTENT_TYPES.PARTNER_SINISTER.ID:
                title =
                    'Historial ' +
                    this._pluralPipe.transform(this.contentTypeName);
                break;
            case CONTENT_TYPES.PAYMENT.ID:
                title = 'Actualizar Cobranza';
                break;
            case CONTENT_TYPES.SINISTER.ID:
                title = 'Nuevo ' + this.contentTypeName;
                break;
            case CONTENT_TYPES.CONTACT_SINISTER.ID:
                title =
                    'Historial ' +
                    this._pluralPipe.transform(this.contentTypeName);
                break;
            case CONTENT_TYPES.INCOMPLETE_POLICIES.ID:
                title = 'Nueva ' + this.contentTypeName;
                break;
            case CONTENT_TYPES.INSURANCE.ID:
                title = 'Mostrar Listado';
                break;
        }
        return title;
    }

    /**
     * Get the button title
     * @return The button title
     */
    getButtonTitle(): string {
        let title: string = '';
        switch (this.contentType) {
            case CONTENT_TYPES.CONTACT.ID:
            case CONTENT_TYPES.LEAD.ID:
            case CONTENT_TYPES.CLIENT.ID:
                title = 'CREAR ' + this.contentTypeName;
                break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
            case CONTENT_TYPES.POLICY.ID:
            case CONTENT_TYPES.CONTACT_SINISTER.ID:
            case CONTENT_TYPES.GROUP_POLICY.ID:
            case CONTENT_TYPES.GROUP_SINISTER.ID:
            case CONTENT_TYPES.PARTNER_POLICY.ID:
            case CONTENT_TYPES.PARTNER_SINISTER.ID:
                title = 'EXPLORAR HISTORIAL';
                break;
            case CONTENT_TYPES.CONTACT_FILE.ID:
                title = 'SUBIR ARCHIVO';
                break;
            case CONTENT_TYPES.GROUP.ID:
                title = 'CREAR ' + this.contentTypeName;
                break;
            case CONTENT_TYPES.GROUP_MEMBER.ID:
                title = 'AGREGAR MIEMBRO';
                break;
            case CONTENT_TYPES.PARTNER.ID:
                title = 'CREAR SOCIO';
                break;
            case CONTENT_TYPES.PARTNER_CLIENT.ID:
                title = 'ENLAZAR PÓLIZA';
                break;
            case CONTENT_TYPES.PAYMENT.ID:
                title = 'APLICAR PAGO';
                break;
            case CONTENT_TYPES.SINISTER.ID:
                title = 'REPORTAR ' + this.contentTypeName;
                break;
            case CONTENT_TYPES.INCOMPLETE_POLICIES.ID:
                title = 'CARGAR ' + this.contentTypeName;
                break;
            case CONTENT_TYPES.POLICY_INSURED.ID:
                title = 'MOSTRAR ACCIONES';
                break;
            case CONTENT_TYPES.INSURANCE.ID:
                title = 'CAMBIAR LISTADO';
                break;
        }
        return title;
    }

    /**
     * Click event to do action
     */
    onClickDoAction(): void {
        switch (this.contentType) {
            case CONTENT_TYPES.CONTACT.ID:
            case CONTENT_TYPES.LEAD.ID:
            case CONTENT_TYPES.CLIENT.ID:
            case CONTENT_TYPES.INCOMPLETE_POLICIES.ID:
            case CONTENT_TYPES.PARTNER_CLIENT.ID:
                ModalPlugin.show(this.selectContactTypeModalId);
                break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                ModalPlugin.show(this.selectQuotationStatusModalId);
                break;
            case CONTENT_TYPES.POLICY.ID:
            case CONTENT_TYPES.GROUP_POLICY.ID:
            case CONTENT_TYPES.PARTNER_POLICY.ID:
                ModalPlugin.show(this.selectPolicyStatusModalId);
                break;
            case CONTENT_TYPES.GROUP.ID:
                ModalPlugin.show(this.modalIdCreateGroup);
                break;
            case CONTENT_TYPES.PARTNER.ID:
                ModalPlugin.show(this.modalIdCreatePartner);
                break;
            case CONTENT_TYPES.PAYMENT.ID:
                ModalPlugin.show(this.modalIdSearchPayment);
                break;
            case CONTENT_TYPES.SINISTER.ID:
                this.searchPolicyMessage =
                    'Ingresa la póliza a la que deseas reportar el siniestro.';
                ModalPlugin.show(this.modalIdSearchPolicy);
                break;
            case CONTENT_TYPES.CONTACT_SINISTER.ID:
            case CONTENT_TYPES.GROUP_SINISTER.ID:
            case CONTENT_TYPES.PARTNER_SINISTER.ID:
                ModalPlugin.show(this.modalIdSelectSinisterStatus);
                break;

            case CONTENT_TYPES.CONTACT_FILE.ID:
                this._router.navigateByUrl(
                    ROUTES_NAME.uploadContactFile(this.contactId)
                );
                break;

            case CONTENT_TYPES.GROUP_MEMBER.ID:
                ModalPlugin.show(this.modalIdSearchClient);
                break;

            case CONTENT_TYPES.POLICY_INSURED.ID:
                this.showPolicyInsuredActions.emit();
                break;

            case CONTENT_TYPES.INSURANCE.ID:
                ModalPlugin.show(this.modalIdSelectInsuranceListType);
                break;
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
        //this.selectedPolicy = policy;
        this.selectedPolicyId = policy.policyId;
        this.insuranceId = policy.insuranceId;
        switch (this.contentType) {
            case CONTENT_TYPES.SINISTER.ID:
                ModalPlugin.show(this.modalIdCreateSinister);
                break;
        }
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

    selectInsuranceListType(listType: number): void {
        this.insuranceListTypeSelected.emit(listType);
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
