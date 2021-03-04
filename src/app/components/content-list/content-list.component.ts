import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';

import { ContentListService } from './content-list.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-content-list',
  templateUrl: './content-list.component.html',
  styles: [
  ]
})
export class ContentListComponent implements OnChanges {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Input() contentSubtypeName: string;
    @Input() query: string;
    @Output() totalResultsLoaded: EventEmitter<number>;
    CONTENT_TYPES: any;
    acceptQuotationModalId: string;
    canShowTotalResults: boolean;
    contactId: string;
    isLoadingContent: boolean;
    page: number;
    rejectQuotationModalId: string;
    selectedContactId: string;
    selectedPolicyId: string;
    selectedQuotationId: string;
    showContactDataModalId: string;
    showPolicyDetailsModalId: string;
    showPolicyModalId: string;
    showQuotationDetailsModalId: string;
    totalResults: number;

    constructor(
        public contentListService: ContentListService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeName = '';
        this.query = '';
        this.totalResultsLoaded = new EventEmitter<number>();
        this.CONTENT_TYPES = CONTENT_TYPES;
        this.acceptQuotationModalId = 'agt-accept-quotation';
        this.contactId = this._getContactId();
        this.canShowTotalResults = false;
        this.isLoadingContent = false;
        this.page = 1;
        this.rejectQuotationModalId = 'agt-reject-quotation';
        this.selectedContactId = '';
        this.selectedPolicyId = '';
        this.selectedQuotationId = '';
        this.showContactDataModalId = 'agt-contact-data';
        this.showPolicyModalId = 'agt-show-policy';
        this.showPolicyDetailsModalId = 'agt-show-policy-details';
        this.showQuotationDetailsModalId = 'agt-show-quotation-details';
        this.totalResults = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if((typeof changes.contentSubtype !== 'undefined' && !!changes.contentSubtype.currentValue) || (typeof changes.query !== 'undefined' && !!changes.query.currentValue)) {
            this.contentListService.resetData();
            this._loadContents();
            this.canShowTotalResults = this._checkCanShowTotalResults();
        }
    }

    /**
     * Event to show modal to accept the quotation
     * @param quotationId The quotation ID to accept
     */
    onAcceptQuotation(quotationId: string): void {
        this.selectedQuotationId = quotationId;
        ModalPlugin.show(this.acceptQuotationModalId);
    }

    /**
     * Event to load more content
     */
    onLoadMoreContents(): void {
        this.page++;
        this._loadContents();
    }

    /**
     * Event to reject a quotation
     * @param quotationId [description]
     */
    onRejectQuotation(quotationId: string): void {
        this.selectedQuotationId = quotationId;
        ModalPlugin.show(this.rejectQuotationModalId);
    }

    /**
     * Event to show the contact data modal
     * @param contactId The contact ID
     */
    onShowContactData(contactId: string): void {
        this.selectedContactId = contactId;
        ModalPlugin.show(this.showContactDataModalId);
    }

    /**
     * Event to show the quotation details modal
     * @param quotationId The selected quotation ID
     */
    onShowQuotationDetails(quotationId: string): void {
        this.selectedQuotationId = quotationId;
        ModalPlugin.show(this.showQuotationDetailsModalId);
    }

    /**
     * Event to show policy
     * @param policyId The policy ID
     */
    onShowPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.showPolicyModalId);
    }

    /**
     * Event to show the policy details modal
     * @param policyId The selected policy ID
     */
    onShowPolicyDetails(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.showPolicyDetailsModalId);
    }

    /**
     * Get the contact ID from params
     */
    private _getContactId(): string {
        const contactId: string | undefined = this._activatedRoute.snapshot.params.contactId;
        return (!!contactId) ? contactId : '';
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
            case CONTENT_TYPES.LEAD.ID:
                this.contentListService.searchLeads(this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                });
            break;

            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                this.contentListService.searchContactQuotations(this.contactId, this.page, this.query).subscribe( () => {
                    this._contentLoaded();
                })
            break;

            case CONTENT_TYPES.CONTACT_POLICT.ID:

            break;
        }
    }

    /**
     * Check if can show the total results
     * @return True if can, otherwise false
     */
    private _checkCanShowTotalResults(): boolean {
        let canShow: boolean = false;
        if(!!this.query) {
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
        this.totalResultsLoaded.emit(this.totalResults);
    }

}
