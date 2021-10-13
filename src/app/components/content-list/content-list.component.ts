import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { ACTION_TYPES, CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { AlertHelper } from '@helpers/alert.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { DeleteReceiptPaidData } from '@interfaces/delete-receipt-paid-data.interface';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Partner } from '@interfaces/partner.interface';
import { Payment } from '@interfaces/payment.interface';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';
import { PolicyLog } from '@interfaces/policy-log.interface';
import { PolicyRecordData } from '@interfaces/policy-record-data.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { SelectActionTypeData } from '@interfaces/select-action-type-data.interface';
import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { UpdateReceiptPaidDataSend } from '@interfaces/update-receipt-paid-data-send.interface';

import { LoadingService } from '@services/loading.service';

import { ContentListService } from './content-list.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-content-list',
  templateUrl: './content-list.component.html',
  styles: [
  ]
})
export class ContentListComponent implements OnChanges, OnDestroy {
    @Input() actionType: number;
    @Input() contactId: string;
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Input() contentSubtypeName: string;
    @Input() originContactId: string;
    @Input() originPolicyId: string;
    @Input() paymentId: string;
    @Input() policyId: string;
    @Input() query: string;
    @Input() sinisterId: string;
    @Input() specialQuery: SearchContactData | null;
    @Input() canReloadContent: boolean = false;
    @Output() totalResultsLoaded: EventEmitter<number>;
    @Output() contentReloaded: EventEmitter<void> = new EventEmitter<void>();
    @Output() receiptPaid: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('containerIncompletePolicies') containerIncompletePolicies: any;
    CONTENT_TYPES: any;
    canReloadApplyPayment: boolean = false;
    canShowTotalResults: boolean;
    cardClasses: string;
    isHistoryContent: boolean;
    isLoadingContent: boolean;
    page: number;
    selectedActionType: number;
    selectedContactId: string;
    selectedContactFileData: ContactFileDataSend | null = null;
    selectedCancelledPolicyId: string = '';
    selectedEndorsementId: string;
    selectedEvidenceUrl: string = '';
    selectedPartner: Partner | null = null;
    selectedPaymentId: string;
    selectedPolicyData: PolicyDataSend | null = null;
    selectedPolicyId: string;
    selectedPolicyIdToDelete: string = '';
    selectedQuotationId: string;
    selectedReceiptPaidId: string;
    selectedSinister: Sinister | null = null;
    selectedSinisterData: SinisterDataSend | null = null;
    selectedSinisterEventData: SinisterEventDataSend | null = null;
    modalIdAcceptQuotation: string;
    modalIdApplyPayment: string;
    modalIdConfirmCancelPolicy: string;
    modalIdConfirmDeleteContactFile: string = 'agt-confirm-delete-contact-file';
    modalIdConfirmDeleteCompletePolicy: string = 'agt-confirm-delete-complete-policy';
    modalIdConfirmDeleteReceiptPaid: string;
    modalIdConfirmDeleteRenewedPolicy: string = 'agt-confirm-delete-renewed-policy';
    modalIdConfirmDeleteSinisterEvent: string = 'agt-confirm-delete-sinister-event';
    modalIdConfirmEndorsePolicy: string;
    modalIdConfirmFinalizeSinister: string;
    modalIdConfirmReissuePolicy: string;
    modalIdConfirmReactivateSinister: string;
    modalIdConfirmRenewPolicy: string;
    modalIdConfirmShowHistoryPolicy: string;
    modalIdConfirmShowPaymentHistory: string;
    modalIdConfirmShowSinister: string = 'agt-confirm-show-sinister';
    modalIdConfirmShowSinisterHistory: string;
    modalIdConfirmUpdateContactFile: string = 'agt-confirm-update-contact-file';
    modalIdConfirmUpdatePolicy: string;
    modalIdRejectQuotation: string;
    modalIdSelectContact: string;
    modalIdSelectContactType: string;
    modalIdShowCancellationEvidence: string = 'agt-show-cancellation-evidence';
    modalIdShowContactData: string;
    modalIdShowContactFileDetails: string = 'agt-show-contact-file-details';
    modalIdShowEndorsement: string;
    modalIdShowPolicy: string;
    modalIdShowPolicyDetails: string;
    modalIdConfirmShowPolicySinisters: string = 'agt-confirm-show-policy-sinisters';
    modalIdShowPartnerDetails: string = 'agt-show-partner-details';
    modalIdShowQuotationDetails: string;
    modalIdShowReactivationEvidence: string = 'agt-show-reactivation-evidence';
    modalIdShowResolutionEvidence: string = 'agt-show-resolution-evidence';
    modalIdShowSinisterDetails: string = 'agt-show-sinister-details';
    modalIdTransferContactFile: string = 'agt-transfer-contact-file';
    modalIdUpdateReceiptPaid: string = 'agt-update-receipt-paid';
    modalIdUpdateSinisterEvent: string = 'agt-update-sinister-event';
    totalResults: number;
    private subParams: any;

    constructor(
        public contentListService: ContentListService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.contactId = '';
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeName = '';
        this.query = '';
        this.sinisterId = '';
        this.specialQuery = null;
        this.totalResultsLoaded = new EventEmitter<number>();
        this.CONTENT_TYPES = CONTENT_TYPES;
        this.actionType = 0;
        this.canShowTotalResults = false;
        this.cardClasses = '';
        this.isHistoryContent = false;
        this.isLoadingContent = false;
        this.page = 1;
        this.selectedActionType = 0;
        this.selectedContactId = '';
        this.selectedEndorsementId = '';
        this.selectedPaymentId = '';
        this.selectedPolicyId = '';
        this.selectedQuotationId = '';
        this.selectedReceiptPaidId = '';
        this.modalIdAcceptQuotation = 'agt-accept-quotation';
        this.modalIdApplyPayment = 'agt-apply-payment';
        this.modalIdConfirmCancelPolicy = 'agt-confirm-cancel-policy';
        this.modalIdConfirmDeleteReceiptPaid = 'agt-confirm-delete-receipt-paid';
        this.modalIdConfirmEndorsePolicy = 'agt-confirm-endorse-policy';
        this.modalIdConfirmFinalizeSinister = 'agt-confirm-finalize-sinister';
        this.modalIdConfirmReissuePolicy = 'agt-confirm-reissue-policy';
        this.modalIdConfirmReactivateSinister = 'agt-confirm-reactivate-sinister';
        this.modalIdConfirmRenewPolicy = 'agt-confirm-renew-policy';
        this.modalIdConfirmShowHistoryPolicy = 'agt-confitm-show-history-policy';
        this.modalIdConfirmShowPaymentHistory = 'agt-confitm-show-payment-history';
        this.modalIdConfirmShowSinisterHistory = 'agt-confitm-show-sinister-history';
        this.modalIdConfirmUpdatePolicy = 'agt-confirm-update-policy';
        this.modalIdRejectQuotation = 'agt-reject-quotation';
        this.modalIdSelectContact = 'agt-select-contact';
        this.modalIdSelectContactType = 'agt-select-contact-type';
        this.modalIdShowContactData = 'agt-contact-data';
        this.modalIdShowEndorsement = 'agt-show-endorsement';
        this.modalIdShowPolicy = 'agt-show-policy';
        this.modalIdShowPolicyDetails = 'agt-show-policy-details';
        this.modalIdShowQuotationDetails = 'agt-show-quotation-details';
        this.originContactId = '';
        this.originPolicyId = '';
        this.paymentId = '';
        this.policyId = '';
        this.totalResults = 0;
    }

    /**
     * Check if the content is history content
     * @return True if it is, otherwise false;
     */
    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contentType !== 'undefined' && !!changes.contentType.currentValue) {
            this.isHistoryContent = UtilitiesHelper.checkIsHistoryContent(this.contentType);
            this._loadCardClasses();
        }

        if(
            (typeof changes.contentSubtype !== 'undefined' && !!changes.contentSubtype.currentValue) ||
            (typeof changes.query !== 'undefined' && !!changes.query.currentValue) ||
            (typeof changes.specialQuery !== 'undefined' && !!changes.specialQuery.currentValue) ||
            (typeof changes.contactId !== 'undefined' && !!changes.contactId.currentValue) && (typeof changes.policyId !== 'undefined' && !!changes.policyId.currentValue) && (!!this.contentSubtype || !!this.query || !!this.specialQuery) ||
            (typeof changes.canReloadContent !== 'undefined' && !!changes.canReloadContent.currentValue)
        ) {
            this._initContent();

            setTimeout(() => {
                this.contentReloaded.emit();
            }, 500);
        }
    }

    ngOnDestroy(): void {
        if(this.subParams) this.subParams.unsubscribe();
    }

    applyPayment(payment: Payment): void {
        this.selectedContactId = payment.contactId;
        this.selectedPolicyId = payment.policyId;
        this.selectedPaymentId = payment.paymentId;
        ModalPlugin.show(this.modalIdApplyPayment);
    }

    deleteRenewedPolicy(): void {
        this._loadingService.show();
        this.contentListService.deletePolicy(this.contactId, this.selectedPolicyIdToDelete).subscribe(() => {
            this._loadingService.hide();
            ModalPlugin.show(this.modalIdConfirmRenewPolicy);
            this.containerIncompletePolicies.deletePolicyCard(this.selectedPolicyIdToDelete);
            this.contentListService.deletePolicyCard(this.selectedPolicyIdToDelete);
        });
    }

    /**
     * Event to show modal to accept the quotation
     * @param quotationId The quotation ID to accept
     */
    onAcceptQuotation(quotationId: string): void {
        this.selectedQuotationId = quotationId;
        ModalPlugin.show(this.modalIdAcceptQuotation);
    }

    /**
     * Event to catch the selected event type
     * @param  data The data of the selected action type
     */
    onActionTypeSelected(data: SelectActionTypeData): void {
        this.selectedActionType = data.actionType;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdSelectContactType);
    }

    /**
     * Event to catch the request to apply payment
     * @param data The payment data
     */
    onApplyPayment(data: ShowPaymentHistoryData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        this.selectedPaymentId = data.paymentId;
        this.canReloadApplyPayment = true;
        ModalPlugin.show(this.modalIdApplyPayment);
    }

    /**
     * Event to cancel a policy
     * @param policyId The policy ID
     */
    onCancelPolicy(policyId: string| { policyId: string, contactId: string }): void {
        if(typeof policyId === 'string') {
            this.selectedPolicyId = policyId;
        } else {
            this.selectedPolicyId = policyId.policyId;
            this.contactId = policyId.contactId
        }
        ModalPlugin.show(this.modalIdConfirmCancelPolicy);
    }

    /**
     * Event to catch the selected contact
     * @param contactId The selected contact ID
     */
    onContactSelected(contactId: string): void {
        this._doActionToSelectedContact(contactId);
    }

    /**
     * Event to complete the policy data
     * @param data The policy record data
     */
    onCompletePolicy(data: PolicyRecordData): void {
        this._router.navigateByUrl(ROUTES_NAME.uploadPolicy(data.sourceContactId, data.sourceId));
    }

    /**
     * Event to show modal to confirm delete the contact file
     * @param data The contact file data
     */
    onDeleteContactFile(data: ContactFileDataSend): void {
        this.selectedContactFileData = data;
        ModalPlugin.show(this.modalIdConfirmDeleteContactFile);
    }

    /**
     * Event to show modal to confirm delete the policy
     * @param policyId The policy ID to delete
     */
    onDeletePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmDeleteCompletePolicy);
    }

    /**
     * Event to show modal to confirm delete the receipt paid
     * @param data The data to delete the recipt date
     */
    onDeleteReceiptPaid(data: DeleteReceiptPaidData): void {
        this.selectedPaymentId = data.paymentId;
        this.selectedReceiptPaidId = data.receiptPaidId;
        ModalPlugin.show(this.modalIdConfirmDeleteReceiptPaid);
    }

    /**
     * Event to delete the receipt paid
     */
    onDeleteReceiptPaidConfirmed(): void {
        this._loadingService.show();
        this.contentListService.deleteReceiptPaid(this.selectedPaymentId, this.selectedReceiptPaidId).subscribe(() => {
            this._loadingService.hide();
            const pageUrl = ROUTES_NAME.paymentHistory(this.contactId, this.policyId, this.paymentId)
            AlertHelper.receiptPaidDeleted(this._reloadPageAux, this, pageUrl);
        })
    }

    /**
     * Event to show modal to confirm delete sinister event
     * @param sinisterEventData The sinister event data
     */
    onDeleteSinisterEvent(sinisterEventData: SinisterEventDataSend): void {
        this.selectedSinisterEventData = sinisterEventData;
        ModalPlugin.show(this.modalIdConfirmDeleteSinisterEvent);
    }

    /**
     * Event to endorse a policy
     * @param policyId The policy ID
     */
    onEndorsePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmEndorsePolicy);
    }

    /**
     * Event to show modal to confirm finalize the sinister
     * @param sinisterData The sinister data
     */
    onFinalizeSinister(sinisterData: SinisterDataSend): void {
        this.selectedSinisterData = sinisterData;
        ModalPlugin.show(this.modalIdConfirmFinalizeSinister);
    }

    /**
     * Event to load more content
     */
    onLoadMoreContents(): void {
        this.page++;
        this._loadContents();
    }

    /**
     * Event to notify that the receipt has been paid
     */
    onReceiptPaid(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.PENDING_RECEIP.ID:
                const pageUrl: string = ROUTES_NAME.pendingReceipts(this.selectedContactId, this.selectedPolicyId, this.selectedPaymentId);
                this._reloadPage(pageUrl);
            break;

            default:
                this.receiptPaid.emit();
        }
    }

    /**
     * Event to reload content when removing a policy
     */
    onPolicyDeleted(): void {
        AlertHelper.policyDeleted();
        this._initContent();
    }

    /**
     * Event to reactivate a sinister
     * @param sinisterData The sinister data
     */
    onReactivateSinister(sinisterData: SinisterDataSend): void {
        this.selectedSinisterData = sinisterData;
        ModalPlugin.show(this.modalIdConfirmReactivateSinister);
    }

    /**
     * Event to reissue the policy
     * @param policyId [description]
     */
    onReissuePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmReissuePolicy);
    }

    /**
     * Event to reject a quotation
     * @param quotationId The quotation ID
     */
    onRejectQuotation(quotationId: string): void {
        this.selectedQuotationId = quotationId;
        ModalPlugin.show(this.modalIdRejectQuotation);
    }

    /**
     * Event to renew a policy
     * @param policyId The policy ID
     */
    onRenewPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        this._loadingService.show();
        this.contentListService.getPolicyLogs(this.contactId, policyId).subscribe((policyLogs: PolicyLog[]) => {
            this._loadingService.hide();
            // Check if the policy has already been renewed
            if(policyLogs.length > 0) {
                this.selectedPolicyIdToDelete = policyLogs[0].sourceId;
                ModalPlugin.show(this.modalIdConfirmDeleteRenewedPolicy);
            } else {
                ModalPlugin.show(this.modalIdConfirmRenewPolicy);
            }
        })
    }

    /**
     * Event to show the cancellation evidence
     * @param data The policy record data
     */
    onShowCancellationEvidence(data: PolicyRecordData): void {
        this.selectedCancelledPolicyId = data.sourceId;
        ModalPlugin.show(this.modalIdShowCancellationEvidence)
    }

    /**
     * Event to show the contact data modal
     * @param contactId The contact ID
     */
    onShowContactData(contactId: string): void {
        this.selectedContactId = contactId;
        ModalPlugin.show(this.modalIdShowContactData);
    }

    /**
     * Event to show endorsements
     * @param data The policy record data
     */
    onShowEndorsementFromRecord(data: PolicyRecordData): void {
        this.selectedEndorsementId = data.sourceId;
        ModalPlugin.show(this.modalIdShowEndorsement);
    }

    /**
     * Event to show the history policy
     * @param policyId The selected policy ID
     */
    onShowHistoryPolicy(policyId: string | { policyId: string, contactId: string }): void {
        if(typeof policyId === 'string') {
            this.selectedPolicyId = policyId;
        } else {
            this.selectedPolicyId = policyId.policyId;
            this.contactId = policyId.contactId
        }
        ModalPlugin.show(this.modalIdConfirmShowHistoryPolicy);
    }

    /**
     * Event to show the modal to confirm show the payment history
     * @param data The data to show the payment history
     */
    onShowPaymentHistory(data : ShowPaymentHistoryData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        this.selectedPaymentId = data.paymentId;
        ModalPlugin.show(this.modalIdConfirmShowPaymentHistory);
    }

    /**
     * Event to show modal to confirm show the sinister history
     * @param data The sinister data
     */
    onShowHistorySinister(data: SinisterDataSend): void {
        this.selectedSinisterData = data;
        ModalPlugin.show(this.modalIdConfirmShowSinisterHistory);
    }

    /**
     * Event to show the quotation details modal
     * @param quotationId The selected quotation ID
     */
    onShowQuotationDetails(quotationId: string): void {
        this.selectedQuotationId = quotationId;
        ModalPlugin.show(this.modalIdShowQuotationDetails);
    }

    /**
     * Event to show policy
     * @param policyId The policy ID
     */
    onShowPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        this.selectedContactId = this.contactId;
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to show policy
     * @param PolicyDataSend The policy data
     */
    onShowPolicyFromWorkspace(data: PolicyDataSend): void {
        this.selectedPolicyId = data.policyId;
        this.selectedContactId = data.contactId;
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to show the policy from the record
     * @param data The policy record ID
     */
    onShowPolicyFromRecord(data: PolicyRecordData): void {
        this.selectedPolicyId = data.sourceId;
        this.selectedContactId = data.sourceContactId;
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to show the policy details modal
     * @param policyId The selected policy ID
     */
    onShowPolicyDetails(policyId: string): void {
        this.selectedPolicyId = policyId;
        this.selectedContactId = this.contactId;
        ModalPlugin.show(this.modalIdShowPolicyDetails);
    }

    /**
     * Event to show the policy details from the record
     * @param data The policy record ID
     */
    onShowPolicyDetailsFromRecord(data: PolicyRecordData): void {
        this.selectedPolicyId = data.sourceId;
        this.selectedContactId = data.sourceContactId;
        ModalPlugin.show(this.modalIdShowPolicyDetails);
    }

    /**
     * Event to show the reactivation evidence
     * @param evidenceUrl The evidence url
     */
    onShowReactivationEvidence(evidenceUrl: string): void {
        this.selectedEvidenceUrl = evidenceUrl;
        ModalPlugin.show(this.modalIdShowReactivationEvidence);
    }

    /**
     * Event to show the reactivation evidence
     * @param evidenceUrl The evidence url
     */
    onShowResolutionEvidence(evidenceUrl: string): void {
        this.selectedEvidenceUrl = evidenceUrl;
        ModalPlugin.show(this.modalIdShowResolutionEvidence);
    }

    /**
     * Event to show the policy sinisters
     * @param policyData The policy data
     */
    onShowPolicySinisters(policyData: PolicyDataSend): void {
        this.selectedPolicyData = policyData;
        ModalPlugin.show(this.modalIdConfirmShowPolicySinisters);
    }

    /**
     * Event to show modal to confirm show the sinister
     * @param sinisterData The sinister data
     */
    onShowSinister(sinisterData: SinisterDataSend): void {
        this.selectedSinisterData = sinisterData;
        ModalPlugin.show(this.modalIdConfirmShowSinister)
    }

    /**
     * Event to show the sinister details
     * @param sinister The selected sinister
     */
    onShowSinisterDetails(sinister: Sinister): void {
        this.selectedSinister = sinister;
        ModalPlugin.show(this.modalIdShowSinisterDetails);
    }

    /**
     * Event to transfer the contact file
     * @param data The contact file data
     */
    onTransferContactFile(data: ContactFileDataSend): void {
        this.selectedContactFileData = data;
        ModalPlugin.show(this.modalIdTransferContactFile);
    }

    /**
     * Event to show the modat to confirm update the contact file
     */
    onUpdateContactFile(data: ContactFileDataSend): void {
        this.selectedContactFileData = data;
        ModalPlugin.show(this.modalIdConfirmUpdateContactFile);
    }

    /**
     * Event to show modal to confirm update policy
     */
    onUpdatePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmUpdatePolicy);
    }

    /**
     * Event to show modal to update the sinister event
     * @param sinisterEventData The sinister event data
     */
    onUpdateSinisterEvent(sinisterEventData: SinisterEventDataSend): void {
        this.selectedSinisterEventData = sinisterEventData;
        ModalPlugin.show(this.modalIdUpdateSinisterEvent);
    }

    reloadReceiptPaid(data: UpdateReceiptPaidDataSend): void {
        const index: number = this.contentListService.getContentPosition(this.selectedReceiptPaidId, 'receiptPaidId');
        this.contentListService.contents[index].receiptsAmount = data.receiptsAmount;
        this.contentListService.contents[index].receiptsNumber = data.receiptsNumber;
        this.contentListService.contents[index].applicationDate = moment(data.applicationDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }

    /**
     * Show the contact file details
     */
    showContactFileDetails(data: ContactFileDataSend): void {
        this.selectedContactFileData = data;
        ModalPlugin.show(this.modalIdShowContactFileDetails);
    }

    showModalApplyPayment(): void {
        ModalPlugin.show(this.modalIdApplyPayment);
    }

    showPartnerDetails(partner: Partner): void {
        this.selectedPartner = partner;
        ModalPlugin.show(this.modalIdShowPartnerDetails);
    }

    updateReceiptPaid(receiptPaidId: string): void {
        this.selectedReceiptPaidId = receiptPaidId;
        ModalPlugin.show(this.modalIdUpdateReceiptPaid);
    }

    applyPaymentReloaded(): void {
        this.canReloadApplyPayment = false;
    }

    /**
     * Do action to contact selected
     * @param contactId The selected contact ID
     */
    private _doActionToSelectedContact(contactId: string): void {
        switch(this.actionType) {
            case ACTION_TYPES.SELECT_CONTACT:
                this.selectedContactId = contactId;
                ModalPlugin.show(this.modalIdSelectContact);
                break;

            case ACTION_TYPES.RENEW_POLICY:
                this._loadingService.show();
                this.contentListService.renewPolicy(this.originContactId, this.originPolicyId, contactId).subscribe( (res: HttpResponse) => {
                    this._loadingService.hide();
                    this._router.navigateByUrl(ROUTES_NAME.uploadPolicy(contactId, res.data), { state: { comesFromRenewalPolicy: true} });
                });
                break;

            case ACTION_TYPES.REISSUE_POLICY:
                this._loadingService.show();
                this.contentListService.reissuePolicy(this.originContactId, this.originPolicyId, contactId).subscribe( (res: HttpResponse) => {
                    this._loadingService.hide();
                    this._router.navigate([ROUTES_NAME.uploadPolicy(contactId, res.data)]);
                });
                break;
        }
    }

    /**
     * Initialize the contents
     */
    private _initContent(): void {
        this.contentListService.resetData();
        this.page = 1;
        this._loadContents();
    }

    /**
     * Load the classes of the card
     */
    private _loadCardClasses(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID:
            case CONTENT_TYPES.CLIENT.ID:
            case CONTENT_TYPES.PARTNER.ID:
                this.cardClasses = 'col-md-3 col-xl-3';
            break;

            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
            case CONTENT_TYPES.CONTACT_POLICY.ID:
            case CONTENT_TYPES.CONTACT_FILE.ID:
            case CONTENT_TYPES.PAYMENT.ID:
            case CONTENT_TYPES.SINISTER.ID:
                this.cardClasses = 'col-sm-12 col-md-6 col-lg-6 col-xl-3';
            break;

            case CONTENT_TYPES.HISTORY_POLICY.ID:
            case CONTENT_TYPES.PAYMENT_HISTORY.ID:
            case CONTENT_TYPES.SINISTER_HISTORY.ID:
            case CONTENT_TYPES.POLICY_SINISTERS.ID:
                this.cardClasses = 'col-lg-12 mt-5';
            break;

            default:
                this.cardClasses = 'col-md-3 col-xl-3';
            break;
        }
    }

    /**
     * Load the contents according to action type (filter or search)
     */
    private _loadContents(): void {
        this.isLoadingContent = true;
        if(!!this.contentSubtype) {
            this._loadContentsByFilter();
        } else if(!!this.query) {
            this._loadContentsBySearch();
        } else if(!!this.specialQuery) {
            this._loadContentsBySearch();
        }
    }

    /**
     * Load the contents by filter
     */
    private _loadContentsByFilter(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID:
                this.contentListService.loadLeads(this.page, this.contentSubtype).subscribe( () => {
                    this._contentLoaded();
                });
            break;

            case CONTENT_TYPES.CLIENT.ID:
                this.contentListService.loadClients(this.page, this.contentSubtype).subscribe( () => {
                    this._contentLoaded();
                });
            break;

            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                this.contentListService.loadContactQuotations(this.contactId, this.page, this.contentSubtype).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.CONTACT_POLICY.ID:
                this.contentListService.loadContactPolicies(this.contactId, this.page, this.contentSubtype).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.HISTORY_POLICY.ID:
                this.contentListService.loadContactHistoryPolicy(this.contactId, this.policyId, this.page).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.PARTNER.ID:
                this.contentListService.loadPartners(this.page, this.contentSubtype).subscribe( () => {
                    this._contentLoaded();
                });
            break;

            case CONTENT_TYPES.PAYMENT.ID:
                this.contentListService.loadPayments(this.page, this.contentSubtype).subscribe( () => {
                    this._contentLoaded();
                });
            break;

            case CONTENT_TYPES.PAYMENT_HISTORY.ID:
                this.contentListService.loadPaymentHistory(this.paymentId, this.page).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.SINISTER.ID:
            this.contentListService.loadSinisters(this.page, this.contentSubtype).subscribe( () => {
                this._contentLoaded();
            });
            break;

            case CONTENT_TYPES.CONTACT_SINISTER.ID:
                this.contentListService.loadContactSinisters(this.contactId, this.page, this.contentSubtype).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.SINISTER_HISTORY.ID:
                this.contentListService.loadSinisterLogs(this.contactId, this.policyId, this.sinisterId, this.page).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.POLICY_SINISTERS.ID:
                this.contentListService.loadPolicySinisters(this.contactId, this.policyId, this.page).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.CONTACT_FILE.ID:
                this.contentListService.loadContactFiles(this.contactId, this.page).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.PENDING_RECEIP.ID:
                this.contentListService.loadPendingReceipts(this.paymentId, this.page).subscribe( () => {
                    this._contentLoaded();
                })
            break;
        }
    }

    /**
     * Load the contents by search
     */
    private _loadContentsBySearch(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.CONTACT.ID:
                this.contentListService.searchContacts(this.page, this.query, this.specialQuery).subscribe( () => {
                    this._contentLoaded();
                });
            break;

            case CONTENT_TYPES.LEAD.ID:
                this.contentListService.searchLeads(this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                });
            break;

            case CONTENT_TYPES.CLIENT.ID:
                this.contentListService.searchClients(this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                });
            break;

            case CONTENT_TYPES.CONTACT_FILE.ID:
                this.contentListService.searchContactFiles(this.contactId, this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                this.contentListService.searchContactQuotations(this.contactId, this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.CONTACT_POLICY.ID:
                this.contentListService.searchContactPolicies(this.contactId, this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.CONTACT_SINISTER.ID:
                this.contentListService.searchContactSinisters(this.contactId, this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.PARTNER.ID:
                console.log('this.query: ',this.query);
                this.contentListService.searchPartners(this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.PAYMENT.ID:
                this.contentListService.searchPayments(this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.SINISTER.ID:
                this.contentListService.searchSinisters(this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                })
            break;
        }
    }

    /**
     * Check if can show the total results
     * @return True if can, otherwise false
     */
    private _checkCanShowTotalResults(): boolean {
        let canShow: boolean = false;
        if(((!!this.query) || this.isHistoryContent) && (this.totalResults > 0) ) {
            switch(this.contentType) {
                case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                case CONTENT_TYPES.CONTACT_POLICY.ID:
                case CONTENT_TYPES.HISTORY_POLICY.ID:
                    canShow = true;
                break;
            }
        }
        return canShow;
    }

    /**
     * Close loading content and notify the total results when content is loaded
     */
    private _contentLoaded(): void {
        this.isLoadingContent = false;
        this.totalResults = this.contentListService.contentResultData.totalItems;
        this.canShowTotalResults = this._checkCanShowTotalResults();
        this.totalResultsLoaded.emit(this.totalResults);
    }

    /**
     * Reload the content
     * @param context The app context
     */
    private _reloadContent(context: ContentListComponent): void {
        context._initContent();
    }

    private _reloadPage(pageUrl: string): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/' + pageUrl], { relativeTo: this._activatedRoute });
    }

    private _reloadPageAux(context: ContentListComponent, pageUrl: string): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        context._router.navigate(['/' + pageUrl], { relativeTo: context._activatedRoute });
    }

}
