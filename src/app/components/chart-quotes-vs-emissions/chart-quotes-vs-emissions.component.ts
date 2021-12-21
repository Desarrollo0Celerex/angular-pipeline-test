import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartQuotesVsEmissionsService } from './chart-quotes-vs-emissions.service';

declare var StatsDashboardPlugin: any;

@Component({
  selector: 'agt-chart-quotes-vs-emissions',
  templateUrl: './chart-quotes-vs-emissions.component.html',
  styles: [
  ],
  providers: [
      ChartQuotesVsEmissionsService
  ]
})
export class ChartQuotesVsEmissionsComponent implements OnInit {

    constructor(
        private _chartQuotesVsEmissiionsService: ChartQuotesVsEmissionsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        StatsDashboardPlugin.removeChartQuotesVsEmissions();
        this._loadStats();
    }

    get model(): ChartQuotesVsEmissionsService {
        return this._chartQuotesVsEmissiionsService;
    }

    get canShowStats(): boolean {
        return (this.model.statsData.length > 0) ? true : false;
    }

    goToPoliciesStats(): void {
        this._router.navigateByUrl(ROUTES_NAME.statsPolicies);
    }

    private _loadStats(): void {
        this.model.getStats().subscribe((stats: RangeStat[][]) => {
            this.model.loadStatsData(stats);
            StatsDashboardPlugin.drawChartQuotesVsEmissions(this.model.statsData);
        });
    }

}
