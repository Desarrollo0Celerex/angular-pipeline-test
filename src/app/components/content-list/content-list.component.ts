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
    @Input() contentSubtype: number;
    CONTENT_TYPES: any;
    isLoadingContent: boolean;
    selectedContactId: string;
    showContactDataModalId: string;

    constructor(public contentListService: ContentListService) {
        this.contentType = 0;
        this.contentSubtype = 0;
        this.CONTENT_TYPES = CONTENT_TYPES;
        this.isLoadingContent = false;
        this.showContactDataModalId = 'agt-contact-data';
        this.selectedContactId = '';
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contentSubtype.currentValue) {
            this._loadContents();
        }
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
        this.contentListService.initContents();
        this.isLoadingContent = true;
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD:
                this.contentListService.loadLeads(this.contentSubtype).subscribe( () => {
                    this.isLoadingContent = false;
                });
            break;
        }

    }

}
