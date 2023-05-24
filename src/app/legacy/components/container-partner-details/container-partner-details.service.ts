import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PartnerService } from '@services/partner.service';
import { Partner } from '@interfaces/partner.interface';

@Injectable()
export class ContainerPartnerDetailsService {
    partner: Partner | null = null;
    policyNumber: string = '';

    constructor(private _partnerService: PartnerService) {}

    loadPartner(partnerId: string): void {
        const fields: string = 'name,partnerStatusName,partnerStatusBackground';
        this._partnerService
            .getPartner(parseInt(partnerId), fields)
            .subscribe((res: HttpResponse) => {
                this.partner = res.data;
            });
    }
}
