import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

import { ButtonDownloadContactService } from './button-download-contact.service'

declare var ModalPlugin: any;

@Component({
  selector: 'agt-button-download-contact',
  templateUrl: './button-download-contact.component.html',
  styles: [
  ]
})
export class ButtonDownloadContactComponent implements OnChanges {
    @Input() buttonType: number;
    @Input() contactId: string;
    @Input() expressToken: string;
    @Input() modalId: string;
    BUTTON_TYPES: any;

    constructor(public buttonDownloadContactService: ButtonDownloadContactService) {
        this.buttonType = 0;
        this.contactId = '';
        this.expressToken = '';
        this.modalId = '';
        this.BUTTON_TYPES = BUTTON_TYPES;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contactId !== 'undefined' && !!changes.contactId.currentValue) {
            this.buttonDownloadContactService.loadContact(changes.contactId.currentValue);
        }
        if(typeof changes.expressToken !== 'undefined' && !!changes.expressToken.currentValue) {
            this.buttonDownloadContactService.loadExpressContact(changes.expressToken.currentValue);
        }
    }

    /**
     * Click event to hide the modal
     */
    onClickHideModal(): void {
        if(!!this.modalId) {
            ModalPlugin.hide(this.modalId);
        }
    }
}
