import { Component, OnInit, Input } from '@angular/core';

import { AlertUnusualReportedSinistersService } from './alert-unusual-reported-sinisters.service';

@Component({
  selector: 'agt-alert-unusual-reported-sinisters',
  templateUrl: './alert-unusual-reported-sinisters.component.html',
  styles: [
  ],
  providers: [AlertUnusualReportedSinistersService]
})
export class AlertUnusualReportedSinistersComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: AlertUnusualReportedSinistersService) { }

    ngOnInit(): void {
        this.model.loadReportedSinisters(this.contactId, this.policyId);
    }

}
