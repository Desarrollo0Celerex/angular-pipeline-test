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
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Input() contentSubtypeName: string;
    @Input() query: string;
    @Output() totalResultsLoaded: EventEmitter<number>;
    CONTENT_TYPES: any;
    isLoadingContent: boolean;
    page: number;
    selectedContactId: string;
    showContactDataModalId: string;

    constructor(public contentListService: ContentListService) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeName = '';
        this.query = '';
        this.totalResultsLoaded = new EventEmitter<number>();
        this.CONTENT_TYPES = CONTENT_TYPES;
        this.isLoadingContent = false;
        this.page = 1;
        this.showContactDataModalId = 'agt-contact-data';
        this.selectedContactId = '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if((typeof changes.contentSubtype !== 'undefined' && !!changes.contentSubtype.currentValue) || (typeof changes.query !== 'undefined' && !!changes.query.currentValue)) {
            this.contentListService.resetData();
            this._loadContents();
        }
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
     * Load the contents according to content type and to action type (filter or search)
     */
    private _loadContents(): void {
        this.isLoadingContent = true;
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID:
                if(!!this.contentSubtype) {
                    this.contentListService.loadLeads(this.page, this.contentSubtype).subscribe( () => {
                        this._contentLoaded();
                    });
                } else if(!!this.query) {
                    this.contentListService.searchLeads(this.page, this.query).subscribe( () => {
                        this._contentLoaded();
                    });
                }
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
