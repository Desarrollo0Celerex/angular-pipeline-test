import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { QrcodeTransferContactService } from './qrcode-transfer-contact.service';

@Component({
  selector: 'agt-qrcode-transfer-contact',
  templateUrl: './qrcode-transfer-contact.component.html',
  styles: [
  ]
})
export class QrcodeTransferContactComponent implements OnChanges, OnDestroy {
    @Input() contactId: string;
    private _intervalId: number;

    constructor(public qrcodeTransferContactService: QrcodeTransferContactService) {
        this.contactId = '';
        this._intervalId = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId.currentValue) {
            this._stopCodeCreation();
            this._createQrcode(changes.contactId.currentValue);
        }
    }

    ngOnDestroy(): void {
        this._stopCodeCreation();
    }

    /**
     * Stop the code creation
     */
    private _stopCodeCreation(): void {
        if(typeof this._intervalId !== 'undefined') {
            clearInterval(this._intervalId);
        }
    }

    /**
     * Create the QR code
     * @param contactId The contact ID
     */
    private _createQrcode(contactId: string): void {
        this.qrcodeTransferContactService.createQrcode(contactId);
        this._intervalId = window.setInterval(() => {
            this.qrcodeTransferContactService.createQrcode(contactId);
        }, 55000);
    }

}
