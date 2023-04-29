import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CONTACT_SOURCE_TYPES } from '@constants/global';
import { AnnualWallet } from '@interfaces/annual-wallet.interface';
import { Contact } from '@core/interfaces/contact.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { SelectContactSourceData } from '@interfaces/select-contact-source-data.interface';

@Injectable()
export class CardContactAnnualWalletService {
    annualWallet: AnnualWallet | null = null;
    contact: Contact | null = null;
    loadedContent: boolean = false;

    constructor(private _contactService: ContactService) {}

    loadContact(contactId: string): void {
        const fields: string = 'contactSourceId,contactSourceTypeId,partnerId';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: Contact) => {
                res.contactSourceTypeId =
                    res.contactSourceId == CONTACT_SOURCE_TYPES.PARTNERS
                        ? res.partnerId
                        : res.contactSourceTypeId;
                this.contact = res;
            });
    }

    loadContactAnnualWallet(contactId: string, year: number): void {
        const fields: string =
            'issuedAnnualWallet,totalIssuedAnnualNewPolicies,totalIssuedAnnualRenewedPolicies,currencyName';
        this._contactService
            .getContactAnnualWallet(contactId, year, fields)
            .subscribe((res: AnnualWallet) => {
                this.annualWallet = res;
                this.loadedContent = true;
            });
    }

    updateContactSource(
        contactId: string,
        data: SelectContactSourceData
    ): Observable<void> {
        return this._contactService.updateContactSource(contactId, data);
    }
}
