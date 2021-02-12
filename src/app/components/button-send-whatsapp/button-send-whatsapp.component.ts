import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

import { ButtonSendWhatsappService } from './button-send-whatsapp.service';

@Component({
  selector: 'agt-button-send-whatsapp',
  templateUrl: './button-send-whatsapp.component.html',
  styles: [
  ]
})
export class ButtonSendWhatsappComponent implements OnChanges {
    @Input() buttonType: number;
    @Input() contactId: string;
    @Input() expressToken: string;
    @Input() required: boolean;
    @Output() connectionFailed: EventEmitter<void>;
    BUTTON_TYPES: any = BUTTON_TYPES;

    constructor(public buttonSendWhatsappService: ButtonSendWhatsappService) {
        this.buttonType = 0;
        this.contactId = '';
        this.expressToken = '';
        this.required = false;
        this.connectionFailed = new EventEmitter<void>();
        this.BUTTON_TYPES = BUTTON_TYPES;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contactId !== 'undefined' && !!changes.contactId.currentValue) {
            this.buttonSendWhatsappService.loadContact(this.contactId);
        }
        if(typeof changes.expressToken !== 'undefined' && !!changes.expressToken.currentValue) {
            this.buttonSendWhatsappService.loadExpressContact(this.expressToken);
        }
    }

    /**
     * Check if can navigate
     * @return True if can, otherwise false
     */
    public checkCanNavigate(): boolean {
        return (!!this.buttonSendWhatsappService.phone.phoneCode && !!this.buttonSendWhatsappService.phone.phoneNumber) ? true : false;
    }

    /**
     * Get the contact link
     * @return The link
     */
    public getLink(): string {
        return 'https://wa.me/'+ this.buttonSendWhatsappService.phone.phoneCode +'1'+ this.buttonSendWhatsappService.phone.phoneNumber;
    }

    /**
     * Click event to check the connection with contact link
     */
    public onClickCheckConnection(): void {
        if(!(!!this.buttonSendWhatsappService.phone.phoneCode && !!this.buttonSendWhatsappService.phone.phoneNumber)) {
            this.connectionFailed.emit();
        }
    }

}
