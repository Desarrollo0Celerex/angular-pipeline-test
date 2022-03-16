import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { ExternalPolicyDetails } from '@interfaces/external-policy-details.interface';
import { ExternalPolicyService } from '@services/external-policy.service';

@Injectable()
export class ModalShowExternalPolicyDetailsService {
    externalPolicy: ExternalPolicyDetails = this._buildPolicyExternalDetails();

    constructor(private _externalPolicyService: ExternalPolicyService) { }

    loadPolicyDetails(contactId: string, externalPolicyId: string): void {
        this.externalPolicy = this._buildPolicyExternalDetails();
        const fields: string = 'titularName,policyNumber,emissionDate,validityStartDate,validityEndDate,insurerShortName,policyAmount,policyUrl';
        this._externalPolicyService.getContactExternalPolicy(contactId, externalPolicyId, fields).subscribe( (res: HttpResponse) => {
            this.externalPolicy = res.data;
        })
    }

    private _buildPolicyExternalDetails(): ExternalPolicyDetails {
        return {
            titularName: '',
            policyNumber: '',
            emissionDate: '',
            validityStartDate: '',
            validityEndDate: '',
            insurerShortName: '',
            policyAmount: '',
            policyUrl: ''
        }
    }
}
