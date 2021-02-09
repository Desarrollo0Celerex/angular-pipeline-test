import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BUTTON_TYPES } from '@constants/global';

@Component({
  selector: 'agt-button-send-email',
  templateUrl: './button-send-email.component.html',
  styles: [
  ]
})
export class ButtonSendEmailComponent {
    @Input() buttonType: number;
    @Input() email: string;
    @Input() required: boolean;
    @Output() connectionFailed: EventEmitter<void>;
    BUTTON_TYPES: any = BUTTON_TYPES;

    constructor() {
        this.buttonType = 0;
        this.email = '';
        this.required = false;
        this.connectionFailed = new EventEmitter<void>();
        this.BUTTON_TYPES = BUTTON_TYPES;
    }

    /**
     * Check if can navigate
     * @return True if can, otherwise false
     */
    public checkCanNavigate(): boolean {
        return (!!this.email) ? true : false;
    }

    /**
     * Get the contact link
     * @return The link
     */
    public getLink(): string {
        const contactLink = 'mailto:'+ this.email;
        return contactLink;
    }

    /**
     * Click event to check the connection with contact link
     */
    public onClickCheckConnection(): void {
        if(!(!!this.email)) {
            this.connectionFailed.emit();
        }
    }
}
