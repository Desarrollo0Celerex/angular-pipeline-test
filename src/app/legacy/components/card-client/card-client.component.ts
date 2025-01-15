import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { Client } from '@interfaces/client.interface';

@Component({
    selector: 'agt-card-client',
    templateUrl: './card-client.component.html',
    styles: [],
    standalone: false
})
export class CardClientComponent {
    @Input() client: Client | null;
    @Output() showContactData: EventEmitter<string>;
    ROUTES_NAME: any;

    constructor() {
        this.client = null;
        this.showContactData = new EventEmitter<string>();
        this.ROUTES_NAME = ROUTES_NAME;
    }

    /**
     * Click event to show the contact data
     * @param contactId The contact ID
     */
    onClickShowContactData(contactId: string): void {
        this.showContactData.emit(contactId);
    }

}
