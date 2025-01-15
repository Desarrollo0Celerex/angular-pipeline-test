import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { PartnerClient } from '@interfaces/partner-client.interface';

@Component({
    selector: 'agt-card-partner-client',
    templateUrl: './card-partner-client.component.html',
    styles: [],
    standalone: false
})
export class CardPartnerClientComponent {
    @Input() partnerClient: PartnerClient | null = null;
    @Output() showContactData: EventEmitter<string> = new EventEmitter<string>();
    ROUTES_NAME: any = ROUTES_NAME;;

    /**
     * Click event to show the contact data
     * @param contactId The contact ID
     */
    onClickShowContactData(contactId: string): void {
        this.showContactData.emit(contactId);
    }
}
