import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ACTION_TYPES, CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { DeleteReceiptPaidData } from '@interfaces/delete-receipt-paid-data.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyRecordData } from '@interfaces/policy-record-data.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { SelectActionTypeData } from '@interfaces/select-action-type-data.interface';
import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';
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
    @Input() specialQuery: SearchContactData | null;
    @Input() canReloadContent: boolean = false;
    @Output() totalResultsLoaded: EventEmitter<number>;
    @Output() contentReloaded: EventEmitter<void> = new EventEmitter<void>();
    @Output() receiptPaid: EventEmitter<void> = new EventEmitter<void>();
    CONTENT_TYPES: any;
    canShowTotalResults: boolean;
    cardClasses: string;
    isHistoryContent: boolean;
    isLoadingContent: boolean;
    page: number;
    selectedActionType: number;
    selectedContactId: string;
    selectedEndorsementId: string;
    selectedPaymentId: string;
    selectedPolicyId: string;
    selectedQuotationId: string;
    selectedReceiptPaidId: string;
    selectedSinister: Sinister | null = null;
    modalIdAcceptQuotation: string;
    modalIdApplyPayment: string;
    modalIdConfirmCancelPolicy: string;
    modalIdConfirmDeleteReceiptPaid: string;
    modalIdConfirmEndorsePolicy: string;
    modalIdConfirmReissuePolicy: string;
    modalIdConfirmRenewPolicy: string;
    modalIdConfirmShowHistoryPolicy: string;
    modalIdConfirmShowPaymentHistory: string;
    modalIdConfirmUpdatePolicy: string;
    modalIdRejectQuotation: string;
    modalIdSelectContact: string;
    modalIdSelectContactType: string;
    modalIdShowContactData: string;
    modalIdShowEndorsement: string;
    modalIdShowPolicy: string;
    modalIdShowPolicyDetails: string;
    modalIdShowQuotationDetails: string;
    modalIdShowSinisterDetails: string = 'agt-show-sinister-details';
    totalResults: number;
    private subParams: any;

    constructor(
        public contentListService: ContentListService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.contactId = '';
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeName = '';
        this.query = '';
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
        this.modalIdConfirmReissuePolicy = 'agt-confirm-reissue-policy';
        this.modalIdConfirmRenewPolicy = 'agt-confirm-renew-policy';
        this.modalIdConfirmShowHistoryPolicy = 'agt-confitm-show-history-policy';
        this.modalIdConfirmShowPaymentHistory = 'agt-confitm-show-payment-history';
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
        ModalPlugin.show(this.modalIdApplyPayment);
        ModalPlugin.setFixed();
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
            AlertHelper.receiptPaidDeleted(this._reloadContent, this);
        })
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
        this.receiptPaid.emit();
    }

    /**
     * Event to reload content when removing a policy
     */
    onPolicyDeleted(): void {
        this._initContent();
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
        ModalPlugin.show(this.modalIdConfirmRenewPolicy);
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
     * @param data The data
     */
    onShowPolicyFromWorkspace(data: { policyId: string, contactId: string }): void {
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
     * Event to show the sinister details
     * @param sinister The selected sinister
     */
    onShowSinisterDetails(sinister: Sinister): void {
        this.selectedSinister = sinister;
        ModalPlugin.show(this.modalIdShowSinisterDetails);
    }

    /**
     * Event to show modal to confirm update policy
     */
    onUpdatePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmUpdatePolicy);
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
                    this._router.navigate([ROUTES_NAME.uploadPolicy(contactId, res.data)]);
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
                this.cardClasses = 'col-md-3 col-xl-3';
            break;

            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
            case CONTENT_TYPES.CONTACT_POLICY.ID:
            case CONTENT_TYPES.PAYMENT.ID:
            case CONTENT_TYPES.SINISTER.ID:
                this.cardClasses = 'col-sm-12 col-md-6 col-lg-6 col-xl-3';
            break;

            case CONTENT_TYPES.HISTORY_POLICY.ID:
            case CONTENT_TYPES.PAYMENT_HISTORY.ID:
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

}
