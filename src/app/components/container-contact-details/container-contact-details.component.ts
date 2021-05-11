import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ContainerContactDetailsService } from './container-contact-details.service';

@Component({
  selector: 'agt-container-contact-details',
  templateUrl: './container-contact-details.component.html',
  styles: [
  ]
})
export class ContainerContactDetailsComponent implements OnChanges {
    @Input() contactId: string;
    @Input() message: string;

    constructor(public containerContactDetailsService: ContainerContactDetailsService) {
        this.contactId = '';
        this.message = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId.currentValue) {
            this.containerContactDetailsService.loadContact(this.contactId);
        }
    }

}
