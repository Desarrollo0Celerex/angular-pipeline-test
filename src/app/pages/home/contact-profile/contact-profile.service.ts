import { Injectable } from '@angular/core';

import { CONTACT_PROFILE_PAGE_TYPES } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

import { Contact } from '@interfaces/contact.interface';

@Injectable()
export class ContactProfileService {
    contact: Contact | null = null;

    constructor(private _contactService: ContactService) { }

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
        const fields: string = 'contactId,avatarUrl,contactName,contactSourceName,phoneCode,phoneNumber,totalWallet,currencyName,totalPolicies,contactScoreName';
        this._contactService.getContact(contactId, fields).subscribe( (res: HttpResponse) => {
            this.contact = res.data;
        });
    }
}
