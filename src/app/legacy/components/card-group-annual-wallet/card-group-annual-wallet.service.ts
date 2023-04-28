import { Injectable } from '@angular/core';

import { AnnualWallet } from '@interfaces/annual-wallet.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { GroupService } from '@services/group.service';

@Injectable()
export class CardGroupAnnualWalletService {
    annualWallet: AnnualWallet | null = null;
    loadedContent: boolean = false;

    constructor(private _groupService: GroupService) {}

    loadGroupAnnualWallet(groupId: string, year: number): void {
        const fields: string =
            'issuedAnnualWallet,totalIssuedAnnualNewPolicies,totalIssuedAnnualRenewedPolicies,currencyName';
        this._groupService
            .getGroupAnnualWallet(groupId, year, fields)
            .subscribe((res: HttpResponse) => {
                this.annualWallet = res.data;
                this.loadedContent = true;
            });
    }
}
