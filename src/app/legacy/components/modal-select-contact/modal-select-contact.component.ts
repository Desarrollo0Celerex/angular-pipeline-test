import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-contact',
    templateUrl: './modal-select-contact.component.html',
    styles: [],
    standalone: false
})
export class ModalSelectContactComponent {
    @Input() modalId: string;
    @Input() contactId: string;

    constructor(private _router: Router) {
        this.modalId = '';
        this.contactId = '';
    }

    /**
     * Click event to select the contact
     */
    onClickSelectContact(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.contactResume(this.contactId));
    }

}
