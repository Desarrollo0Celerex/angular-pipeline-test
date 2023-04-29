import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateContactDataSend } from '@interfaces/create-contact-data-send.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { RenewContactPolicyDataSend } from '@interfaces/renew-contact-policy-data-send.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ListContactCoincidencesService {
    constructor(
        private _contactService: ContactService,
        private _policyService: PolicyService
    ) {}

    /**
     * Create a contact
     * @param  requestBody The contact data
     * @return             The created contact ID
     */
    createContact(requestBody: CreateContactDataSend): Observable<string> {
        return this._contactService.createContact(requestBody);
    }

    /**
     * Renew the policy
     * @param  originContactId The origin contact ID
     * @param  originPolicyId  The origin policy ID
     * @param  contactId       The contact ID
     * @return                 The renewed policy ID
     */
    renewPolicy(
        originContactId: string,
        originPolicyId: string,
        contactId: string
    ): Observable<HttpResponse> {
        const requestBody: RenewContactPolicyDataSend = { contactId };
        return this._policyService.renewContactPolicy(
            originContactId,
            originPolicyId,
            requestBody
        );
    }

    /**
     * Reissue the policy
     * @param  originContactId The origin contact ID
     * @param  originPolicyId  The origin policy ID
     * @param  contactId       The contact ID
     * @return                 The reissueed policy ID
     */
    reissuePolicy(
        originContactId: string,
        originPolicyId: string,
        contactId: string
    ): Observable<HttpResponse> {
        const requestBody: RenewContactPolicyDataSend = { contactId };
        return this._policyService.reissueContactPolicy(
            originContactId,
            originPolicyId,
            requestBody
        );
    }
}
