import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartPendingRenovationsService } from './chart-pending-renovations.service';

declare var StatsPoliciesPlugin: any;

@Component({
  selector: 'agt-chart-pending-renovations',
  templateUrl: './chart-pending-renovations.component.html',
  styles: [
  ],
  providers: [ChartPendingRenovationsService]
})
export class ChartPendingRenovationsComponent implements OnChanges {
    @Input() range: RangeData | null = null;

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

    private _loadPendingRenovationsStats(range: RangeData): void {
        this.model.getPendingRenovationsStats(range).subscribe((pendingRenovationsStats: RangeStat[][]) => {
            this.model.loadPendingRenovationsStatsData(pendingRenovationsStats);
            StatsPoliciesPlugin.drawChartPendingRenovations(this.model.pendingRenovationsStatsData);
        });
    }

}
