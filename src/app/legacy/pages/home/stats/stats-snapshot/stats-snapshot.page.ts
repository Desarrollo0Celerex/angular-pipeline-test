import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { Stat } from '@interfaces/stat.interface';
import { ContactTypeStat } from '@interfaces/contact-type-stat.interface';
import { CoverageStat } from '@interfaces/coverage-stat.interface';
import { InsurerStat } from '@interfaces/insurer-stat.interface';
import { LeadStatusStat } from '@interfaces/lead-status-stat.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicySourceStat } from '@interfaces/policy-source-stat.interface';
import { PolicyStatusStat } from '@interfaces/policy-status-stat.interface';
import { PaymentStat } from '@interfaces/payment-stat.interface';
import { PaymentStatusStat } from '@interfaces/payment-status-stat.interface';
import { SinisterStat } from '@interfaces/sinister-stat.interface';

import { StatsSnapshotService } from './stats-snapshot.service';

declare var StatsPlugin: any;

@Component({
    selector: 'agt-stats-snapshot',
    templateUrl: './stats-snapshot.page.html',
    styles: [],
    providers: [StatsSnapshotService],
    standalone: false
})
export class StatsSnapshotPage implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(private _statsSnapshotService: StatsSnapshotService) {}

    get canShowActiveClientsStats(): boolean {
        return this.model.activeClientsStatsData.length > 1 ? true : false;
    }

    get canShowContactSourcesStats(): boolean {
        return this.model.contactSourcesStatsData.length > 1 ? true : false;
    }

    get canShowInsurersStats(): boolean {
        return this.model.insurersStatsData.length > 1 ? true : false;
    }

    get canShowLeadStatusStats(): boolean {
        return this.model.leadStatusStatsData.length > 1 ? true : false;
    }

    get canShowClientStatusStats(): boolean {
        return this.model.clientStatusStatsData.length > 1 ? true : false;
    }

    get canShowCoveragesStats(): boolean {
        return this.model.coveragesStatsData.length > 1 ? true : false;
    }

    get canShowPolicySourcesStats(): boolean {
        return this.model.policySourcesStatsData.length > 1 ? true : false;
    }

    get canShowPolicyStatusStats(): boolean {
        return this.model.policyStatusStatsData.length > 1 ? true : false;
    }

    get canShowPaymentsStats(): boolean {
        return this.model.paymentsStatsData.length > 1 ? true : false;
    }

    get canShowPaymentStatusStats(): boolean {
        return this.model.paymentStatusStatsData.length > 1 ? true : false;
    }

    get canShowSinistersStats(): boolean {
        return this.model.sinistersStatsData.length > 1 ? true : false;
    }

    get canShowSinisterStatusStats(): boolean {
        return this.model.sinisterStatusStatsData.length > 1 ? true : false;
    }

    get model(): StatsSnapshotService {
        return this._statsSnapshotService;
    }

    ngOnInit(): void {
        this._loadCoveragesStats();
        this._loadInsurersStats();
        this._loadContactsSourceStats();
        this._loadLeadStatusStats();
        this._loadActiveClientsStats();
        this._loadClientStatusStats();
        this._loadPolicySourcesStats();
        this._loadPolicyStatusStats();
        this._loadPaymentsStats();
        this._loadPaymentStatusStats();
        this._loadSinistersStats();
        this._loadSinisterStatusStats();
    }

    /**
     * Load the contact sources stats
     */
    private _loadActiveClientsStats(): void {
        this.model
            .getActiveClientsStats()
            .subscribe((activeClientsStats: ContactTypeStat[]) => {
                this.model.loadActiveClientsStatsData(activeClientsStats);
                StatsPlugin.drawChartActiveClients(
                    this.model.activeClientsStatsData
                );
            });
    }

    private _loadCoveragesStats(): void {
        this.model.getWorkspaceCountry().subscribe((country: string) => {
            this.model
                .getCoveragesStats()
                .subscribe((coveragesStats: CoverageStat[]) => {
                    this.model.loadCoveragesStatsData(coveragesStats);
                    StatsPlugin.drawChartCoverages(
                        country,
                        this.model.coveragesStatsData
                    );
                });
        });
    }

    /**
     * Load the insurers stats
     */
    private _loadInsurersStats(): void {
        this.model
            .getInsurersStats()
            .subscribe((insurersStats: InsurerStat[]) => {
                this.model.loadInsurersStatsData(insurersStats);
                StatsPlugin.drawChartInsurers(this.model.insurersStatsData);
            });
    }

    /**
     * Load the contact sources stats
     */
    private _loadContactsSourceStats(): void {
        this.model
            .getContactSourcesStats()
            .subscribe((contactSourcesStats: Stat[]) => {
                this.model.loadContactSourcesStatsData(contactSourcesStats);
                StatsPlugin.drawChartContactSources(
                    this.model.contactSourcesStatsData
                );
            });
    }

    /**
     * Load the lead status stats
     */
    private _loadLeadStatusStats(): void {
        this.model
            .getLeadStatusStats()
            .subscribe((leadStatusStats: LeadStatusStat[]) => {
                this.model.loadLeadStatusStatsData(leadStatusStats);
                StatsPlugin.drawChartLeadStatus(this.model.leadStatusStatsData);
            });
    }

    /**
     * Load the client status stats
     */
    private _loadClientStatusStats(): void {
        this.model.getClientStatusStats().subscribe((res: HttpResponse) => {
            this.model.loadClientStatusStatsData(res.data);
            StatsPlugin.drawChartClientStatus(this.model.clientStatusStatsData);
        });
    }

    /**
     * Load the policy sources stats
     */
    private _loadPolicySourcesStats(): void {
        this.model
            .getPolicySourcesStats()
            .subscribe((policySourcesStats: PolicySourceStat[]) => {
                this.model.loadPolicySourcesStatsData(policySourcesStats);
                StatsPlugin.drawChartPolicySources(
                    this.model.policySourcesStatsData
                );
            });
    }

    /**
     * Load the policy status stats
     */
    private _loadPolicyStatusStats(): void {
        this.model
            .getPolicyStatusStats()
            .subscribe((policyStatusStats: PolicyStatusStat[]) => {
                this.model.loadPolicyStatusStatsData(policyStatusStats);
                StatsPlugin.drawChartPolicyStatus(
                    this.model.policyStatusStatsData
                );
            });
    }

    /**
     * Load the payments stats
     */
    private _loadPaymentsStats(): void {
        this.model
            .getPaymentsStats()
            .subscribe((paymentsStats: PaymentStat[]) => {
                this.model.loadPaymentsStatsData(paymentsStats);
                StatsPlugin.drawChartPayments(this.model.paymentsStatsData);
            });
    }

    /**
     * Load the payment status stats
     */
    private _loadPaymentStatusStats(): void {
        this.model
            .getPaymentStatusStats()
            .subscribe((paymentStatusStats: PaymentStatusStat[]) => {
                this.model.loadPaymentStatusStatsData(paymentStatusStats);
                StatsPlugin.drawChartPaymentStatus(
                    this.model.paymentStatusStatsData
                );
            });
    }

    /**
     * Load the sinisters stats
     */
    private _loadSinistersStats(): void {
        this.model
            .getSinistersStats()
            .subscribe((sinistersStats: SinisterStat[]) => {
                this.model.loadSinistersStatsData(sinistersStats);
                StatsPlugin.drawChartSinisters(this.model.sinistersStatsData);
            });
    }

    /**
     * Load the sinister status stats
     */
    private _loadSinisterStatusStats(): void {
        this.model
            .getSinisterStatusStats()
            .subscribe((sinisterStatusStats: any[]) => {
                this.model.loadSinisterStatusStatsData(sinisterStatusStats);
                StatsPlugin.drawChartSinisterStatus(
                    this.model.sinisterStatusStatsData
                );
            });
    }
}
