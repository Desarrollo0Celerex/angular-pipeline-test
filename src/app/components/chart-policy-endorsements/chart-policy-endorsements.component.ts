import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
    @Input() canShowFooter: boolean = false;
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    constructor(public model: ChartPolicyEndorsementsService) { }

    get canShowChart(): boolean {
        return (this.model.policyEndorsementStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicyEndorsements();
        this._loadPolicyEndorsementStatistics();
    }

    confirmAction(): void {
        this.confirmedAction.emit();
    }

    private _loadPolicyEndorsementStatistics(): void {
        this.model.loadPolicyEndorsementStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicyEndorsements(this.model.policyEndorsementStatistics);
        });
    }
}
