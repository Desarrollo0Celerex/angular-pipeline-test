import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

@Component({
  selector: 'agt-policy-renewals-applied',
  templateUrl: './policy-renewals-applied.page.html',
  styles: [
  ]
})
export class PolicyRenewalsAppliedPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    DEFAULT_CONTENT_FILTER_ID: number = DEFAULT_CONTENT_FILTER_ID;
    contactId: string = '';
    policyId: string = '';
    private _subParams: any;

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if(this._subParams) this._subParams.unsubscribe();
    }

    private _catchParams(): void {
        this._subParams = this._activatedRoute.params.subscribe( (params: Params) => {
            this.contactId = params.contactId;
            this.policyId = params.policyId;
        })
    }

}
