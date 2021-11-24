import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { CLIENT_STATUS, LEAD_STATUS, PARTNER_STATUS, POLICY_RECORD_TYPES, POLICY_STATUS, POLICY_STATUS_ACTIVE, SINISTER_STATUS, SINISTER_STATUS_OPEN, DEFAULT_PER_PAGE } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContentResultData } from '@interfaces/content-result-data.interface';
import { Payment } from '@interfaces/payment.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyLog } from '@interfaces/policy-log.interface';
import { RenewContactPolicyDataSend } from '@interfaces/renew-contact-policy-data-send.interface';
import { ReceiptPaid } from '@interfaces/receipt-paid.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterLog } from '@interfaces/sinister-log.interface';

import { ClientService } from '@services/client.service';
import { ContactService } from '@services/contact.service';
import { ContactFileService } from '@services/contact-file.service';
import { EndorsementService } from '@services/endorsement.service';
import { GroupService } from '@services/group.service';
import { GroupMemberService } from '@services/group-member.service';
import { LeadService } from '@services/lead.service';
import { PartnerService } from '@services/partner.service';
import { PaymentService } from '@services/payment.service';
import { PolicyService } from '@services/policy.service';
import { PolicyLogService } from '@services/policy-log.service';
import { QuotationService } from '@services/quotation.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class ContentListService {
    contents: any[];
    contentResultData: ContentResultData;
    nextPaymentDate: string = '';

    constructor(
        private _clientService: ClientService,
        private _contactService: ContactService,
        private _contactFileService: ContactFileService,
        private _endorsementService: EndorsementService,
        private _groupService: GroupService,
        private _groupMemberService: GroupMemberService,
        private _leadService: LeadService,
        private _partnerService: PartnerService,
        private _paymentService: PaymentService,
        private _policyService: PolicyService,
        private _policyLogService: PolicyLogService,
        private _quotationService: QuotationService,
        private _receiptPaidService: ReceiptPaidService,
        private _sinisterService: SinisterService
    ) {
        this.contents = this._initContents();
        this.contentResultData = this._initContentResultData();
    }

    deleteGroupMember(groupId: string, contactId: string): Observable<void> {
        return this._groupMemberService.deleteGroupMember(groupId, contactId);
    }

    deleteGroupMemberCard(contactId: string): void {
        const contactPosition: number = this._getContactPosition(contactId);
        if(contactPosition > -1) {
            this.contents.splice(contactPosition, 1);
        }
    }

    deleteRenewedPolicy(contactId: string, policyId: string): Observable<void> {
        return this._policyService.deleteActivePolicy(contactId, policyId);
    }

    /**
     * Delete the policy card
     * @param policyId The policy ID to delete
     */
    deletePolicyCard(policyId: string): void {
        const policyPosition: number = this._getPolicyPosition(policyId);
        if(policyPosition > -1) {
            this.contents.splice(policyPosition, 1);
        }
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
     * Get the content position
     * @param  contentId The content ID to search
     * @return           The content position found
     */
    getContentPosition(contentId: string, fieldName: string): number {
        return this.contents.findIndex((value: any) => value[fieldName] == contentId)
    }

    getPolicyLogs(contactId: string, policyId: string): Observable<PolicyLog[]> {
        const fields: string = 'sourceId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyRecordTypeId', [POLICY_RECORD_TYPES.RENEWED]);
        return this._policyLogService.getPolicyLogs(contactId, policyId, fields, filters);
    }

    /**
     * Load the clients
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadClients(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [contentSubtype]);
        return this._clientService.getClients(page, fields, filters).pipe(
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
     * Load the groups
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadGroups(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'groupId,name,groupStatusName,groupStatusBackground,totalMembers,totalGlobalWallet,totalGlobalWalletPaid,currencyName,totalActivePolicies,createdAt';
        const filters: string = UtilitiesHelper.generateHttpFilter('groupStatusId', [contentSubtype])
        return this._groupService.getGroups(page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                    this.contents = this.contents.concat(res.data.items);
                    this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the groups
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadGroupMembers(groupId: string, page: number): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        return this._groupMemberService.getGroupMembers(groupId, fields, page).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the group policies
     * @param  groupId      The group ID
     * @param  page           The page number
     * @param  contentSubtype The content subtype
     * @return                Notice of action done
     */
    loadGroupPolicies(groupId: string, page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,groupId,paymentId,policyCancellationReasonId,contactId';
        const filters: number [] = (contentSubtype === POLICY_STATUS_ACTIVE) ? [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED] : [contentSubtype];
        return this._policyService.getGroupPolicies(groupId, page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                const policies: Policy[] = res.data.items;
                this.contents = this.contents.concat(policies);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Load the group policies
     * @param  groupId      The group ID
     * @param  page           The page number
     * @param  contentSubtype The content subtype
     * @return                Notice of action done
     */
    loadGroupSinisters(groupId: string, page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId';
        const filters: number [] = (contentSubtype === SINISTER_STATUS_OPEN) ? [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE] : [contentSubtype];
        return this._sinisterService.getGroupSinisters(groupId, page, fields, filters).pipe(
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
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName';
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [contentSubtype])
        return this._leadService.getLeads(page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                    this.contents = this.contents.concat(res.data.items);
                    this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the leads
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadPartners(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'partnerId,name,createdAt,partnerStatusName,partnerStatusBackground,totalClients,totalPolicies,wallet,walletPaid,currencyName';
        const filters: string = UtilitiesHelper.generateHttpFilter('partnerStatusId', [contentSubtype])
        return this._partnerService.getPartners(page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                    this.contents = this.contents.concat(res.data.items);
                    this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the partners
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadPartnerClients(partnerId: string, page: number): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        return this._partnerService.getPartnerClients(partnerId, fields, page).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the partner policies
     * @param  partnerId      The partner ID
     * @param  page           The page number
     * @param  contentSubtype The content subtype
     * @return                Notice of action done
     */
    loadPartnerPolicies(partnerId: string, page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,partnerId,paymentId,policyCancellationReasonId,contactId';
        const filters: number [] = (contentSubtype === POLICY_STATUS_ACTIVE) ? [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED] : [contentSubtype];
        return this._policyService.getPartnerPolicies(partnerId, page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                const policies: Policy[] = res.data.items;
                this.contents = this.contents.concat(policies);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Load the payments
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadPayments(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId';
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [contentSubtype]);
        return this._paymentService.getPayments(page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the policies
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadPoliciesToRenew(page: number, rangeField: string, rangeStart: string, rangeEnd: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,contactId,paymentId,policyCancellationReasonId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const sortBy: string = 'validityEndDate';
        return this._policyService.getPoliciesToRenew(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the policies
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadLastCancelledPolicies(page: number, rangeField: string, rangeStart: string, rangeEnd: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,contactId,paymentId,policyCancellationReasonId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CANCELLED])
        const sortBy: string = '-updatedAt';
        return this._policyService.getPolicies(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd).pipe(
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
    loadCalendarPayments(page: number, specialFilter: number | string): Observable<void> {
        const fields: string = 'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId';
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentDate', [specialFilter]);
        return this._paymentService.getPayments(page, fields, filters).pipe(
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
     * Load the pending recceipts
     * @param  paymentId      The payment ID
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadPendingReceipts(paymentId: string, page: number): Observable<void> {
        const fields: string = 'pendingReceipts,paymentPlanMonths,paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId';
        const perPage: number = DEFAULT_PER_PAGE;
        return this._paymentService.getPayment(paymentId, fields).pipe(
            tap((res: HttpResponse) => {
                const payment: Payment = res.data;
                if(page === 1) this.nextPaymentDate = payment.paymentDate;
                let items: number = 0;
                const start: number = payment.tickets + ((page - 1) * DEFAULT_PER_PAGE);
                for(let i = start; i<payment.bills; i++) {
                    items++;
                    const paymentAux: Payment = {...payment};
                    paymentAux.tickets = i;
                    paymentAux.paymentDate = this.nextPaymentDate;
                    this.contents.push(paymentAux);
                    this.nextPaymentDate = moment(this.nextPaymentDate).add(payment.paymentPlanMonths, 'months').format('YYYY-MM-DD');
                    if(items === perPage) {
                        break;
                    }
                }
                this._loadContentResultData(res.data.pendingReceipts);
            }),
            map( () => { })
        )
    }

    /**
     * Load the history policy of contact
     * @param  contactId      The contact ID
     * @param  policyId       The policy ID
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadPolicyEndorsements(contactId: string, policyId: string, page: number): Observable<void> {
        const fields: string = 'createdAt,sourceId,policyRecordTypeId,policyRecordTypeName,policyRecordTypeDescription,policyRecordTypeBackground,policyRecordTypeIcon,createdByName,endorsementTypeName,endorsementNumber,contactId,policyId,titularName,endorsementComments';
        return this._endorsementService.getPolicyEndorsements(contactId, policyId, page, fields).pipe(
            tap((res: HttpResponse) => {
                const policies: Policy[] = res.data.items;
                this.contents = this.contents.concat(policies);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Load the policy tracker
     * @param  contactId      The contact ID
     * @param  policyId       The policy ID
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadPolicyTracker(contactId: string, policyId: string, page: number): Observable<void> {
        const fields: string = 'policyId,insurerImageUrl,currencyName,policyAmount,policyNumber,validityStartDate,validityEndDate,policyStatusBackground,policyStatusName,policyStatusDescription';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED, POLICY_STATUS.CANCELLED]);
        return this._policyService.getPolicyTracker(contactId, policyId, page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                const policies: Policy[] = res.data.items;
                this.contents = this.contents.concat(policies);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    getPolicyTrackerPos(policyId: string): number {
        let policyPosition: number = this._getPolicyPosition(policyId);
        if(policyPosition < 0) {
            policyPosition = this.contentResultData.totalItems;
        }
        return policyPosition;
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
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL, CLIENT_STATUS.LOST])
        return this._clientService.getClients(page, fields, filters, query).pipe(
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
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
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
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,contactId';
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
     * Search groups
     * @param  page      The page number to get
     * @param  query     The query to apply
     * @return           Notice of action done
     */
    searchGroups(page: number, query: string): Observable<void> {
        const fields: string = 'groupId,name,groupStatusName,groupStatusBackground,totalMembers,totalGlobalWallet,totalGlobalWalletPaid,currencyName,totalActivePolicies,createdAt';
        return this._groupService.getGroups(page, fields, '', query).pipe(
            tap((res: HttpResponse) => {
                    this.contents = this.contents.concat(res.data.items);
                    this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Search the group policies
     * @param  groupId The group ID
     * @param  page      The page to get
     * @param  query     The query to search
     * @return           Notice of action done
     */
    searchGroupPolicies(groupId: string, page: number, query: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,contactId';
        return this._policyService.getGroupPolicies(groupId, page, fields, [], query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Search the group policies
     * @param  groupId The group ID
     * @param  page      The page to get
     * @param  query     The query to search
     * @return           Notice of action done
     */
    searchGroupSinisters(groupId: string, page: number, query: string): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId';
        return this._sinisterService.getGroupSinisters(groupId, page, fields, [], query).pipe(
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
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED, LEAD_STATUS.DISCARDED])
        return this._leadService.getLeads(page, fields, filters, query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Search the partners
     * @param  page  The page number to get
     * @param  query The query to search
     * @return       Notice of action done
     */
    searchPartners(page: number, query: string): Observable<void> {
        const fields: string = 'partnerId,name,createdAt,partnerStatusName,partnerStatusBackground,totalClients,totalPolicies,wallet,walletPaid,currencyName';
        const filters: string = UtilitiesHelper.generateHttpFilter('partnerStatusId', [PARTNER_STATUS.OCCASIONAL, PARTNER_STATUS.FREQUENT, PARTNER_STATUS.INFLUENTIAL, PARTNER_STATUS.INACTIVE])
        return this._partnerService.getPartners(page, fields, filters, query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }


    /**
     * Search the partner policies
     * @param  partnerId The partner ID
     * @param  page      The page to get
     * @param  query     The query to search
     * @return           Notice of action done
     */
    searchPartnerPolicies(partnerId: string, page: number, query: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,partnerId,paymentId,policyCancellationReasonId,contactId';
        return this._policyService.getPartnerPolicies(partnerId, page, fields, [], query).pipe(
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
        query = 'policyNumber:' + query;
        return this._paymentService.getPayments(page, fields, '', query).pipe(
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

    private _getContactPosition(contactId: string): number {
        return this.contents.findIndex((value: Contact) => value.contactId == contactId)
    }

    /**
     * Get the policy position
     * @param  policyId The policy ID to search
     * @return          The policy position found
     */
    private _getPolicyPosition(policyId: string): number {
        return this.contents.findIndex((value: Policy) => value.policyId == policyId)
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
