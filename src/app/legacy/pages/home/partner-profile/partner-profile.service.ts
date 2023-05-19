import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Partner } from '@interfaces/partner.interface';
import { PartnerService } from '@services/partner.service';

@Injectable()
export class PartnerProfileService {
    partner: Partner | null = null;

    constructor(private _partnerService: PartnerService) {}

    loadPartner(partnerId: number): void {
        const fields: string =
            'partnerId,name,totalClients,totalPolicies,currencyName,wallet,walletPaid,totalSinisters,createdAt,createdByName';
        this._partnerService
            .getPartner(partnerId, fields)
            .subscribe((res: HttpResponse) => {
                this.partner = res.data;
            });
    }

    deletePartner(partnerId: number): Observable<void> {
        return this._partnerService.deletePartner(partnerId);
    }
}
