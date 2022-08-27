import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { CONTACT_PROFILE_PAGE_TYPES } from '@constants/global';
import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';
import { PolicyInsuredService } from '@services/policy-insured.service';

@Injectable()
export class ContactProfileService {
    contact: Contact | null = null;

    constructor(
        private _contactService: ContactService,
        private _policyInsuredService: PolicyInsuredService
    ) { }

    deleteContact(contactId: string): Observable<void> {
        return this._contactService.deleteContact(contactId);
    }

    downloadReportFlotillas(contactId: string, formatType: number): Promise<void> {
        return new Promise((resolve) => {
            this._policyInsuredService.downloadReportFlotillas(contactId, formatType).then((response: any) => {
              const filename = response.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].split('"')[1].trim();
              const blob = new Blob([response.body], {type: response.type.toString()});
                  saveAs(blob, filename);
                  resolve();
            });
        });
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
