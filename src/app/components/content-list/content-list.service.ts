import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { POLICY_STATUS, POLICY_STATUS_ACTIVE, SINISTER_STATUS, SINISTER_STATUS_OPEN } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContentResultData } from '@interfaces/content-result-data.interface';
import { Policy } from '@interfaces/policy.interface';
import { RenewContactPolicyDataSend } from '@interfaces/renew-contact-policy-data-send.interface';
import { ReceiptPaid } from '@interfaces/receipt-paid.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterLog } from '@interfaces/sinister-log.interface';
import { ClientService } from '@services/client.service';
import { ContactService } from '@services/contact.service';
import { ContactFileService } from '@services/contact-file.service';
import { LeadService } from '@services/lead.service';
import { PaymentService } from '@services/payment.service';
import { PolicyService } from '@services/policy.service';
import { QuotationService } from '@services/quotation.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ContentListService {
    contents: any[];
    contentResultData: ContentResultData;

    constructor(
        private _clientService: ClientService,
        private _contactService: ContactService,
        private _contactFileService: ContactFileService,
        private _leadService: LeadService,
        private _paymentService: PaymentService,
        private _policyService: PolicyService,
        private _quotationService: QuotationService,
        private _receiptPaidService: ReceiptPaidService,
        private _sinisterService: SinisterService
    ) {
        this.contents = this._initContents();
        this.contentResultData = this._initContentResultData();
    }

    /**
     * Delete the receipt paid
     * @param paymentId     The payment ID
     * @param receiptPaidId The receipt paid ID to delete
     */
    deleteReceiptPaid(paymentId: string, receiptPaidId: string): Observable<void> {
        return this._receiptPaidService.deleteReceiptPaid(paymentId,receiptPaidId);
    }

    /**
     * Load the clients
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadClients(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        return this._clientService.getClients(page, fields, contentSubtype).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the contact files
     * @param  contactId      The contact ID
     * @param  page           The page number
     * @return                The contact quotations
     */
    loadContactFiles(contactId: string, page: number): Observable<void> {
        const fields: string = 'contactFileId,fileName,fileExtension,fileSize,fileUrl,createdAt,updatedAt,contactFileTypeName,createdByName,contactId';
        return this._contactFileService.getContactFiles(contactId, page, fields).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the history policy of contact
     * @param  contactId      The contact ID
     * @param  policyId       The policy ID
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadContactHistoryPolicy(contactId: string, policyId: string, page: number): Observable<void> {
        const fields: string = 'createdAt,sourceId,policyRecordTypeId,policyRecordTypeName,policyRecordTypeDescription,policyRecordTypeBackground,policyRecordTypeIcon,createdByName,endorsementTypeName,endorsementNumber,insurerName,policyNumber,policyCancellationReasonName,sourceContactId,sinisterTypeName,sinisterNumber,contactId,policyId,titularName,invoice,certificate,sinisterDate,dateLastEvent,totalEvents,endorsementComments,cancellationEvidenceUrl';
        return this._policyService.getContactHistoryPolicy(contactId, policyId, page, fields).pipe(
            tap((res: HttpResponse) => {
                const policies: Policy[] = res.data.items;
                this.contents = this.contents.concat(policies);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
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
        return this._quotationService.getContactQuotations(contactId, page, fields, contentSubtype).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the contact policies
     * @param  contactId      The contact ID
     * @param  page           The page number
     * @param  contentSubtype The content subtype
     * @return                Notice of action done
     */
    loadContactPolicies(contactId: string, page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,contactId,paymentId,policyCancellationReasonId';
        const filters: number [] = (contentSubtype === POLICY_STATUS_ACTIVE) ? [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED] : [contentSubtype];
        return this._policyService.getContactPolicies(contactId, page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                const policies: Policy[] = res.data.items;
                this.contents = this.contents.concat(policies);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Load the contact sinisters
     * @param  contactId      The contact ID
     * @param  page           The page number
     * @param  contentSubtype The content subtype
     * @return                Notice of action done
     */
    loadContactSinisters(contactId: string, page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId';
        const filters: number [] = (contentSubtype === SINISTER_STATUS_OPEN) ? [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE] : [contentSubtype];
        return this._sinisterService.getContactSinisters(contactId, page, fields, filters).pipe(
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
        return this._leadService.getLeads(page, fields, contentSubtype).pipe(
            tap((res: HttpResponse) => {
                    this.contents = this.contents.concat(res.data.items);
                    this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the payments
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadPayments(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId';
        return this._paymentService.getPayments(page, fields, contentSubtype).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the payment history
     * @param  paymentId      The payment ID
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadPaymentHistory(paymentId: string, page: number): Observable<void> {
        const fields: string = 'receiptPaidId,createdAt,applicationDate,receiptsAmount,receiptsNumber,createdByName,currencyName,paymentId';
        return this._receiptPaidService.getReceiptsPaid(paymentId, page, fields).pipe(
            tap((res: HttpResponse) => {
                const receiptsPaid: ReceiptPaid[] = res.data.items;
                this.contents = this.contents.concat(receiptsPaid);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Load the policy sinister
     * @param  sinisterId     The sinister ID
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadPolicySinisters(contactId: string, policyId: string, page: number): Observable<void> {
        const fields: string = 'sinisterId,createdByName,sinisterNumber,sinisterTypeName,sinisterDate,titularName,policyNumber,invoice,certificate,dateLastEvent,totalEvents,createdAt,createdByName,policyId,contactId';
        return this._policyService.getPolicySinisters(contactId, policyId, page, fields).pipe(
            tap((res: HttpResponse) => {
                const sinisters: Sinister[] = res.data.items;
                this.contents = this.contents.concat(sinisters);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Load the sinisters
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadSinisters(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId';
        return this._sinisterService.getSinisters(page, fields, contentSubtype).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the sinister logs
     * @param  sinisterId     The sinister ID
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadSinisterLogs(contactId: string, policyId: string, sinisterId: string, page: number): Observable<void> {
        const fields: string = 'sinisterLogId,sinisterRecordTypeId,sinisterRecordTypeName,eventDate,details,sinisterResolutionName,indemnificationAmount,resolutionDate,sinisterReactivationName,reactivationDate,createdAt,createdByName,contactId,policyId,sinisterId,logSourceId,finishedEvidenceUrl,reactivatedEvidenceUrl';
        return this._sinisterService.getSinisterLogs(contactId, policyId, sinisterId, page, fields).pipe(
            tap((res: HttpResponse) => {
                const sinisterLogs: SinisterLog[] = res.data.items;
                this.contents = this.contents.concat(sinisterLogs);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Reset the contents
     */
    resetData(): void {
        this.contents = this._initContents();
        this.contentResultData = this._initContentResultData();
    }

    /**
     * Reissue the policy
     * @param  originContactId The origin contact ID
     * @param  originPolicyId  The origin policy ID
     * @param  contactId       The contact ID
     * @return                 The reissued policy ID
     */
    reissuePolicy(originContactId: string, originPolicyId: string, contactId: string): Observable<HttpResponse> {
        const requestBody: RenewContactPolicyDataSend = { contactId }
        return this._policyService.reissueContactPolicy(originContactId, originPolicyId, requestBody);
    }

    /**
     * Renew the policy
     * @param  originContactId The origin contact ID
     * @param  originPolicyId  The origin policy ID
     * @param  contactId       The contact ID
     * @return                 The renewed policy ID
     */
    renewPolicy(originContactId: string, originPolicyId: string, contactId: string): Observable<HttpResponse> {
        const requestBody: RenewContactPolicyDataSend = { contactId }
        return this._policyService.renewContactPolicy(originContactId, originPolicyId, requestBody);
    }

    /**
     * Search the clients
     * @param  page  The page number to get
     * @param  query The query to search
     * @return       Notice of action done
     */
    searchClients(page: number, query: string): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        return this._clientService.getClients(page, fields, 0, query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Search the contacts
     * @param  page  The page number to get
     * @param  query The query to search
     * @return       Notice of action done
     */
    searchContacts(page: number, query: string, specialQuery: SearchContactData | null): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,clientStatusName,clientStatusBackground,contactSourceName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        return this._contactService.getContacts(page, fields, query, specialQuery).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Search the contact files
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  query     The query to search
     * @return           Notice of action done
     */
    searchContactFiles(contactId: string, page: number, query: string): Observable<void> {
        const fields: string = 'contactFileId,fileName,fileExtension,fileSize,fileUrl,createdAt,updatedAt,contactFileTypeName,createdByName,contactId';
        return this._contactFileService.getContactFiles(contactId, page, fields, query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Search the contact policies
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  query     The query to search
     * @return           Notice of action done
     */
    searchContactPolicies(contactId: string, page: number, query: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime';
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
     * Search the contact sinisters
     * @param  contactId The contact ID
     * @param  page      The page to get
     * @param  query     The query to search
     * @return           Notice of action done
     */
    searchContactSinisters(contactId: string, page: number, query: string): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId';
        return this._sinisterService.getContactSinisters(contactId, page, fields, [], query).pipe(
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
     * Search the payments
     * @param  page  The page number to get
     * @param  query The query to search
     * @return       Notice of action done
     */
    searchPayments(page: number, query: string): Observable<void> {
        const fields: string = 'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId';
        return this._paymentService.getPayments(page, fields, 0, query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Search the sinisters
     * @param  page  The page number to get
     * @param  query The query to search
     * @return       Notice of action done
     */
    searchSinisters(page: number, query: string): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId';
        return this._sinisterService.getSinisters(page, fields, 0, query).pipe(
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
