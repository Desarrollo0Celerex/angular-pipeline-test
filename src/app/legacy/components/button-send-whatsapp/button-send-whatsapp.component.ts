import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

import { ButtonSendWhatsappService } from './button-send-whatsapp.service';

@Component({
    selector: 'agt-button-send-whatsapp',
    templateUrl: './button-send-whatsapp.component.html',
    styles: [],
    standalone: false
})
export class ButtonSendWhatsappComponent implements OnChanges, OnInit {
    @Input() buttonType: number;
    @Input() contactId: string;
    @Input() expressToken: string;
    @Input() required: boolean;
    @Output() contactActionFailed: EventEmitter<void>;
    BUTTON_TYPES: any = BUTTON_TYPES;

    constructor(public buttonSendWhatsappService: ButtonSendWhatsappService) {
        this.buttonType = 0;
        this.contactId = '';
        this.expressToken = '';
        this.required = false;
        this.contactActionFailed = new EventEmitter<void>();
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

    ngOnInit(): void {
        this.buttonSendWhatsappService.loadUser();
    }

    /**
     * Check if can navigate
     * @return True if can, otherwise false
     */
    public checkCanNavigate(): boolean {
        return (!!this.buttonSendWhatsappService.contact && !!this.buttonSendWhatsappService.contact.phoneCode && !!this.buttonSendWhatsappService.contact.phoneNumber) ? true : false;
    }

    /**
     * Get the contact link
     * @return The link
     */
    public getLink(): string {
        if(!!this.buttonSendWhatsappService.contact && !!this.buttonSendWhatsappService.user) {
            return 'https://wa.me/'+ this.buttonSendWhatsappService.contact.phoneCode + this.buttonSendWhatsappService.contact.phoneNumber + '?text=Hola, Te escribe '+this.buttonSendWhatsappService.user.shortName+' de '+this.buttonSendWhatsappService.contact.workspaceName+'.';
        }
        return '';
    }

    /**
     * Click event to check the connection with contact link
     */
    public onClickCheckConnection(): void {
        if(!(!!this.buttonSendWhatsappService.contact && !!this.buttonSendWhatsappService.contact.phoneCode && !!this.buttonSendWhatsappService.contact.phoneNumber)) {
            this.contactActionFailed.emit();
        }
    }

}
