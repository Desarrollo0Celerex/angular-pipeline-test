import { Injectable } from '@angular/core';

import { AnnualWallet } from '@interfaces/annual-wallet.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class CardContactAnnualWalletService {
    annualWallet: AnnualWallet | null = null;
    loadedContent: boolean = false;

    constructor(private _contactService: ContactService) { }

    loadContactAnnualWallet(contactId: string, year: number): void {
        const fields: string = 'issuedAnnualWallet,totalIssuedAnnualNewPolicies,totalIssuedAnnualRenewedPolicies';
        this._contactService.getContactAnnualWallet(contactId, year, fields).subscribe((res: HttpResponse) => {
            this.annualWallet = res.data;
            this.loadedContent = true;
        });
    }
}
