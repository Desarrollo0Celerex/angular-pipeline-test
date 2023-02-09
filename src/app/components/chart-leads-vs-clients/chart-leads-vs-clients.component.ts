import { Component, OnInit } from '@angular/core';

import { StatRangeData } from '@interfaces/stat-range-data.interface';

import { ChartLeadsVsClientsService } from './chart-leads-vs-clients.service';

declare var StatsDashboardPlugin: any;

@Component({
  selector: 'agt-chart-leads-vs-clients',
  templateUrl: './chart-leads-vs-clients.component.html',
  styles: [
  ],
  providers: [ChartLeadsVsClientsService]
})
export class ChartLeadsVsClientsComponent implements OnInit {

    constructor(public model: ChartLeadsVsClientsService) { }

    ngOnInit(): void {
        this._loadStats();
    }

    get canShowLeadsVsClientsStats(): boolean {
        return (this.model.statsData.length > 0) ? true : false;
    }

    private _loadStats(): void {
        this.model.getStats().subscribe((stats: StatRangeData[][]) => {
            this.model.loadStatsData(stats);
            StatsDashboardPlugin.drawChartLeadsVsClients(this.model.statsData);
        });
    }

}
