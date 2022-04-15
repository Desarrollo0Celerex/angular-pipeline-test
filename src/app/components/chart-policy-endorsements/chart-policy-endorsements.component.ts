import { Component, Input, OnInit } from '@angular/core';

import { ChartPolicyEndorsementsService } from './chart-policy-endorsements.service';

declare var StatsRecordPlugin: any;

@Component({
  selector: 'agt-chart-policy-endorsements',
  templateUrl: './chart-policy-endorsements.component.html',
  styles: [
  ],
  providers: [ChartPolicyEndorsementsService]
})
export class ChartPolicyEndorsementsComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: ChartPolicyEndorsementsService) { }

    get canShowChart(): boolean {
        return (this.model.policyEndorsementStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicyEndorsements();
        this._loadPolicyEndorsementStatistics();
    }

    private _loadPolicyEndorsementStatistics(): void {
        this.model.loadPolicyEndorsementStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicyEndorsements(this.model.policyEndorsementStatistics);
        });
    }
}
