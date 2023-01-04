import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { CLIENT_STATUS, EXTERNAL_POLICY_STATUS, LEAD_STATUS, PARTNER_STATUS, 
    PAYMENT_STATUS, POLICY_RECORD_TYPES, POLICY_STATUS, POLICY_STATUS_ACTIVE, 
    SINISTER_STATUS, SINISTER_STATUS_OPEN, DEFAULT_PER_PAGE, SINISTER_RECORD_TYPES,
    POLICY_INSURED_STATUS 
} from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { SinisterEventHelper } from '@helpers/sinister-event.helper';
import { Contact } from '@interfaces/contact.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContentResultData } from '@interfaces/content-result-data.interface';
import { Insured } from '@interfaces/insured.interface';
import { Payment } from '@interfaces/payment.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyLog } from '@interfaces/policy-log.interface';
import { RenewContactPolicyDataSend } from '@interfaces/renew-contact-policy-data-send.interface';
import { ReceiptPaid } from '@interfaces/receipt-paid.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterLog } from '@interfaces/sinister-log.interface';
import { UpdatePolicyInsuredStatus } from '@interfaces/update-policy-insured-status.interface';

import { ClientService } from '@services/client.service';
import { ContactService } from '@services/contact.service';
import { ContactFileService } from '@services/contact-file.service';
import { EndorsementService } from '@services/endorsement.service';
import { ExternalPolicyService } from '@services/external-policy.service';
import { GroupService } from '@services/group.service';
import { GroupMemberService } from '@services/group-member.service';
import { LeadService } from '@services/lead.service';
import { PartnerService } from '@services/partner.service';
import { PaymentService } from '@services/payment.service';
import { PolicyService } from '@services/policy.service';
import { PolicyLogService } from '@services/policy-log.service';
import { PolicyInsuredService } from '@services/policy-insured.service';
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
        private _externalPolicyService: ExternalPolicyService,
        private _groupService: GroupService,
        private _groupMemberService: GroupMemberService,
        private _leadService: LeadService,
        private _partnerService: PartnerService,
        private _paymentService: PaymentService,
        private _policyService: PolicyService,
        private _policyLogService: PolicyLogService,
        private _policyInsuredService: PolicyInsuredService,
        private _quotationService: QuotationService,
        private _receiptPaidService: ReceiptPaidService,
        private _sinisterService: SinisterService
    ) {
        this.contents = this._initContents();
        this.contentResultData = this._initContentResultData();
    }

    cancelPolicyInsured(contactId: string, policyId: string, policyInsuredId: string): Observable<void> {
        const requestBody: UpdatePolicyInsuredStatus = {
            insuredStatusId: POLICY_INSURED_STATUS.CANCELLED
        }
        return this._policyInsuredService.updatePolicyInsuredStatus(contactId, policyId, policyInsuredId, requestBody);
    }

    deleteContact(contactId: string): Observable<void> {
        return this._contactService.deleteContact(contactId);
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

    deletePolicyInsured(contactId: string, policyId: string, policyInsuredId: string): Observable<void> {
        return this._policyInsuredService.deletePolicyInsured(contactId, policyId, policyInsuredId);
    }

    deletePolicyInsuredCard(policyInsuredId: string): void {
        const policyInsuredPosition: number = this._getPolicyInsuredPosition(policyInsuredId);
        if(policyInsuredPosition > -1) {
            this.contents.splice(policyInsuredPosition, 1);
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
     * Load the active policies by range
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadActivePoliciesByRange(page: number, rangeField: string, rangeStart: string, rangeEnd: string, specialFilter: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,contactId,paymentId,policyCancellationReasonId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.SUSPENDED]);
        const sortBy: string = 'validityStartDate';
        return this._policyService.getPolicies(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd, DEFAULT_PER_PAGE, specialFilter).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    loadReceiptsAppliedByRange(page: number, rangeField: string, rangeStart: string, rangeEnd: string, specialFilter: string): Observable<void> {
        const fields: string = 'receiptPaidId,contactId,policyId,paymentId,insurerImageUrl,paymentSourceTypeName,insuranceName,paymentPlanName,insuranceTypeName,insuranceBackground,insuranceIcon,policyNumber,receiptsAmount,applicationDate,paymentAmountPaid,coveredProperty,lifeTime';
        const filters: string = '';
        const sortBy: string = 'applicationDate';
        return this._receiptPaidService.getWorkspaceReceiptsPaid(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd, specialFilter).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    loadRenewedPoliciesByRange(page: number, rangeField: string, rangeStart: string, rangeEnd: string, specialFilter: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,contactId,paymentId,policyCancellationReasonId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const sortBy: string = 'validityEndDate';
        return this._policyService.getRenewedPolicies(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd, specialFilter).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the external policies
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadExternalPolicies(page: number, specialFilter: string): Observable<void> {
        const fields: string = 'externalPolicyId,isChecked,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyAmount,policyNumber,insurerImageUrl,insuranceName,insuranceIcon,insuranceBackground,paymentMethodName,insuranceTypeName,currencyName,externalPolicyStatusId,externalPolicyStatusName,externalPolicyStatusDescription,lifeTime,contactId,contactName,externalPolicyStatusBackground';
        const filters: string = UtilitiesHelper.generateHttpFilter('externalPolicyStatusId', [EXTERNAL_POLICY_STATUS.INCOMPLETE, EXTERNAL_POLICY_STATUS.CURRENT]);
        const sortBy: string = '-createdAt';
        return this._externalPolicyService.getWorkspaceExternalPolicies(fields, filters, page, 12, sortBy, '', '', '', specialFilter).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the active policies by range
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadIncompletePolicies(page: number, specialFilter: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusId,policyStatusName,policyStatusDescription,policyStatusBackground,policyAmount,policyNumber,paymentPlanName,contactId,contactName,insurerImageUrl,policyUrl';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.INCOMPLETE]);
        const sortBy: string = '-createdAt';
        return this._policyService.getPolicies(page, fields, filters, '', sortBy, '', '', '', DEFAULT_PER_PAGE, specialFilter).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
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
        const fields: string = 'createdAt,sourceId,policyRecordTypeId,policyRecordTypeName,policyRecordTypeDescription,policyRecordTypeBackground,policyRecordTypeIcon,createdByName,endorsementTypeShortName,endorsementNumber,insurerName,policyNumber,policyCancellationReasonName,sourceContactId,sinisterTypeName,sinisterNumber,contactId,policyId,titularName,invoice,certificate,sinisterDate,dateLastEvent,totalEvents,endorsementComments,cancellationEvidenceUrl,sinisterResolutionName,sinisterResolutionCurrencyName,sinisterResolutionIndemnificationAmount,sinisterStatusId,endorsementAmount,endorsementPaymentMethodName,endorsementTypeId';
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
        const fields: string = 'quotationId,description,createdAt,insuranceName,insuranceIcon,insuranceBackground,quotationStatusId,quotationStatusName,quotationStatusBackground,insuranceTypeName,contactId';
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
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,contactId,paymentId,policyCancellationReasonId';
        const filters: number [] = (contentSubtype === POLICY_STATUS_ACTIVE) ? [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.SUSPENDED] : [contentSubtype];
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
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
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
     * Load the contacts
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadContacts(page: number): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,leadStatusName,leadStatusBackground,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        return this._contactService.getContacts(page, fields).pipe(
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
        const fields: string = 'groupId,name,groupStatusName,groupStatusBackground,totalMembers,totalGlobalWallet,totalGlobalWalletPaid,currencyName,totalActivePolicies,createdAt,totalOpenSinisters,createdByName';
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
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,groupId,paymentId,policyCancellationReasonId,contactId';
        const filters: number [] = (contentSubtype === POLICY_STATUS_ACTIVE) ? [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.SUSPENDED] : [contentSubtype];
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
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
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
        const fields: string = 'partnerId,name,createdAt,partnerStatusName,partnerStatusBackground,totalClients,totalPolicies,wallet,walletPaid,currencyName,totalSinisters,createdByName';
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
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalPartnerWallet,totalActivePartnerPolicies,currencyName';
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
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,partnerId,paymentId,policyCancellationReasonId,contactId';
        const filters: number [] = (contentSubtype === POLICY_STATUS_ACTIVE) ? [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.SUSPENDED] : [contentSubtype];
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
     * Load the partner policies
     * @param  partnerId      The partner ID
     * @param  page           The page number
     * @param  contentSubtype The content subtype
     * @return                Notice of action done
     */
    loadPartnerSinisters(partnerId: string, page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
        const filters: number [] = (contentSubtype === SINISTER_STATUS_OPEN) ? [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE] : [contentSubtype];
        return this._sinisterService.getPartnerSinisters(partnerId, page, fields, filters).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
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
        const fields: string = 'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment';
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [contentSubtype]);
        const sortBy: string = 'paymentDate';
        return this._paymentService.getPayments(page, fields, filters, '', sortBy).pipe(
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
    loadPoliciesToRenew(page: number, rangeField: string, rangeStart: string, rangeEnd: string, specialFilter: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,contactId,paymentId,policyCancellationReasonId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        const sortBy: string = 'validityEndDate';
        return this._policyService.getPoliciesToRenew(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd, specialFilter).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    loadPolicyInsureds(contactId: string, policyId: string, page: number): Observable<void> {
        const fields: string = 'policyInsuredId,insurerImageUrl,insuredStatusBackground,insuredStatusName,insuredStatusId,insuranceName,insuranceTypeName,insuranceBackground,insuranceIcon,currencyName,totalAmount,coveredProperty,certificate,contactId,policyId,validityStartDate,validityEndDate,lifeTime,fatherPolicyUrl,policyUrl';
        return this._policyInsuredService.getPolicyInsureds(contactId, policyId, fields, page).pipe(
            tap((res: HttpResponse) => {
                const policyInsureds: Insured[] = res.data.items;
                this.contents = this.contents.concat(policyInsureds);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    /**
     * Load the pending payments
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadPendingPaymentsByRange(page: number, rangeField: string, rangeStart: string, rangeEnd: string, specialFilter: string): Observable<void> {
        const fields: string = 'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment';
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE, PAYMENT_STATUS.STANDBY]);
        const sortBy: string = 'paymentDate';
        return this._paymentService.getPayments(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd, specialFilter).pipe(
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
    loadCancelledPolicies(page: number, rangeField: string, rangeStart: string, rangeEnd: string, specialFilter: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,contactId,paymentId,policyCancellationReasonId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.CANCELLED])
        const sortBy: string = '-updatedAt';
        return this._policyService.getPolicies(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd, DEFAULT_PER_PAGE, specialFilter).pipe(
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
        const fields: string = 'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment';
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentDate', [specialFilter]);
        const sortBy: string = 'paymentDate';
        return this._paymentService.getPayments(page, fields, filters, '', sortBy).pipe(
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
        const fields: string = 'receiptPaidId,createdAt,applicationDate,receiptsAmount,receiptsNumber,createdByName,currencyName,paymentId,paymentEvidenceUrl';
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
        const fields: string = 'pendingReceipts,paymentPlanMonths,paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,validityStartDate';
        const perPage: number = DEFAULT_PER_PAGE;
        return this._paymentService.getPayment(paymentId, fields).pipe(
            tap((res: HttpResponse) => {
                const payment: Payment = res.data;
                if(page === 1) this.nextPaymentDate = payment.paymentDate;
                let items: number = 0;
                const start: number = payment.tickets + ((page - 1) * DEFAULT_PER_PAGE);
                const paymentDay: number = parseInt(moment(payment.validityStartDate).format('D'));
                for(let i = start; i<payment.bills; i++) {
                    items++;
                    const paymentAux: Payment = {...payment};
                    paymentAux.tickets = i;
                    paymentAux.paymentDate = this.nextPaymentDate;
                    this.contents.push(paymentAux);
                    this.nextPaymentDate = this._calculateNextPaymentDate(this.nextPaymentDate, payment.paymentPlanMonths, paymentDay);
                    if(items === perPage) {
                        break;
                    }
                }
                this._loadContentResultData(res.data.pendingReceipts);
            }),
            map( () => { })
        )
    }

    private _calculateNextPaymentDate(paymentDate: string, paymentPlanMonths: string, paymentDay: number): string {
        let nextPaymentDate: string = moment(paymentDate).add(paymentPlanMonths, 'months').format('YYYY-MM-DD');
        const nextPaymentDay: number = parseInt(moment(nextPaymentDate).format('D'));
        const daysInMonth: number = moment(nextPaymentDate).daysInMonth();
        if(nextPaymentDay < daysInMonth) {
            const leftDays: number = paymentDay - nextPaymentDay;
            nextPaymentDate = moment(nextPaymentDate).add(leftDays, 'days').format('YYYY-MM-DD');
        }
        return nextPaymentDate;
    }

    /**
     * Load the history policy of contact
     * @param  contactId      The contact ID
     * @param  policyId       The policy ID
     * @param  page           The page number
     * @return                Notice of action done
     */
    loadPolicyEndorsements(contactId: string, policyId: string, page: number): Observable<void> {
        const fields: string = 'createdAt,sourceId,policyRecordTypeId,policyRecordTypeName,policyRecordTypeDescription,policyRecordTypeBackground,policyRecordTypeIcon,createdByName,endorsementTypeShortName,endorsementNumber,contactId,policyId,titularName,endorsementComments';
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
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,groupId,paymentId,policyCancellationReasonId,contactId';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED, POLICY_STATUS.CANCELLED]);
        return this._policyService.getPolicyTracker(contactId, policyId, fields, filters, page).pipe(
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
        const fields: string = 'sinisterId,createdByName,sinisterNumber,sinisterTypeName,sinisterDate,titularName,policyNumber,invoice,certificate,dateLastEvent,totalEvents,createdAt,createdByName,policyId,contactId,sinisterStatusId,sinisterResolutionName,sinisterResolutionCurrencyName,sinisterResolutionIndemnificationAmount';
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
     * Load the quotations by range
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadQuotationsByRange(page: number, rangeField: string, rangeStart: string, rangeEnd: string): Observable<void> {
        const fields: string = 'quotationId,description,createdAt,insuranceName,insuranceIcon,insuranceBackground,quotationStatusId,quotationStatusName,quotationStatusBackground,insuranceTypeName,contactId';
        const sortBy: string = '-createdAt';
        return this._quotationService.getQuotations(page, fields, '', '', sortBy, rangeField, rangeStart, rangeEnd).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    /**
     * Load the sinisters
     * @param  page           The page number to get
     * @param  contentSubtype The filter to apply
     * @return                Notice of action done
     */
    loadSinisters(page: number, contentSubtype: number): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [contentSubtype])
        return this._sinisterService.getSinisters(page, fields, filters).pipe(
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
        const fields: string = 'sinisterLogId,sinisterRecordTypeId,sinisterRecordTypeName,providerDate,observations,sinisterResolutionName,indemnificationAmount,resolutionDate,sinisterReactivationName,reactivationDate,createdAt,createdByName,contactId,policyId,sinisterId,logSourceId,finishedEvidenceUrl,reactivatedEvidenceUrl,sinisterEventTypeName,sinisterEventFinishDate,sinisterEventFinishAmount,sinisterEventFinishFolio,sinisterEventTypeId,providerName,providerFolio,providerPhoneNumber,providerEmail,providerBill,sinisterEventEvidenceUrl,currencyName,paymentMethodName';
        const sortBy: string = '-createdAt';
        return this._sinisterService.getSinisterLogs(contactId, policyId, sinisterId, page, fields, sortBy).pipe(
            tap((res: HttpResponse) => {
                const sinisterLogs: SinisterLog[] = res.data.items;
                for(let sinisterLog of sinisterLogs) {
                    if(sinisterLog.sinisterRecordTypeId === SINISTER_RECORD_TYPES.NEW_EVENT) {
                        sinisterLog.sinisterEventDetails = SinisterEventHelper.generateSinisterEventDetails({...sinisterLog});
                    }
                }
                this.contents = this.contents.concat(sinisterLogs);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    loadInsuranceSinistersByRange(insuranceId: number, page: number, rangeField: string, rangeStart: string, rangeEnd: string, specialFilter: string): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE, SINISTER_STATUS.FINISHED]);
        const sortBy: string = 'sinisterDate';
        return this._sinisterService.getInsuranceSinisters(insuranceId, page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd, specialFilter).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    loadOpenedSinistersByRange(page: number, rangeField: string, rangeStart: string, rangeEnd: string, specialFilter: string): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE]);
        const sortBy: string = 'sinisterDate';
        return this._sinisterService.getSinisters(page, fields, filters, '', sortBy, rangeField, rangeStart, rangeEnd, specialFilter).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
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
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName,createdAt';
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
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,contactId,createdAt,paymentId,policyCancellationReasonId';
        query = 'multiple:'+query;
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
        const fields: string = 'quotationId,description,createdAt,insuranceName,insuranceIcon,insuranceBackground,quotationStatusId,quotationStatusName,quotationStatusBackground,insuranceTypeName,contactId';
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
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
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
        const fields: string = 'groupId,name,groupStatusName,groupStatusBackground,totalMembers,totalGlobalWallet,totalGlobalWalletPaid,currencyName,totalActivePolicies,createdAt,totalOpenSinisters,createdByName';
        return this._groupService.getGroups(page, fields, '', query).pipe(
            tap((res: HttpResponse) => {
                    this.contents = this.contents.concat(res.data.items);
                    this._loadContentResultData(res.data.totalItems);
            }),
            map(() => { })
        );
    }

    searchGroupMembers(groupId: string, page: number, query: string): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        return this._groupMemberService.getGroupMembers(groupId, fields, page, query).pipe(
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
    searchGroupPolicies(groupId: string, page: number, query: string): Observable<void> {
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,contactId';
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
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
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
        const fields: string = 'partnerId,name,createdAt,partnerStatusName,partnerStatusBackground,totalClients,totalPolicies,wallet,walletPaid,currencyName,totalSinisters,createdByName';
        const filters: string = UtilitiesHelper.generateHttpFilter('partnerStatusId', [PARTNER_STATUS.OCCASIONAL, PARTNER_STATUS.FREQUENT, PARTNER_STATUS.INFLUENTIAL, PARTNER_STATUS.INACTIVE])
        return this._partnerService.getPartners(page, fields, filters, query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }


    searchPartnerClients(partnerId: string, page: number, query: string): Observable<void> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactSourceTypeName,contactScoreName,totalGlobalPartnerWallet,totalActivePartnerPolicies,currencyName';
        return this._partnerService.getPartnerClients(partnerId, fields, page, query).pipe(
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
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,partnerId,paymentId,policyCancellationReasonId,contactId';
        return this._policyService.getPartnerPolicies(partnerId, page, fields, [], query).pipe(
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
    searchPartnerSinisters(partnerId: string, page: number, query: string): Observable<void> {
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
        return this._sinisterService.getPartnerSinisters(partnerId, page, fields, [], query).pipe(
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
        const fields: string = 'paymentId,contactId,insurerImageUrl,paymentSourceTypeName,paymentStatusName,paymentStatusBackground,paymentPlanName,currencyName,pendingAmount,insuranceBackground,insuranceIcon,coveredProperty,paymentAmount,paymentAmountPaid,lifeTime,insuranceName,policyNumber,policyId,contactId,insuranceTypeName,bills,tickets,paymentDate,paymentStatusId,isPreauthorizedPayment';
        query = 'multiple:' + query;
        const sortBy: string = 'paymentDate';
        return this._paymentService.getPayments(page, fields, '', query, sortBy).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    searchPolicyInsureds(contactId: string, policyId: string, page: number, query: string): Observable<void> {
        const fields: string = 'policyInsuredId,insurerImageUrl,insuredStatusBackground,insuredStatusName,insuredStatusId,insuranceName,insuranceTypeName,insuranceBackground,insuranceIcon,currencyName,totalAmount,coveredProperty,certificate,contactId,policyId,validityStartDate,validityEndDate,lifeTime,fatherPolicyUrl,policyUrl';
        query = 'certificate:'+query;
        const sortBy: string = 'insuredNumber';
        return this._policyInsuredService.getPolicyInsureds(contactId, policyId, fields, page, DEFAULT_PER_PAGE, sortBy, query).pipe(
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
        const fields: string = 'sinisterId,sinisterNumber,invoice,certificate,sinisterDate,insurerImageUrl,sinisterStatusName,sinisterStatusBackground,sinisterStatusDescription,insuranceName,insuranceIcon,insuranceBackground,paymentPlanName,insuranceTypeName,coveredProperty,policyNumber,validityStartDate,validityEndDate,lifeTime,sinisterTypeName,totalEvents,dateLastEvent,titularName,contactId,policyId,sinisterStatusId,sinisterResolutionName,sinisterResolutionIndemnificationAmount,sinisterResolutionCurrencyName';
        query = 'multiple:'+query;
        return this._sinisterService.getSinisters(page, fields, '', query).pipe(
            tap((res: HttpResponse) => {
                this.contents = this.contents.concat(res.data.items);
                this._loadContentResultData(res.data.totalItems);
            }),
            map( () => { })
        )
    }

    updateContentResultData(): void {
        this.contentResultData.loadedItems -= 1; 
        this.contentResultData.totalItems -= 1; 
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

    private _getPolicyInsuredPosition(policyInsuredId: string): number {
        return this.contents.findIndex((value: Insured) => value.policyInsuredId == policyInsuredId)
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
