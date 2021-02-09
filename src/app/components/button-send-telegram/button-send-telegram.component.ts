import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

@Component({
  selector: 'agt-button-send-telegram',
  templateUrl: './button-send-telegram.component.html',
  styles: [
  ]
})
export class ButtonSendTelegramComponent {
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
        const contactLink = 'https://telegram.me/'+ this.phoneCode +'1'+ this.phoneNumber;
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
