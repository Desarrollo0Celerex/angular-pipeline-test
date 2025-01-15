import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ChartPolicySinistersService } from './chart-policy-sinisters.service';

declare var StatsRecordPlugin: any;

@Component({
    selector: 'agt-chart-policy-sinisters',
    templateUrl: './chart-policy-sinisters.component.html',
    styles: [],
    providers: [ChartPolicySinistersService],
    standalone: false
})
export class ChartPolicySinistersComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() canShowFooter: boolean = false;
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    constructor(public model: ChartPolicySinistersService) { }

    get canShowChart(): boolean {
        return (this.model.policySinisterStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicySinisters();
        this._loadPolicySinisterStatistics();
    }

    confirmAction(): void {
        this.confirmedAction.emit();
    }

    private _loadPolicySinisterStatistics(): void {
        this.model.loadPolicySinisterStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicySinisters(this.model.policySinisterStatistics);
        });
    }

}
