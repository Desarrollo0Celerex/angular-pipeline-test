import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CONTACT_PROFILE_PAGE_TYPES } from '@constants/global';
import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class ContactProfileService {
    contact: Contact | null = null;

    constructor(
        private _contactService: ContactService
    ) { }

    deleteContact(contactId: string): Observable<void> {
        return this._contactService.deleteContact(contactId);
    }

    /**
     * Get the page type
     * @param  pageUrl The page url
     * @return         The page type
     */
    getPageType(pageUrl: string): number {
        let pageType: number;
            switch(true) {
                case pageUrl.includes(CONTACT_PROFILE_PAGE_TYPES.QUOTATIONS.ROUTE):
                    pageType = CONTACT_PROFILE_PAGE_TYPES.QUOTATIONS.ID;
                    break;

                case pageUrl.includes(CONTACT_PROFILE_PAGE_TYPES.POLICIES.ROUTE):
                    pageType = CONTACT_PROFILE_PAGE_TYPES.POLICIES.ID;
                    break;

                case pageUrl.includes(CONTACT_PROFILE_PAGE_TYPES.SINISTERS.ROUTE):
                    pageType = CONTACT_PROFILE_PAGE_TYPES.SINISTERS.ID;
                    break;

                default:
                    pageType = 0;
            }
        return pageType;
    }

    /**
     * Load the contact
     * @param contactId The contact ID
     */
    loadContact(contactId: string): void {
        const fields: string = 'contactId,avatarUrl,contactName,contactSourceName,contactSourceTypeName,phoneCode,phoneNumber,currencyName,totalActivePolicies,totalOpenSinisters,contactScoreName,totalGlobalWallet,totalGlobalWalletPaid,createdAt,createdByName,leadStatusId,clientStatusId';
        this._contactService.getContact(contactId, fields).subscribe( (res: HttpResponse) => {
            this.contact = res.data;
        });
    }
}
