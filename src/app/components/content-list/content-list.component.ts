import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
    @Input() contactId: string;
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Input() contentSubtypeName: string;
    @Input() query: string;
    @Output() totalResultsLoaded: EventEmitter<number>;
    CONTENT_TYPES: any;
    acceptQuotationModalId: string;
    isLoadingContent: boolean;
    page: number;
    selectedContactId: string;
    selectedQuotationId: string;
    showContactDataModalId: string;
    showQuotationDetailsModalId: string;

    constructor(public contentListService: ContentListService) {
        this.contactId = '';
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeName = '';
        this.query = '';
        this.totalResultsLoaded = new EventEmitter<number>();
        this.CONTENT_TYPES = CONTENT_TYPES;
        this.acceptQuotationModalId = 'agt-accept-quotation';
        this.isLoadingContent = false;
        this.page = 1;
        this.selectedContactId = '';
        this.selectedQuotationId = '';
        this.showContactDataModalId = 'agt-contact-data';
        this.showQuotationDetailsModalId = 'agt-quotation-details';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if((typeof changes.contentSubtype !== 'undefined' && !!changes.contentSubtype.currentValue) || (typeof changes.query !== 'undefined' && !!changes.query.currentValue)) {
            this.contentListService.resetData();
            this._loadContents();
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

            break;
        }
    }

    /**
     * Close loading content and notify the total results when content is loaded
     */
    private _contentLoaded(): void {
        this.isLoadingContent = false;
        this.totalResultsLoaded.emit(this.contentListService.contentResultData.totalItems);
    }

}
