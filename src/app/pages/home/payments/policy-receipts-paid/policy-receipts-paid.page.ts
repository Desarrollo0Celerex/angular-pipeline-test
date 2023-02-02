import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

@Component({
  selector: 'agt-policy-receipts-paid',
  templateUrl: './policy-receipts-paid.page.html',
  styles: [
  ]
})
export class PolicyReceiptsPaidPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    DEFAULT_CONTENT_FILTER_ID: number = DEFAULT_CONTENT_FILTER_ID;
    contactId: string = '';
    policyId: string = '';
    paymentId: string = '';
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
            this.paymentId = params.paymentId;
            this.policyId = params.policyId;
        })
    }

}
