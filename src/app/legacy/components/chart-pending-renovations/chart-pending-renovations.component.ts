import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

import { ChartPendingRenovationsService } from './chart-pending-renovations.service';

declare var StatsPoliciesPlugin: any;

@Component({
    selector: 'agt-chart-pending-renovations',
    templateUrl: './chart-pending-renovations.component.html',
    styles: [],
    providers: [ChartPendingRenovationsService],
    standalone: false
})
export class ChartPendingRenovationsComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _chartPendingRenovationsService: ChartPendingRenovationsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsPoliciesPlugin.removeChartPendingRenovations();
        this._loadPendingRenovationsStats(changes.range.currentValue);
    }

    get model(): ChartPendingRenovationsService {
        return this._chartPendingRenovationsService;
    }

    get canShowPendingRenovationsStats(): boolean {
        return (this.model.pendingRenovationsStatsData.length > 0) ? true : false;
    }

    private _loadPendingRenovationsStats(range: ComparisonRangeData): void {
        this.model.getPendingRenovationsStats(range).subscribe((pendingRenovationsStats: StatRangeData[][]) => {
            this.model.loadPendingRenovationsStatsData(pendingRenovationsStats);
            StatsPoliciesPlugin.drawChartPendingRenovations(this.model.pendingRenovationsStatsData);
        });
    }

}
