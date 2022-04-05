import { Component, Input, OnInit } from '@angular/core';

import { ChartPolicyTrackerInsurersService } from './chart-policy-tracker-insurers.service'

declare var StatsTrackerPlugin: any;

@Component({
  selector: 'agt-chart-policy-tracker-insurers',
  templateUrl: './chart-policy-tracker-insurers.component.html',
  styles: [
  ],
  providers: [ChartPolicyTrackerInsurersService]
})
export class ChartPolicyTrackerInsurersComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: ChartPolicyTrackerInsurersService) { }

    get canShowChart(): boolean {
        return (this.model.insurers.length > 0) ? true : false;
    }

    ngOnInit(): void {
        StatsTrackerPlugin.removeChartTrackerInsurers();
        this._loadPolicyTrackerInsurers();
    }

    private _loadPolicyTrackerInsurers(): void {
        this.model.loadPolicyTrackerInsurers(this.contactId, this.policyId).subscribe(() => {
            StatsTrackerPlugin.drawChartTrackerInsurers(this.model.insurers);
        });
    }
}
