import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Partner } from '@interfaces/partner.interface';
import { PartnerService } from '@services/partner.service';

@Injectable()
export class PartnerProfileService {
    partner: Partner | null = null;

    constructor(private _partnerService: PartnerService) { }

    loadPartner(partnerId: number): void {
        const fields: string = 'name,totalClients,totalPolicies';
        this._partnerService.getPartner(partnerId, fields).subscribe((res: HttpResponse) => {
            this.partner = res.data;
        })
    }
}
