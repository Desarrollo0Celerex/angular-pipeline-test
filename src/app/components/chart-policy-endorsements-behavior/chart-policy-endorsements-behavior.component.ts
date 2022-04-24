import { Component, OnInit, Input } from '@angular/core';

import { ChartPolicyEndorsementsBehaviorService } from './chart-policy-endorsements-behavior.service';

declare var StatsRecordPlugin: any;

@Component({
  selector: 'agt-chart-policy-endorsements-behavior',
  templateUrl: './chart-policy-endorsements-behavior.component.html',
  styles: [
  ],
  providers: [ChartPolicyEndorsementsBehaviorService]
})
export class ChartPolicyEndorsementsBehaviorComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: ChartPolicyEndorsementsBehaviorService) { }

    get canShowChart(): boolean {
        return (this.model.policyEndorsementBehaviorStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicyEndorsementsBehavior();
        this._loadPolicyEndorsementBehaviorStatistics();
    }

    private _loadPolicyEndorsementBehaviorStatistics(): void {
        this.model.loadPolicyEndorsementBehaviorStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicyEndorsementsBehavior(this.model.policyEndorsementBehaviorStatistics);
        });
    }

}
