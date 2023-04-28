import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-update-contact-file',
  templateUrl: './modal-confirm-update-contact-file.component.html',
  styles: [
  ]
})
export class ModalConfirmUpdateContactFileComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() contactFileData: ContactFileDataSend | null = null;

    constructor(private _router: Router) { }

    ngOnInit(): void {
    }

    /**
     * Click event to navigate to update the contact file
     */
    onClickConfirmAction(): void {
        if(!!this.contactFileData) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.updateContactFile(this.contactFileData.contactId, this.contactFileData.contactFileId));
        }
    }

}
