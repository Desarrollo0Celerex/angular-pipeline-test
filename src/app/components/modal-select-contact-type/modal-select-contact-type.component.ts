import { Component, Input, OnInit } from '@angular/core';import { Router } from '@angular/router';

import { ACTION_TYPES } from '@constants/global';

import { CONTACT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-contact-type',
  templateUrl: './modal-select-contact-type.component.html',
  styles: [
  ]
})
export class ModalSelectContactTypeComponent implements OnInit {
    @Input() actionType: number;
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    @Input() title: string = 'Tipo de Contacto';
    @Input() description: string = '';
    CONTACT_TYPES: any;
    ROUTES_NAME: any;
    message: string;

    constructor(private _router: Router) {
        this.actionType = 0;
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.CONTACT_TYPES = CONTACT_TYPES;
        this.ROUTES_NAME = ROUTES_NAME;
        this.message = '';
    }

    ngOnInit(): void {
        switch(this.actionType) {
            case ACTION_TYPES.RENEW_POLICY:
            case ACTION_TYPES.REISSUE_POLICY:
                this.description = 'Es necesario seleccionar al nuevo titular de la póliza.';
                this.message = 'Por favor selecciona el tipo de contacto para continuar.';
                break;
        }
    }

    /**
     * Click event to request create a contact
     * @param  contactType The contact type to create
     */
    onClickCreateContact(contactType: string): void {
        ModalPlugin.hide(this.modalId);
        switch(this.actionType) {
            case ACTION_TYPES.RENEW_POLICY:
            case ACTION_TYPES.REISSUE_POLICY:
                this._router.navigateByUrl(ROUTES_NAME.changeContact(this.contactId, this.policyId, contactType, this.actionType.toString()));
                break;

            default:
                this._router.navigateByUrl(ROUTES_NAME.createContact(contactType));
        }
    }

}
