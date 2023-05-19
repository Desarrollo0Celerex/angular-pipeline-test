import { Injectable } from '@angular/core';

import { Partner } from '@interfaces/partner.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PartnerService } from '@services/partner.service';

@Injectable()
export class CardPartnerWalletGlobalService {
    partner: Partner | null = null;

    constructor(private _partnerService: PartnerService) {}

    loadPartner(partnerId: number): void {
        const fields: string =
            'totalGlobalCurrentWallet,totalActivePolicies,totalExpiredPolicies,totalCancelledPolicies,currencyName';
        this._partnerService
            .getPartner(partnerId, fields)
            .subscribe((res: HttpResponse) => {
                this.partner = res.data;
            });
    }
}
