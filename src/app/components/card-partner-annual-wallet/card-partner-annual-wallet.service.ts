import { Injectable } from '@angular/core';

import { PartnerService } from '@services/partner.service';

@Injectable()
export class CardPartnerAnnualWalletService {

    constructor(private _partnerService: PartnerService) { }

    loadPartnerAnnualWallet(partnerId: number, year: number): void {
        //this._partnerService
    }
}
