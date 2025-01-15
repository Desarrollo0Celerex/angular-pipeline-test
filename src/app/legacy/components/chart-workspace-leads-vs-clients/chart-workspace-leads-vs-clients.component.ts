import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { RangeData } from '@interfaces/range-data.interface';

import { StatRangeData } from '@interfaces/stat-range-data.interface';

import { ChartWorkspaceLeadsVsClientsService } from './chart-workspace-leads-vs-clients.service';

declare var StatsDashboardPlugin: any;

@Component({
    selector: 'agt-chart-workspace-leads-vs-clients',
    templateUrl: './chart-workspace-leads-vs-clients.component.html',
    styles: [],
    providers: [ChartWorkspaceLeadsVsClientsService],
    standalone: false
})
export class ChartWorkspaceLeadsVsClientsComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;

    constructor(public model: ChartWorkspaceLeadsVsClientsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            StatsDashboardPlugin.removeChartWorkspaceCancellationsVsEmissions();
            this._loadStats(changes.rangeData.currentValue);
        }
    }

    get canShowLeadsVsClientsStats(): boolean {
        return (this.model.statsData.length > 0) ? true : false;
    }

    private _loadStats(rangeData: RangeData): void {
        this.model.getStats(rangeData.rangeStart, rangeData.rangeEnd).subscribe((stats: StatRangeData[][]) => {
            this.model.loadStatsData(stats);
            StatsDashboardPlugin.drawChartWorkspaceLeadsVsClients(this.model.statsData);
        });
    }

}
