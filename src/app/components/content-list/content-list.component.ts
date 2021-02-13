import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

import { ContentListService } from './content-list.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-content-list',
  templateUrl: './content-list.component.html',
  styles: [
  ]
})
export class ContentListComponent implements OnInit, OnChanges {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Input() contentSubtypeName: string;
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
        this.CONTENT_TYPES = CONTENT_TYPES;
        this.isLoadingContent = false;
        this.page = 1;
        this.showContactDataModalId = 'agt-contact-data';
        this.selectedContactId = '';
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contentSubtype !== 'undefined' && !!changes.contentSubtype.currentValue) {
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
     * Load the contents according to content type
     */
    private _loadContents(): void {
        this.isLoadingContent = true;
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD:
                this.contentListService.loadLeads(this.contentSubtype, this.page).subscribe( () => {
                    this.isLoadingContent = false;
                });
            break;
        }

    }

}
