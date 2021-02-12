import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { Lead } from '@interfaces/lead.interface';

@Component({
  selector: 'agt-card-lead',
  templateUrl: './card-lead.component.html',
  styles: [
  ]
})
export class CardLeadComponent implements OnInit {
    @Input() lead: Lead | null;
    @Output() showContactData: EventEmitter<string>;
    ROUTES_NAME: any;

    constructor() {
        this.lead = null;
        this.showContactData = new EventEmitter<string>();
        this.ROUTES_NAME = ROUTES_NAME;
    }

    ngOnInit(): void {
    }

    /**
     * Click event to show the contact data
     * @param contactId The contact ID
     */
    onClickShowContactData(contactId: string): void {
        this.showContactData.emit(contactId);
    }

}
