import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContainerContactDetailsService } from './container-contact-details.service';

@Component({
  selector: 'agt-container-contact-details',
  templateUrl: './container-contact-details.component.html',
  styles: [
  ]
})
export class ContainerContactDetailsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() message: string = '';
    contactProfileRoute: string = '';

    constructor(public model: ContainerContactDetailsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId.currentValue) {
            this.contactProfileRoute = ROUTES_NAME.contactResume(this.contactId);
            this.model.loadContact(this.contactId);
        }
    }

}
