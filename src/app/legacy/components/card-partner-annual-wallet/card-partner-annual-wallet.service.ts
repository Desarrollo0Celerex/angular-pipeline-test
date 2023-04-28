import { Injectable } from '@angular/core';

import { PartnerService } from '@services/partner.service';
import { AnnualWallet } from '@interfaces/annual-wallet.interface';
import { HttpResponse } from '@interfaces/http-response.interface';

@Injectable()
export class CardPartnerAnnualWalletService {
    annualWallet: AnnualWallet | null = null;
    loadedContent: boolean = false;

    constructor(private _partnerService: PartnerService) { }

    loadPartnerAnnualWallet(partnerId: number, year: number): void {
        const fields: string = 'issuedAnnualWallet,totalIssuedAnnualNewPolicies,totalIssuedAnnualRenewedPolicies,currencyName';
        this._partnerService.getPartnerAnnualWallet(partnerId, year, fields).subscribe((res: HttpResponse) => {
            this.annualWallet = res.data;
            this.loadedContent = true;
        });
    }
}
