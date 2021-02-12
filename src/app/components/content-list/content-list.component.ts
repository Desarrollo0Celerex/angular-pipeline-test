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
    showContactDataModalId: string;
    selectedContactId: string;

    constructor(public contentListService: ContentListService) {
        this.contentType = 0;
        this.contentSubtype = 0;
        this.CONTENT_TYPES = CONTENT_TYPES;
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

    onShowContactData(contactId: string): void {
        this.selectedContactId = contactId;
        ModalPlugin.show(this.showContactDataModalId);
    }

    /**
     * Load the contents according to content type
     */
    private _loadContents(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD:
                this.contentListService.loadLeads(this.contentSubtype)
            break;
        }

    }

}
