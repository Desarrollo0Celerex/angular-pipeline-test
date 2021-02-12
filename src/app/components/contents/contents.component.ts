import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-contents',
  templateUrl: './contents.component.html',
  styles: [
  ]
})
export class ContentsComponent implements OnInit, OnDestroy {
    @Input() contentType: number;
    contentTypeName: string;
    contentSubtype: number;
    contentSubtypeName: string;
    private subParams: any;

    constructor(private _activatedRoute: ActivatedRoute) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeName = '';
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadContentTypeName();
    }

    ngOnDestroy(): void {
        if(!!this.subParams) this.subParams.unsubscribe();
    }

    /**
     * Event to update the content subtype name
     * @param contentSubtypeName The name of the new content subtype
     */
    onContentSubtypeNameLoaded(contentSubtypeName: string): void {
        this.contentSubtypeName = contentSubtypeName;
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.contentSubtype = (typeof params.contentSubtype !== 'undefined') ? parseInt(params.contentSubtype) : 1;
        })
    }

    /**
     * Load the content type name
     */
    private _loadContentTypeName(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD: this.contentTypeName = 'Prospecto'; break;
        }
    }

}
