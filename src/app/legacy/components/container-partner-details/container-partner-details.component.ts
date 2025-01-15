import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContainerPartnerDetailsService } from './container-partner-details.service';

@Component({
    selector: 'agt-container-partner-details',
    templateUrl: './container-partner-details.component.html',
    styles: [],
    providers: [ContainerPartnerDetailsService],
    standalone: false
})
export class ContainerPartnerDetailsComponent {
    @Input() partnerId: string = '';
    @Input() message: string = '';
    partnerProfileRoute: string = '';

    constructor(public model: ContainerPartnerDetailsService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.partnerId && !!changes.partnerId.currentValue) {
            this.partnerProfileRoute = ROUTES_NAME.partnerResume(
                this.partnerId
            );
            this.model.loadPartner(this.partnerId);
        }
    }
}
