import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

import { ChartWorkspaceCancellationsVsEmissionsService } from './chart-workspace-cancellations-vs-emissions.service';

declare var StatsDashboardPlugin: any;

@Component({
  selector: 'agt-chart-workspace-cancellations-vs-emissions',
  templateUrl: './chart-workspace-cancellations-vs-emissions.component.html',
  styles: [
  ],
  providers: [ChartWorkspaceCancellationsVsEmissionsService]
})
export class ChartWorkspaceCancellationsVsEmissionsComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;

    constructor(
        public model: ChartWorkspaceCancellationsVsEmissionsService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            StatsDashboardPlugin.removeChartWorkspaceCancellationsVsEmissions();
            this._loadStats(changes.rangeData.currentValue);
        }
    }

    ngOnInit(): void {
        
    }

    get canShowStats(): boolean {
        return (this.model.statsData.length > 0) ? true : false;
    }

    goToPoliciesStats(): void {
        this._router.navigateByUrl(ROUTES_NAME.statsPolicies);
    }

    private _loadStats(rangeData: RangeData): void {
        this.model.getStats(rangeData.rangeStart, rangeData.rangeEnd).subscribe((stats: StatRangeData[][]) => {
            this.model.loadStatsData(stats);
            StatsDashboardPlugin.drawChartWorkspaceCancellationsVsEmissions(this.model.statsData);
        });
    }
}
