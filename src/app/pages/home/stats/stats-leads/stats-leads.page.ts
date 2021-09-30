import { Component, OnInit } from '@angular/core';

import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { Stat } from '@interfaces/stat.interface';

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
        return (this.model.leadsGeneratedStatsData.length > 0) ? true : false;
    }

    get canShowContactSourcesStats(): boolean {
        return (this.model.contactSourcesStatsData.length > 1) ? true : false;
    }

    get canShowQuotationsStats(): boolean {
        return (this.model.quotationsStatsData.length > 0) ? true : false;
    }

    get model(): StatsLeadsService {
        return this._statsLeadsService;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.model.generatePeriods(statsPeriodData);
        this._initContents();
        this._loadContents();
    }

    private _initContents(): void {
        StatsLeadsPlugin.removeChartLeadsGenerated();
        StatsLeadsPlugin.removeChartQuotations();
        StatsLeadsPlugin.removeChartContactSources();
    }

    private _loadContents(): void {
        this._loadLeadsGeneratedStats();
        this._loadContactSourcesStats();
        this._loadActivePartners();
        this._loadQuotationsStats();
    }

    private _loadLeadsGeneratedStats(): void {
        this.model.getLeadsGeneratedStats().subscribe((leadsGeneratedStats: RangeStat[][]) => {
            this.model.loadLeadsGeneratedStatsData(leadsGeneratedStats);
            StatsLeadsPlugin.drawChartLeadsGenerated(this.model.leadsGeneratedStatsData);
        });
    }

    private _loadContactSourcesStats(): void {
        this.model.getContactSourcesStats().subscribe((contactSourcesStats: ContactSourceStat[][]) => {
            this.model.loadContactSourcesStatsData(contactSourcesStats);
            StatsLeadsPlugin.drawChartContactSources(this.model.contactSourcesStatsData);
            this.model.loadActiveChannelsData(contactSourcesStats);
        });
    }

    private _loadActivePartners(): void {
        this.model.getPartners().subscribe((stats: Stat[][]) => {
            this.model.loadActivePartnersData(stats);
            /*StatsLeadsPlugin.drawChartContactSources(this.model.statsData);
            this.model.loadActiveChannelsData(stats);*/
        });
    }

    private _loadQuotationsStats(): void {
        this.model.getQuotationsStats().subscribe((quotationsStats: RangeStat[][]) => {
            this.model.loadQuotationsStatsData(quotationsStats);
            StatsLeadsPlugin.drawChartQuotations(this.model.quotationsStatsData);
        });
    }

}
