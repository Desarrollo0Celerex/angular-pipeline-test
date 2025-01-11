import { Component, Input, OnInit } from '@angular/core';

import { AlertUnusualAddedEndorsementsService } from './alert-unusual-added-endorsements.service';

@Component({
    selector: 'agt-alert-unusual-added-endorsements',
    templateUrl: './alert-unusual-added-endorsements.component.html',
    styles: [],
    providers: [AlertUnusualAddedEndorsementsService],
    standalone: false
})
export class AlertUnusualAddedEndorsementsComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: AlertUnusualAddedEndorsementsService) { }

    ngOnInit(): void {
        this.model.loadAddedEndorsements(this.contactId, this.policyId);
    }
}
