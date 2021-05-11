import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

import { ButtonSendTelegramService } from './button-send-telegram.service';

@Component({
  selector: 'agt-button-send-telegram',
  templateUrl: './button-send-telegram.component.html',
  styles: [
  ]
})
export class ButtonSendTelegramComponent {
    @Input() buttonType: number;
    @Input() contactId: string;
    @Input() expressToken: string;
    @Input() required: boolean;
    @Output() contactActionFailed: EventEmitter<void>;
    BUTTON_TYPES: any = BUTTON_TYPES;

    constructor(public buttonSendTelegramService: ButtonSendTelegramService) {
        this.buttonType = 0;
        this.contactId = '';
        this.expressToken = '';
        this.required = false;
        this.contactActionFailed = new EventEmitter<void>();
        this.BUTTON_TYPES = BUTTON_TYPES;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contactId !== 'undefined' && !!changes.contactId.currentValue) {
            this.buttonSendTelegramService.loadContact(this.contactId);
        }
        if(typeof changes.expressToken !== 'undefined' && !!changes.expressToken.currentValue) {
            this.buttonSendTelegramService.loadExpressContact(this.expressToken);
        }
    }

    /**
     * Check if can navigate
     * @return True if can, otherwise false
     */
    public checkCanNavigate(): boolean {
        return (!!this.buttonSendTelegramService.phone.phoneCode && !!this.buttonSendTelegramService.phone.phoneNumber) ? true : false;
    }

    /**
     * Get the contact link
     * @return The link
     */
    public getLink(): string {
        return 'https://telegram.me/'+ this.buttonSendTelegramService.phone.phoneCode +'1'+ this.buttonSendTelegramService.phone.phoneNumber;
    }

    /**
     * Click event to check the connection with contact link
     */
    public onClickCheckConnection(): void {
        if(!(!!this.buttonSendTelegramService.phone.phoneCode && !!this.buttonSendTelegramService.phone.phoneNumber)) {
            this.contactActionFailed.emit();
        }
    }
}
