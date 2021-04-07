import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-show-history-policy',
  templateUrl: './show-history-policy.page.html',
  styles: [
  ]
})
export class ShowHistoryPolicyPage implements OnInit, OnDestroy {
    contactId: string = '';
    policyId: string = '';
    contentType: number = CONTENT_TYPES.HISTORY_POLICY.ID;
    contentTypeName: string = CONTENT_TYPES.HISTORY_POLICY.NAME;
    private _subParams: any;

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if(this._subParams) this._subParams.unsubscribe();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this._subParams = this._activatedRoute.params.subscribe( (params: Params) => {
            this.contactId = params.contactId;
            this.policyId = params.policyId;
        })
    }

}
