import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LEAD_STATUS, CLIENT_STATUS, POLICY_SOURCES, POLICY_STATUS, PAYMENT_STATUS, SINISTER_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { PluralNameFormatPipe } from '@pipes/plural-name-format/plural-name-format.pipe';

import { Stat } from '@interfaces/stat.interface';
import { ContactTypeStat } from '@interfaces/contact-type-stat.interface';
import { InsurerStat } from '@interfaces/insurer-stat.interface';
import { LeadStatusStat } from '@interfaces/lead-status-stat.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicySourceStat } from '@interfaces/policy-source-stat.interface';
import { PolicyStatusStat } from '@interfaces/policy-status-stat.interface';
import { PaymentStat } from '@interfaces/payment-stat.interface';
import { PaymentStatusStat } from '@interfaces/payment-status-stat.interface';
import { SinisterStat } from '@interfaces/sinister-stat.interface';

import { InsurerService } from '@services/insurer.service';
import { ContactSourceService } from '@services/contact-source.service';
import { LeadStatusService } from '@services/lead-status.service';
import { ContactTypeService } from '@services/contact-type.service';
import { ClientStatusService } from '@services/client-status.service';
import { PolicySourceService } from '@services/policy-source.service';
import { PolicyStatusService } from '@services/policy-status.service';
import { PaymentService } from '@services/payment.service';
import { PaymentStatusService } from '@services/payment-status.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterStatusService } from '@services/sinister-status.service';

@Injectable()
export class StatsSnapshotService {
    insurersStatsData: any[] = [['ID', 'Pólizas Activas', 'Clientes', 'Clasificación', 'Prima Total']];
    contactSourcesStatsData: any[] = [['Canal', 'Prospectos', { role: 'style' }]];
    leadStatusStatsData: any[] = [['Ramos', 'Pólizas']];
    activeClientsStatsData: any[] = [['Tipo', 'Total']];
    clientStatusStatsData: any[] = [['Estatus', 'Ocasionales', 'Frecuentes', 'Influyentes']];
    policySourcesStatsData: any[] = [['Ramos', 'Pólizas']];
    policyStatusStatsData: any[] = [['Pólizas', 'Estatus', { role: "style" }]];
    paymentStatusStatsData: any[] = [['Recibos', 'Estatus', { role: "style" }]];
    paymentsStatsData: any[] = [['Tipo', 'Total']];
    sinistersStatsData: any[] = [['Tipo', 'Total']];
    sinisterStatusStatsData: any[] = [['Origen', 'Personas', 'Empresas']];

    constructor(
        private _pluralNameFormatPipe: PluralNameFormatPipe,
        private _contactSourceService: ContactSourceService,
        private _insurerService: InsurerService,
        private _leadStatusService: LeadStatusService,
        private _contactTypeService: ContactTypeService,
        private _clientStatusService: ClientStatusService,
        private _policySourceService: PolicySourceService,
        private _policyStatusService: PolicyStatusService,
        private _paymentService: PaymentService,
        private _paymentStatusService: PaymentStatusService,
        private _sinisterService: SinisterService,
        private _sinisterStatusService: SinisterStatusService,
    ) { }

    /**
     * Get the active clients stats
     * @return The active clients
     */
    getActiveClientsStats(): Observable<ContactTypeStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL]);
        return this._contactTypeService.getContactTypesStats(filters);
    }

    /**
     * Get the contact sources stats
     * @return The contact sources
     */
    getContactSourcesStats(): Observable<Stat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED]);
        return this._contactSourceService.getContactSourcesStats(filters);
    }

    /**
     * Get the insurers Stats
     * @return The insurers stats
     */
    getInsurersStats(): Observable<InsurerStat[]> {
        return this._insurerService.getInsurersStats();
    }

    /**
     * Get the lead status stats
     * @return The lead status stats
     */
    getLeadStatusStats(): Observable<LeadStatusStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED]);
        return this._leadStatusService.getLeadStatusStats(filters);
    }

    /**
     * Get the lead status stats
     * @return The lead status stats
     */
    getClientStatusStats(): Observable<HttpResponse> {
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL]);
        return this._clientStatusService.getClientStatusStats(filters);
    }

    /**
     * Get the policy sources stats
     * @return The policy sources stats
     */
    getPolicySourcesStats(): Observable<PolicySourceStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('policySourceId', [POLICY_SOURCES.NEW, POLICY_SOURCES.RENEWAL, POLICY_SOURCES.REISSUE]);
        return this._policySourceService.getPolicySourcesStats(filters);
    }

    /**
     * Get the policy status stats
     * @return The policy status stats
     */
    getPolicyStatusStats(): Observable<PolicyStatusStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED]);
        return this._policyStatusService.getPolicyStatusStats(filters);
    }

    /**
     * Get the payments stats
     * @return The payments stats
     */
    getPaymentsStats(): Observable<PaymentStat[]> {
        return this._paymentService.getPaymentsStats();
    }

    /**
     * Get the payment status stats
     * @return The payment status stats
     */
    getPaymentStatusStats(): Observable<PaymentStatusStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE]);
        return this._paymentStatusService.getPaymentStatusStats(filters);
    }

    /**
     * Get the sinisters stats
     * @return The sinisters stats
     */
    getSinistersStats(): Observable<SinisterStat[]> {
        return this._sinisterService.getSinistersStats();
    }

    /**
     * Get the sinister status stats
     * @return The sinister status stats
     */
    getSinisterStatusStats(): Observable<SinisterStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE]);
        return this._sinisterStatusService.getSinisterStatusStats(filters);
    }

    /**
     * Load the insurers stats data
     * @param insurersStats The insurers stats
     */
    loadInsurersStatsData(insurersStats: InsurerStat[]): void {
        for (let insurerStats of insurersStats) {
            let insurerData: any[] = [
                insurerStats.shorName,
                insurerStats.totalPolicies,
                insurerStats.totalClients,
                insurerStats.category,
                UtilitiesHelper.getQuantityWithOnlyTwoDecimals(insurerStats.totalAmount)
            ];
            this.insurersStatsData.push(insurerData);
        }
    }

    /**
     * Load the contact source stats data
     * @param contactSourcesStats The contact sources stats
     */
    loadContactSourcesStatsData(contactSourcesStats: Stat[]): void {
        for (let index in contactSourcesStats) {
            const contactSourceStats: Stat = contactSourcesStats[index]
            const color: string = ((parseInt(index) % 2) === 0) ? '#543888' : '#262258';
            let data: any[] = [
                contactSourceStats.name,
                contactSourceStats.value,
                'fill-color: '+color+'; opacity: 0.8'
            ];
            this.contactSourcesStatsData.push(data);
        }
    }

    /**
     * Load the lead status stats data
     * @param insurersStats The lead status stats
     */
    loadLeadStatusStatsData(leadStatusStats: LeadStatusStat[]): void {
        for (let insurerStats of leadStatusStats) {
            let data: any[] = [
                this._pluralNameFormatPipe.transform(insurerStats.name),
                insurerStats.totalLeads
            ];
            this.leadStatusStatsData.push(data);
        }
    }

    /**
     * Load the active clients stats data
     * @param ContactTypeStat The active clients stats
     */
    loadActiveClientsStatsData(activeClientsStats: ContactTypeStat[]): void {
        for (let contactSourceStats of activeClientsStats) {
            let data: any[] = [
                this._pluralNameFormatPipe.transform(contactSourceStats.name),
                contactSourceStats.totalContacts,
            ];
            this.activeClientsStatsData.push(data);
        }
    }

    /**
     * Load the lead status stats data
     * @param insurersStats The lead status stats
     */
    loadClientStatusStatsData(data: any): void {
        data[0][0] = this._pluralNameFormatPipe.transform(data[0][0]);
        data[1][0] = this._pluralNameFormatPipe.transform(data[1][0]);
        this.clientStatusStatsData.push(data[0]);
        this.clientStatusStatsData.push(data[1]);
    }

    /**
     * Load the policy sources stats data
     * @param insurersStats The policy sources stats
     */
    loadPolicySourcesStatsData(policySourcesStats: PolicySourceStat[]): void {
        for (let policySourceStats of policySourcesStats) {
            let data: any[] = [
                this._pluralNameFormatPipe.transform(policySourceStats.name),
                policySourceStats.totalPolicies
            ];
            this.policySourcesStatsData.push(data);
        }
    }

    /**
     * Load the policy status stats data
     * @param insurersStats The policy status stats
     */
    loadPolicyStatusStatsData(policyStatusStats: PolicyStatusStat[]): void {
        const colors: string[] = ['#ec4178', '#262258', '#a13678', '#543888'];
        for (let index in policyStatusStats) {
            const policyStatus: PolicyStatusStat = policyStatusStats[index];
            let data: any[] = [
                this._pluralNameFormatPipe.transform(policyStatus.name),
                policyStatus.totalPolicies,
                'fill-color: '+colors[index]+'; opacity: 0.8'
            ];
            this.policyStatusStatsData.push(data);
        }
    }

    /**
     * Load the payments stats data
     * @param insurersStats The payments stats
     */
    loadPaymentsStatsData(paymentsStats: PaymentStat[]): void {
        for (let paymentStat of paymentsStats) {
            let data: any[] = [
                paymentStat.name,
                paymentStat.totalReceipts,
            ];
            this.paymentsStatsData.push(data);
        }
    }

    /**
     * Load the payment sources stats data
     * @param insurersStats The payment sources stats
     */
    loadPaymentStatusStatsData(paymentStatusStats: PaymentStatusStat[]): void {
        for (let index in paymentStatusStats) {
            const paymentStatus: PaymentStatusStat = paymentStatusStats[index];
            const color: string = ((parseInt(index) % 2) === 0) ? '#543888' : '#262258';
            let data: any[] = [
                this._pluralNameFormatPipe.transform(paymentStatus.name),
                paymentStatus.totalPayments,
                'fill-color: '+color+'; opacity: 0.8'
            ];
            this.paymentStatusStatsData.push(data);
        }
    }

    /**
     * Load the sinisters stats data
     * @param insurersStats The sinisters stats
     */
    loadSinistersStatsData(sinistersStats: SinisterStat[]): void {
        for (let sinisterStat of sinistersStats) {
            let data: any[] = [
                this._pluralNameFormatPipe.transform(sinisterStat.name),
                sinisterStat.totalSinisters
            ];
            this.sinistersStatsData.push(data);
        }
    }

    /**
     * Load the sinister status stats data
     * @param insurersStats The sinister status stats
     */
    loadSinisterStatusStatsData(sinisterStatusStats: any[]): void {
        for (let sinisterStatusStat of sinisterStatusStats) {
            let data: any[] = [];
            for (let key in sinisterStatusStat) {
                const value = (parseInt(key) === 0) ? this._pluralNameFormatPipe.transform(sinisterStatusStat[key]) : sinisterStatusStat[key];
                data.push(value)
            }
            this.sinisterStatusStatsData.push(data);
        }
    }

}
