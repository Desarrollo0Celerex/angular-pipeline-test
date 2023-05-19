import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Policy } from '@core/interfaces/policy.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ModalShowPolicyFileService {
    policy: Policy | null = null;

    constructor(private _policyService: PolicyService) {}

    getPolicy(contactId: string, policyId: string): Observable<HttpResponse> {
        const fields: string = 'policyUrl';
        return this._policyService.getContactPolicy(
            contactId,
            policyId,
            fields
        );
    }
}
