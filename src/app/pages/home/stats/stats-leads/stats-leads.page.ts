import { Component, OnInit } from '@angular/core';

import { QuotationStat } from '@interfaces/quotation-stat.interfaces';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import { StatsLeadsService } from './stats-leads.service';

declare var StatsLeadsPlugin: any;

@Component({
  selector: 'agt-stats-leads',
  templateUrl: './stats-leads.page.html',
  styles: [
  ],
  providers: [StatsLeadsService]
})
export class StatsLeadsPage implements OnInit {

    constructor(private _statsLeadsService: StatsLeadsService) { }

    ngOnInit(): void {

    }

    get canShowQuotationsStats(): boolean {
        return (this.model.quotationsStatsData.length > 1) ? true : false;
    }

    get model(): StatsLeadsService {
        return this._statsLeadsService;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        StatsLeadsPlugin.removeChartQuotations();
        this._loadQuotationsStats(statsPeriodData);
    }

    private _loadQuotationsStats(statsPeriodData: StatsPeriodData): void {
        this.model.getQuotationsStats(statsPeriodData).subscribe((quotationsStats: QuotationStat[][]) => {
            this.model.loadQuotationsStatsData(quotationsStats);
            StatsLeadsPlugin.drawChartQuotations(this.model.quotationsStatsData);
        })
    }

}
