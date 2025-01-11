import { Component, OnInit, Input } from '@angular/core';

import { ChartPolicySinistersBehaviorService } from './chart-policy-sinisters-behavior.service';

declare var StatsRecordPlugin: any;

@Component({
    selector: 'agt-chart-policy-sinisters-behavior',
    templateUrl: './chart-policy-sinisters-behavior.component.html',
    styles: [],
    providers: [ChartPolicySinistersBehaviorService],
    standalone: false
})
export class ChartPolicySinistersBehaviorComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: ChartPolicySinistersBehaviorService) { }

    get canShowChart(): boolean {
        return (this.model.policySinisterBehaviorStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicySinistersBehavior();
        this._loadPolicySinisterBehaviorStatistics();
    }

    private _loadPolicySinisterBehaviorStatistics(): void {
        this.model.loadPolicySinisterBehaviorStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicySinistersBehavior(this.model.policySinisterBehaviorStatistics);
        });
    }

}
