import { Component, Input } from '@angular/core';import { Router } from '@angular/router';

import { CONTACT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-contact-type',
  templateUrl: './modal-select-contact-type.component.html',
  styles: [
  ]
})
export class ModalSelectContactTypeComponent {
    @Input() modalId: string;
    CONTACT_TYPES: any;
    ROUTES_NAME: any;

    constructor(private _router: Router) {
        this.modalId = '';
        this.CONTACT_TYPES = CONTACT_TYPES;
        this.ROUTES_NAME = ROUTES_NAME;
    }

    /**
     * Click event to request create a contact
     * @param  contactType The contact type to create
     */
    onClickCreateContact(contactType: number): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.createContact(contactType));
    }

}
