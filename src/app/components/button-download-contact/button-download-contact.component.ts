import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { VCard } from 'ngx-vcard';

import { BUTTON_TYPES } from '@constants/global';
import { VcardData } from '@interfaces/vcard-data.interface';

@Component({
  selector: 'agt-button-download-contact',
  templateUrl: './button-download-contact.component.html',
  styles: [
  ]
})
export class ButtonDownloadContactComponent implements OnChanges {
    @Input() buttonType: number;
    @Input() vcardData: VcardData | null;
    BUTTON_TYPES: any;
    vCard: VCard | null;

    constructor() {
        this.buttonType = 0;
        this.vcardData = null;
        this.BUTTON_TYPES = BUTTON_TYPES;
        this.vCard = null;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.vcardData.currentValue) {
            this._generateVcard();
        }
    }

    private _generateVcard(): void {
        if(!!this.vcardData) {
            this.vCard = {
                name: {
                    firstNames: this.vcardData.contactName,
                    lastNames: ''
                },
                email: [this.vcardData.email],
                telephone: [this.vcardData.phoneNumber],
                organization: 'Agenthos',
                url: {
                    work: 'https://agenthos.com',
                    home: ''
                }
            }
        }
    }
}
