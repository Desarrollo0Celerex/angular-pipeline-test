import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID, POLICY_STATUS_ACTIVE, SINISTER_STATUS_OPEN } from '@constants/global';
import { Payment } from '@interfaces/payment.interface';
import { LabelFoundFormatPipe } from '@pipes/label-found-format/label-found-format.pipe';

@Component({
  selector: 'agt-contents',
  templateUrl: './contents.component.html',
  styles: [
  ]
})
export class ContentsComponent implements OnInit, OnDestroy {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @ViewChild('contentList') contentList: any;
    canReloadContent: boolean = false;
    canShowKpis: boolean;
    contactId: string;
    contentSubtype: number;
    contentSubtypeName: string;
    mainActionWidth: number;
    searchEngineWidth: number;
    query: string;
    private _subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _labelFoundFormatPipe: LabelFoundFormatPipe
    ) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeName = '';
        this.canShowKpis = false;
        this.contactId = '';
        this.mainActionWidth = 4;
        this.searchEngineWidth = 8;
        this.query = '';
    }

    ngOnInit(): void {
        this._catchParams();
        this.canShowKpis = this._checkCanShowKpis();
        this.mainActionWidth = this._getMainActionWidth();
        this.searchEngineWidth = this._getSearchEngineWidth();
    }

    ngOnDestroy(): void {
        if(!!this._subParams) this._subParams.unsubscribe();
    }

    /**
     * Event to catch notification of reloaded content
     */
    onContentReloaded(): void {
        this.canReloadContent = false;
    }

    /**
     * Event to catch the name of the selected content subtype
     * @param contentSubtypeName The name of the selected content subtype
     */
    onContentSubtypeNameSelected(contentSubtypeName: string): void {
        this.contentSubtypeName = contentSubtypeName;
    }

    /**
     * Event to reload content
     */
    onReloadContent(): void {
        this.canReloadContent = true;
    }

    applyPayment(payment: Payment): void {
        this.contentList.applyPayment(payment);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        // Static params
        this.contactId = (!!this._activatedRoute.snapshot.params.contactId) ? this._activatedRoute.snapshot.params.contactId : '';

        // Dynamic params
        this._subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.contentSubtype = this._getContentSubtype(params.contentSubtype);
            this.query = (typeof params.query !== 'undefined') ? params.query : '';
            if(!!this.query) {
                this.contentSubtype = 0;
                this.contentSubtypeName = this._labelFoundFormatPipe.transform(this.contentType);
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
            case CONTENT_TYPES.PARTNER.ID:
                canShow = true;
            break;

            default:
                canShow = false;
        }
        return canShow;
    }

    /**
     * Get the contact subtype
     * @param  param The content subtype param
     * @return       The content subtype
     */
    private _getContentSubtype(param: string): number {
        let contentSubtype: number;
        if(typeof param !== 'undefined') {
            contentSubtype = parseInt(param);
        } else {
            if(this.contentType === CONTENT_TYPES.CONTACT_POLICY.ID) {
                contentSubtype = POLICY_STATUS_ACTIVE;
            } else if(this.contentType === CONTENT_TYPES.CONTACT_SINISTER.ID) {
                contentSubtype = SINISTER_STATUS_OPEN;
            } else {
                contentSubtype = DEFAULT_CONTENT_FILTER_ID;
            }
        }
        return contentSubtype;
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
            case CONTENT_TYPES.PARTNER.ID:
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
            case CONTENT_TYPES.PARTNER.ID:
                width = 9;
            break;

            default:
                width = 8;
        }
        return width;
    }

}
