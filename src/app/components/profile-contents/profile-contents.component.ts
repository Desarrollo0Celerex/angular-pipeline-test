import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

@Component({
  selector: 'agt-profile-contents',
  templateUrl: './profile-contents.component.html',
  styles: [
  ]
})
export class ProfileContentsComponent implements OnInit {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    contactId: string;
    contentSubtype: number;
    contentSubtypeName: string;
    private subParams: any;

    constructor(private _activatedRoute: ActivatedRoute) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.contactId = '';
        this.contentSubtype = 1;
        this.contentSubtypeName = '';
    }

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if(!!this.subParams) this.subParams.unsubscribe();
    }

    /**
     * Event to catch the name of the selected content subtype
     * @param contentSubtypeName The name of the selected content subtype
     */
    onContentSubtypeNameSelected(contentSubtypeName: string): void {
        this.contentSubtypeName = contentSubtypeName;
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.contentSubtype = (typeof params.contentSubtype !== 'undefined') ? parseInt(params.contentSubtype) : DEFAULT_CONTENT_FILTER_ID;
        })
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

}
