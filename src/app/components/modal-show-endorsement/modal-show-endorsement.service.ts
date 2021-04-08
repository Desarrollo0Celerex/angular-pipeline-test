import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { EndorsementService } from '@services/endorsement.service';


@Injectable()
export class ModalShowEndorsementService {
    endorsementUrl: string;

    constructor(private _endorsementService: EndorsementService) {
        this.endorsementUrl = '';
    }

    /**
     * Load the endorsement Url
     * @param contactId The contact ID
     * @param policyId The policy ID
     * @param endorsementId  The endorsement ID
     */
    loadEndorsementUrl(contactId: string, policyId: string, endorsementId: string): void {
        const fields: string = 'endorsementUrl';
        this._endorsementService.getEndorsement(contactId, policyId, endorsementId, fields).subscribe( (res: HttpResponse) => {
            this.endorsementUrl = res.data.endorsementUrl;
        });
    }

    /**
     * Reset the endorsement url
     */
    resetEndorsementUrl(): void {
        this.endorsementUrl = '';
    }
}
