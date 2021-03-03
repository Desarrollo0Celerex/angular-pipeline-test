import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
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
        const fields: string = 'policyNumber,amount,amountApplied,bills,emissionDate,validityStartDate,validityEndDate,totalSinisters,totalEndorsements';
        this._policyService.getContactPolicy(contactId, policyId, fields).subscribe( (res: HttpResponse) => {
            this.policyDetails = res.data;
            this.policyDetails.totalSinisters = '0';
            this.policyDetails.totalEndorsements = '0';
        })
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
            amount: '',
            amountApplied: '',
            bills: '',
            emissionDate: '',
            validityStartDate: '',
            validityEndDate: '',
            totalSinisters: '',
            totalEndorsements: ''
        }
    }
}
