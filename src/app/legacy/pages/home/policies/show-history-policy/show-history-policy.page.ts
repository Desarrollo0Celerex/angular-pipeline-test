import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-show-history-policy',
    templateUrl: './show-history-policy.page.html',
    styles: [],
    standalone: false
})
export class ShowHistoryPolicyPage implements OnInit, OnDestroy {
    contactId: string = '';
    policyId: string = '';
    contentType: number = CONTENT_TYPES.HISTORY_POLICY.ID;
    contentTypeName: string = CONTENT_TYPES.HISTORY_POLICY.NAME;
    contentSubtype: number = DEFAULT_CONTENT_FILTER_ID;
    contentSubtypeName: string = 'Registrado';
    modalIdConfirmShowPolicyEndorsements: string = 'shp-confirm-show-policy-endorsements';
    modalIdConfirmShowPolicyPayments: string = 'shp-confirm-show-policy-payments';
    modalIdConfirmShowPolicySinisters: string = 'shp-confirm-show-policy-sinisters';
    modalIdConfirmShowPolicyRenewals: string = 'shp-confirm-show-policy-renewals';
    policyData: PolicyDataSend | null = null;
    private _subParams: any;

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if(this._subParams) this._subParams.unsubscribe();
    }

    showModalToConfirmShowPolicySinisters(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicySinisters);
    }

    showModalToConfirmShowPolicyEndorsements(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicyEndorsements);
    }

    showModalToConfirmShowPolicyPayments(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicyPayments);
    }

    showModalToConfirmShowPolicyRenewals(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicyRenewals);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this._subParams = this._activatedRoute.params.subscribe( (params: Params) => {
            this.contactId = params.contactId;
            this.policyId = params.policyId;
            this.policyData = {
                contactId: this.contactId,
                policyId: this.policyId
            }
        })
    }

}
