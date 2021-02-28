import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID, POLICY_STATUS_ACTIVE } from '@constants/global';

@Component({
  selector: 'agt-contents',
  templateUrl: './contents.component.html',
  styles: [
  ]
})
export class ContentsComponent implements OnInit, OnDestroy {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    canShowKpis: boolean;
    contentSubtype: number;
    contentSubtypeName: string;
    mainActionWidth: number;
    searchEngineWidth: number;
    private subParams: any;

    constructor(private _activatedRoute: ActivatedRoute) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeName = '';
        this.canShowKpis = false;
        this.mainActionWidth = 4;
        this.searchEngineWidth = 8;
    }

    ngOnInit(): void {
        this._catchParams();
        this.canShowKpis = this._checkCanShowKpis();
        this.mainActionWidth = this._getMainActionWidth();
        this.searchEngineWidth = this._getSearchEngineWidth();
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
            if(typeof params.contentSubtype !== 'undefined') {
                this.contentSubtype = parseInt(params.contentSubtype);
            } else {
                if(this.contentType === CONTENT_TYPES.CONTACT_POLICY.ID) {
                    this.contentSubtype = POLICY_STATUS_ACTIVE;
                } else {
                    this.contentSubtype = DEFAULT_CONTENT_FILTER_ID;
                }
            }
        })
    }

    /**
     * Check If can show  kpis
     * @return True if can, otherwise false
     */
    private _checkCanShowKpis(): boolean {
        let canShow: boolean;
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID:
            case CONTENT_TYPES.CLIENT.ID:
            case CONTENT_TYPES.PAYMENT.ID:
            case CONTENT_TYPES.SINISTER.ID:
                canShow = true;
            break;

            default:
                canShow = false;
        }
        return canShow;
    }

    /**
     * Get the width of the main action container
     * @return The width of container
     */
    private _getMainActionWidth(): number {
        let width: number;
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID:
            case CONTENT_TYPES.CLIENT.ID:
            case CONTENT_TYPES.PAYMENT.ID:
            case CONTENT_TYPES.SINISTER.ID:
                width = 3;
            break;

            default:
                width = 4;
        }
        return width;
    }

    /**
     * Get the width of the search action container
     * @return The width of container
     */
    private _getSearchEngineWidth(): number {
        let width: number;
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID:
            case CONTENT_TYPES.CLIENT.ID:
            case CONTENT_TYPES.PAYMENT.ID:
            case CONTENT_TYPES.SINISTER.ID:
                width = 9;
            break;

            default:
                width = 8;
        }
        return width;
    }

}
