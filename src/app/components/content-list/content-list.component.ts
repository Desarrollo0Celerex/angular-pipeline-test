import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ACTION_TYPES, CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@interfaces/http-response.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { SelectActionTypeData } from '@interfaces/select-action-type-data.interface';
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
    @Input() query: string;
    @Input() specialQuery: SearchContactData | null;
    @Output() totalResultsLoaded: EventEmitter<number>;
    CONTENT_TYPES: any;
    canShowTotalResults: boolean;
    isLoadingContent: boolean;
    page: number;
    selectedActionType: number;
    selectedContactId: string;
    selectedPolicyId: string;
    selectedQuotationId: string;
    modalIdAcceptQuotation: string;
    modalIdConfirmCancelPolicy: string;
    modalIdConfirmEndorsePolicy: string;
    modalIdConfirmReissuePolicy: string;
    modalIdConfirmRenewPolicy: string;
    modalIdConfirmUpdatePolicy: string;
    modalIdRejectQuotation: string;
    modalIdSelectContact: string;
    modalIdSelectContactType: string;
    modalIdShowContactData: string;
    modalIdShowPolicy: string;
    modalIdShowPolicyDetails: string;
    modalIdShowQuotationDetails: string;
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
        this.isLoadingContent = false;
        this.page = 1;
        this.selectedActionType = 0;
        this.selectedContactId = '';
        this.selectedPolicyId = '';
        this.selectedQuotationId = '';
        this.modalIdAcceptQuotation = 'agt-accept-quotation';
        this.modalIdConfirmCancelPolicy = 'agt-confirm-cancel-policy';
        this.modalIdConfirmEndorsePolicy = 'agt-confirm-endorse-policy';
        this.modalIdConfirmReissuePolicy = 'agt-confirm-reissue-policy';
        this.modalIdConfirmRenewPolicy = 'agt-confirm-renew-policy';
        this.modalIdConfirmUpdatePolicy = 'agt-confirm-update-policy';
        this.modalIdRejectQuotation = 'agt-reject-quotation';
        this.modalIdSelectContact = 'agt-select-contact';
        this.modalIdSelectContactType = 'agt-select-contact-type';
        this.modalIdShowContactData = 'agt-contact-data';
        this.modalIdShowPolicy = 'agt-show-policy';
        this.modalIdShowPolicyDetails = 'agt-show-policy-details';
        this.modalIdShowQuotationDetails = 'agt-show-quotation-details';
        this.originContactId = '';
        this.originPolicyId = '';
        this.totalResults = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if((typeof changes.contentSubtype !== 'undefined' && !!changes.contentSubtype.currentValue) || (typeof changes.query !== 'undefined' && !!changes.query.currentValue) || (typeof changes.specialQuery !== 'undefined' && !!changes.specialQuery.currentValue)) {
            this._initContent();
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
     * Event to cancel a policy
     * @param policyId The policy ID
     */
    onCancelPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
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
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to show the policy details modal
     * @param policyId The selected policy ID
     */
    onShowPolicyDetails(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdShowPolicyDetails);
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
        this._loadContents();
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
        }
    }

    /**
     * Check if can show the total results
     * @return True if can, otherwise false
     */
    private _checkCanShowTotalResults(): boolean {
        let canShow: boolean = false;
        if((!!this.query) && (this.totalResults > 0) ) {
            switch(this.contentType) {
                case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                case CONTENT_TYPES.CONTACT_POLICY.ID:
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

}
