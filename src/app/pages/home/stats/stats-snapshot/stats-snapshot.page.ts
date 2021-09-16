import { Component, OnInit } from '@angular/core';

import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { ContactTypeStat } from '@interfaces/contact-type-stat.interface';
import { InsurerStat } from '@interfaces/insurer-stat.interface';
import { LeadStatusStat } from '@interfaces/lead-status-stat.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicySourceStat } from '@interfaces/policy-source-stat.interface';

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

    get canShowActiveClientsStats(): boolean {
        return (this.model.activeClientsStatsData.length > 1) ? true : false;
    }

    get canShowContactSourcesStats(): boolean {
        return (this.model.contactSourcesStatsData.length > 1) ? true : false;
    }

    get canShowInsurersStats(): boolean {
        return (this.model.insurersStatsData.length > 1) ? true : false;
    }

    get canShowLeadStatusStats(): boolean {
        return (this.model.leadStatusStatsData.length > 1) ? true : false;
    }

    get canShowClientStatusStats(): boolean {
        return (this.model.clientStatusStatsData.length > 1) ? true : false;
    }

    get canShowPolicySourcesStats(): boolean {
        return (this.model.policySourcesStatsData.length > 1) ? true : false;
    }

    get model(): StatsSnapshotService {
        return this._statsSnapshotService;
    }

    ngOnInit(): void {
        this._loadInsurersStats();
        this._loadContactsSourceStats();
        this._loadLeadStatusStats();
        this._loadActiveClientsStats();
        this._loadClientStatusStats();
        this._loadPolicySourcesStats();
    }

    /**
     * Load the contact sources stats
     */
    private _loadActiveClientsStats(): void {
        this.model.getActiveClientsStats().subscribe((activeClientsStats: ContactTypeStat[]) => {
            this.model.loadActiveClientsStatsData(activeClientsStats);
            StatsPlugin.drawChartActiveClients(this.model.activeClientsStatsData);
        })
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

    /**
     * Load the client status stats
     */
    private _loadClientStatusStats(): void {
        this.model.getClientStatusStats().subscribe((res: HttpResponse) => {
            this.model.loadClientStatusStatsData(res.data);
            StatsPlugin.drawChartClientStatus(this.model.clientStatusStatsData);
        })
    }

    /**
     * Load the policy sources stats
     */
    private _loadPolicySourcesStats(): void {
        this.model.getPolicySourcesStats().subscribe((policySourcesStats: PolicySourceStat[]) => {
            this.model.loadPolicySourcesStatsData(policySourcesStats);
            StatsPlugin.drawChartPolicySources(this.model.policySourcesStatsData);
        })
    }

}
