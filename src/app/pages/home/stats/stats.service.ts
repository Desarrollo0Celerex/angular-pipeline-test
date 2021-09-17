import { Injectable } from '@angular/core';

import { LEAD_STATUS, CLIENT_STATUS, POLICY_STATUS, SINISTER_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { LeadService } from '@services/lead.service';
import { ClientService } from '@services/client.service';
import { PolicyService } from '@services/policy.service';
import { SinisterService } from '@services/sinister.service';

import * as moment from 'moment';

@Injectable()
export class StatsService {
    totalActiveLeads: number = 0;
    totalActiveClients: number = 0;
    totalActivePolicies: number = 0;
    latestTotalActivePolicies: number = 0;
    totalActiveSinisters: number = 0;
    latestTotalActiveSinisters: number = 0;

    constructor(
        private _leadService: LeadService,
        private _clientService: ClientService,
        private _policyService: PolicyService,
        private _sinisterService: SinisterService,
    ) { }

    loadTotalActiveLeads(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED])
        this._leadService.getTotalLeadsAux(filters).subscribe((totalLeads: number) => {
            this.totalActiveLeads = totalLeads;
        })
    }

    loadTotalActiveClients(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL])
        this._clientService.getTotalClientsAux(filters).subscribe((totalClients: number) => {
            this.totalActiveClients = totalClients;
        })
    }

    loadTotalActivePolicies(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED])
        this._policyService.getTotalWorkspacePolicies(filters).subscribe((totalPolicies: number) => {
            this.totalActivePolicies = totalPolicies;
        })
    }

    loadLatestTotalActivePolicies(): void {
        const endDate: string = moment().format('DD/MM/YYYY');
        const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY')
        let filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED])
        filters += ',' + UtilitiesHelper.generateHttpFilterByRange(startDate, endDate);
        this._policyService.getTotalWorkspacePolicies(filters).subscribe((totalPolicies: number) => {
            this.latestTotalActivePolicies = totalPolicies;
        })
    }

    loadTotalActiveSinisters(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE])
        this._sinisterService.getTotalWorkspaceSinisters(filters).subscribe((totalSinisters: number) => {
            this.totalActiveSinisters = totalSinisters;
        })
    }

    loadLatestTotalActiveSinisters(): void {
        const endDate: string = moment().format('DD/MM/YYYY');
        const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY')
        let filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE])
        filters += ',' + UtilitiesHelper.generateHttpFilterByRange(startDate, endDate);
        this._sinisterService.getTotalWorkspaceSinisters(filters).subscribe((totalSinisters: number) => {
            this.latestTotalActiveSinisters = totalSinisters;
        })
    }
}
