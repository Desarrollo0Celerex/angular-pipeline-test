import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

@Component({
  selector: 'agt-payment-history',
  templateUrl: './payment-history.page.html',
  styles: [
  ]
})
export class PaymentHistoryPage implements OnInit {
    contactId: string = '';
    policyId: string = '';
    paymentId: string = '';
    contentType: number = CONTENT_TYPES.PAYMENT_HISTORY.ID;
    contentTypeName: string = CONTENT_TYPES.PAYMENT_HISTORY.NAME;
    contentSubtype: number = DEFAULT_CONTENT_FILTER_ID;
    contentSubtypeName: string = 'Aplicado';
    message: string = 'Valida el historial de pagos de la póliza';
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
            this.paymentId = params.paymentId;
            this.policyId = params.policyId;
        })
    }
}
