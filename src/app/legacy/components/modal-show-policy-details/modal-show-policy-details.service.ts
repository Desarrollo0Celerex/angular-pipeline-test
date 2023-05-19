import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyDetails } from '@interfaces/policy-details.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ModalShowPolicyDetailsService {
    policyDetails: PolicyDetails;

    constructor(private _policyService: PolicyService) {
        this.policyDetails = this._buildPolicyDetails();
    }

    /**
     * Load the policy details
     * @param contactId The contact ID
     * @param policyId  The policy ID
     */
    loadPolicyDetails(contactId: string, policyId: string): void {
        const fields: string =
            'policyNumber,totalAmount,totalAmountPaid,bills,emissionDate,validityStartDate,validityEndDate,totalSinisters,totalEndorsements,insurerName,titularName,totalRenewals,totalBills,totalTickets,totalOpenSinisters,paymentId,coveredProperty';
        this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .subscribe((res: HttpResponse) => {
                this.policyDetails = res.data;
            });
    }

    /**
     * Reset the policy details
     */
    resetPolicyDetails(): void {
        this.policyDetails = this._buildPolicyDetails();
    }

    /**
     * Build an empty policy details
     * @return The empty policy details
     */
    private _buildPolicyDetails(): PolicyDetails {
        return {
            policyNumber: '',
            totalAmount: '',
            totalAmountPaid: 0,
            bills: '',
            emissionDate: '',
            validityStartDate: '',
            validityEndDate: '',
            totalSinisters: '',
            totalEndorsements: '',
            titularName: '',
            insurerName: '',
            totalRenewals: 0,
            totalBills: 0,
            totalTickets: 0,
            totalOpenSinisters: 0,
            paymentId: '',
            coveredProperty: '',
        };
    }
}
