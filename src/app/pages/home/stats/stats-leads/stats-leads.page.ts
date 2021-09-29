import { Component, OnInit } from '@angular/core';

import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { LeadGeneratedStat } from '@interfaces/lead-generated-stat.interface';
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

    get canShowLeadsGeneratedStats(): boolean {
        return (this.model.leadsGeneratedStatsData.length > 1) ? true : false;
    }

    get canShowQuotationsStats(): boolean {
        return (this.model.quotationsStatsData.length > 1) ? true : false;
    }

    get canShowContactSourcesStats(): boolean {
        return (this.model.contactSourcesStatsData.length > 1) ? true : false;
    }

    get model(): StatsLeadsService {
        return this._statsLeadsService;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        StatsLeadsPlugin.removeChartLeadsGenerated();
        StatsLeadsPlugin.removeChartQuotations();
        StatsLeadsPlugin.removeChartContactSources();
        this._loadLeadsGeneratedStats(statsPeriodData);
        this._loadQuotationsStats(statsPeriodData);
        this._loadContactSourcesStats(statsPeriodData);
    }

    private _loadLeadsGeneratedStats(statsPeriodData: StatsPeriodData): void {
        this.model.getLeadsGeneratedStats(statsPeriodData).subscribe((leadsGeneratedStats: LeadGeneratedStat[][]) => {
            this.model.loadLeadsGeneratedStatsData(leadsGeneratedStats);
            StatsLeadsPlugin.drawChartLeadsGenerated(this.model.leadsGeneratedStatsData);
        });
    }

    private _loadQuotationsStats(statsPeriodData: StatsPeriodData): void {
        this.model.getQuotationsStats(statsPeriodData).subscribe((quotationsStats: QuotationStat[][]) => {
            this.model.loadQuotationsStatsData(quotationsStats);
            StatsLeadsPlugin.drawChartQuotations(this.model.quotationsStatsData);
        });
    }

    private _loadContactSourcesStats(statsPeriodData: StatsPeriodData): void {
        this.model.getContactSourcesStats(statsPeriodData).subscribe((contactSourcesStats: ContactSourceStat[][]) => {
            this.model.loadContactSourcesStatsData(contactSourcesStats);
            StatsLeadsPlugin.drawChartContactSources(this.model.contactSourcesStatsData);
        });
    }

}
