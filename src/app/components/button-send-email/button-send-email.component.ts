import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

import { ButtonSendEmailService } from './button-send-email.service';

@Component({
  selector: 'agt-button-send-email',
  templateUrl: './button-send-email.component.html',
  styles: [
  ]
})
export class ButtonSendEmailComponent implements OnChanges {
    @Input() buttonType: number;
    @Input() contactId: string;
    @Input() expressToken: string;
    @Input() required: boolean;
    @Output() connectionFailed: EventEmitter<void>;
    BUTTON_TYPES: any = BUTTON_TYPES;

    constructor(public buttonSendEmailService: ButtonSendEmailService) {
        this.buttonType = 0;
        this.contactId = '';
        this.expressToken = '';
        this.required = false;
        this.connectionFailed = new EventEmitter<void>();
        this.BUTTON_TYPES = BUTTON_TYPES;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contactId !== 'undefined' && !!changes.contactId.currentValue) {
            this.buttonSendEmailService.loadContact(this.contactId);
        }
        if(typeof changes.expressToken !== 'undefined' && !!changes.expressToken.currentValue) {
            this.buttonSendEmailService.loadExpressContact(this.expressToken);
        }
    }

    /**
     * Check if can navigate
     * @return True if can, otherwise false
     */
    public checkCanNavigate(): boolean {
        return (!!this.buttonSendEmailService.email) ? true : false;
    }

    /**
     * Get the contact link
     * @return The link
     */
    public getLink(): string {
        return 'mailto:'+ this.buttonSendEmailService.email;
    }

    /**
     * Click event to check the connection with contact link
     */
    public onClickCheckConnection(): void {
        if(!(!!this.buttonSendEmailService.email)) {
            this.connectionFailed.emit();
        }
    }
}
