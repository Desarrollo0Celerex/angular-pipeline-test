import { Component, OnInit } from '@angular/core';

import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { InsurerStat } from '@interfaces/insurer-stat.interface';
import { LeadStatusStat } from '@interfaces/lead-status-stat.interface';

import { StatsSnapshotService } from './stats-snapshot.service';

declare var StatsPlugin: any;

@Component({
  selector: 'agt-stats-snapshot',
  templateUrl: './stats-snapshot.page.html',
  styles: [
  ],
  providers: [StatsSnapshotService]
})
export class StatsSnapshotPage implements OnInit {

    constructor(private _statsSnapshotService: StatsSnapshotService) { }

    get canShowContactSourcesStats(): boolean {
        return (this.model.contactSourcesStatsData.length > 1) ? true : false;
    }

    get canShowInsurersStats(): boolean {
        return (this.model.insurersStatsData.length > 1) ? true : false;
    }

    get canShowLeadStatusStats(): boolean {
        return (this.model.leadStatusStatsData.length > 1) ? true : false;
    }

    get model(): StatsSnapshotService {
        return this._statsSnapshotService;
    }

    ngOnInit(): void {
        this._loadInsurersStats();
        this._loadContactsSourceStats();
        this._loadLeadStatusStats();
    }

    /**
     * Load the insurers stats
     */
    private _loadInsurersStats(): void {
        this.model.getInsurersStats().subscribe((insurersStats: InsurerStat[]) => {
            this.model.loadInsurersStatsData(insurersStats);
            StatsPlugin.drawChartInsurers(this.model.insurersStatsData);
        })
    }

    /**
     * Load the contact sources stats
     */
    private _loadContactsSourceStats(): void {
        this.model.getContactSourcesStats().subscribe((contactSourcesStats: ContactSourceStat[]) => {
            this.model.loadContactSourcesStatsData(contactSourcesStats);
            StatsPlugin.drawChartContactSources(this.model.contactSourcesStatsData);
        })
    }

    /**
     * Load the lead status stats
     */
    private _loadLeadStatusStats(): void {
        this.model.getLeadStatusStats().subscribe((leadStatusStats: LeadStatusStat[]) => {
            this.model.loadLeadStatusStatsData(leadStatusStats);
            StatsPlugin.drawChartLeadStatus(this.model.leadStatusStatsData);
        })
    }

}
