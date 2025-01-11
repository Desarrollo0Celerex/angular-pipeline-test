import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

import { ButtonDoCallService } from './button-do-call.service';

@Component({
    selector: 'agt-button-do-call',
    templateUrl: './button-do-call.component.html',
    styles: [],
    standalone: false
})
export class ButtonDoCallComponent {
    @Input() buttonType: number;
    @Input() contactId: string;
    @Input() expressToken: string;
    @Input() required: boolean;
    @Output() contactActionFailed: EventEmitter<void>;
    BUTTON_TYPES: any = BUTTON_TYPES;

    constructor(public buttonDoCallService: ButtonDoCallService) {
        this.buttonType = 0;
        this.contactId = '';
        this.expressToken = '';
        this.required = false;
        this.contactActionFailed = new EventEmitter<void>();
        this.BUTTON_TYPES = BUTTON_TYPES;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contactId !== 'undefined' && !!changes.contactId.currentValue) {
            this.buttonDoCallService.loadContact(this.contactId);
        }
        if(typeof changes.expressToken !== 'undefined' && !!changes.expressToken.currentValue) {
            this.buttonDoCallService.loadExpressContact(this.expressToken);
        }
    }

    /**
     * Check if can navigate
     * @return True if can, otherwise false
     */
    public checkCanNavigate(): boolean {
        return (!!this.buttonDoCallService.phone.phoneCode && !!this.buttonDoCallService.phone.phoneNumber) ? true : false;
    }

    /**
     * Get the contact link
     * @return The link
     */
    public getLink(): string {
        return 'tel:+'+ this.buttonDoCallService.phone.phoneCode +' '+ this.buttonDoCallService.phone.phoneNumber;
    }

    /**
     * Click event to check the connection with contact link
     */
    public onClickCheckConnection(): void {
        if(!(!!this.buttonDoCallService.phone.phoneCode && !!this.buttonDoCallService.phone.phoneNumber)) {
            this.contactActionFailed.emit();
        }
    }
}
