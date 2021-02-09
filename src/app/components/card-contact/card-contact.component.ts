import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardContactService } from './card-contact.service';

@Component({
  selector: 'agt-card-contact',
  templateUrl: './card-contact.component.html',
  styles: [
  ]
})
export class CardContactComponent implements OnChanges {
    @Input() contactId: string;
    @Input() message: string;

    constructor(public cardContactService: CardContactService) {
        this.contactId = '';
        this.message = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId.currentValue) {
            this.cardContactService.loadContact(this.contactId);
        }
    }

}
