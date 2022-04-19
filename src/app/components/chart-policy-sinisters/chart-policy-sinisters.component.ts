import { Component, Input, OnInit } from '@angular/core';

import { ChartPolicySinistersService } from './chart-policy-sinisters.service';

declare var StatsRecordPlugin: any;

@Component({
  selector: 'agt-chart-policy-sinisters',
  templateUrl: './chart-policy-sinisters.component.html',
  styles: [
  ],
  providers: [ChartPolicySinistersService]
})
export class ChartPolicySinistersComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: ChartPolicySinistersService) { }

    get canShowChart(): boolean {
        return (this.model.policySinisterStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicySinisters();
        this._loadPolicySinisterStatistics();
    }

    private _loadPolicySinisterStatistics(): void {
        this.model.loadPolicySinisterStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicySinisters(this.model.policySinisterStatistics);
        });
    }

}
