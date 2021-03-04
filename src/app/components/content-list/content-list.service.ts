import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { POLICY_STATUS, POLICY_STATUS_ACTIVE } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContentResultData } from '@interfaces/content-result-data.interface';
import { LeadService } from '@services/lead.service';
import { PolicyService } from '@services/policy.service';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ContentListService {
    contents: any[];
    contentResultData: ContentResultData;

    constructor(
        private _leadService: LeadService,
        private _policyService: PolicyService,
        private _quotationService: QuotationService
    ) {
        this.contents = this._initContents();
        this.contentResultData = this._initContentResultData();
    }

    /**
     * Reset the contents
     */
    resetData(): void {
        this.contents = this._initContents();
        this.contentResultData = this._initContentResultData();
    }

    /**
     * Load the contact quotations
     * @param  contactId      The contact ID
     * @param  page           The page number
     * @param  contentSubtype The filter to apply
     * @return                The contact quotations
     */
    loadContactQuotations(contactId: string, page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'quotationId,description,createdAt,insuranceName,insuranceIcon,insuranceBackground,quotationStatusId,quotationStatusName,quotationStatusBackground,insuranceTypeName';
        return new Observable( observer => {
            this._quotationService.getContactQuotations(contactId, page, fields, contentSubtype).subscribe( (res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
                observer.next();
                observer.complete();
            })
        })
    }

    /**
     * Load the contact policies
     * @param  contactId      The contact IID
     * @param  page           The page number
     * @param  contentSubtype The content subtype
     * @return                Notice of action done
     */
    loadContactPolicies(contactId: string, page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,amount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty';
        const filters: number [] = (contentSubtype === POLICY_STATUS_ACTIVE) ? [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED] : [contentSubtype];
        return this._policyService.getContactPolicies(contactId, page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Load the leads
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadLeads(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,contactSourceName,contactScoreName';
        return new Observable( observer => {
            this._leadService.getLeads(page, fields, contentSubtype).subscribe( (res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
                observer.next();
                observer.complete();
            })
        })
    }

    /**
     * Search the contact policies
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  query     The query to search
     * @return           Notice of action done
     */
    searchContactPolicies(contactId: string, page: number, query: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,amount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty';
        return this._policyService.getContactPolicies(contactId, page, fields, [], query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Search the contact quotations
     * @param  page  The page number to get
     * @param  query The query to search
     * @return       Notice of action done
     */
    searchContactQuotations(contactId: string, page: number, query: string): Observable<void> {
        const fields: string = 'quotationId,description,createdAt,insuranceName,insuranceIcon,insuranceBackground,quotationStatusId,quotationStatusName,quotationStatusBackground,insuranceTypeName';
        return this._quotationService.getContactQuotations(contactId, page, fields, 0, query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Search the leads
     * @param  page  The page number to get
     * @param  query The query to search
     * @return       Notice of action done
     */
    searchLeads(page: number, query: string): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,contactSourceName,contactScoreName';
        return this._leadService.getLeads(page, fields, 0, query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Initialize the contents
     * @return The contents
     */
    private _initContents(): [] {
        return [];
    }

    /**
     * Initialize the content result data
     * @return The content result data
     */
    private _initContentResultData(): ContentResultData {
        return {
            loadedItems: 0,
            totalItems: 0
        }
    }

    /**
     * Load the content result data
     * @param totalItems   The total items
     */
    private _loadContentResultData(totalItems: number): void {
        this.contentResultData = {
            loadedItems: this.contents.length,
            totalItems
        }
    }

}
