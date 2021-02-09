import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

@Component({
  selector: 'agt-button-send-whatsapp',
  templateUrl: './button-send-whatsapp.component.html',
  styles: [
  ]
})
export class ButtonSendWhatsappComponent {
    @Input() buttonType: number;
    @Input() phoneCode: string;
    @Input() phoneNumber: string;
    @Input() required: boolean;
    @Output() connectionFailed: EventEmitter<void>;
    BUTTON_TYPES: any = BUTTON_TYPES;

    constructor() {
        this.buttonType = 0;
        this.phoneCode = '';
        this.phoneNumber = '';
        this.required = false;
        this.connectionFailed = new EventEmitter<void>();
        this.BUTTON_TYPES = BUTTON_TYPES;
    }

    /**
     * Check if can navigate
     * @return True if can, otherwise false
     */
    public checkCanNavigate(): boolean {
        return (!!this.phoneCode && !!this.phoneNumber) ? true : false;
    }

    /**
     * Get the contact link
     * @return The link
     */
    public getLink(): string {
        const contactLink = 'https://wa.me/'+ this.phoneCode +'1'+ this.phoneNumber;
        return contactLink;
    }

    /**
     * Click event to check the connection with contact link
     */
    public onClickCheckConnection(): void {
        if(!(!!this.phoneCode && !!this.phoneNumber)) {
            this.connectionFailed.emit();
        }
    }

}
