import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

@Component({
    selector: 'agt-policy-endorsements-history',
    templateUrl: './policy-endorsements-history.page.html',
    styles: [],
    standalone: false
})
export class PolicyEndorsementsHistoryPage implements OnInit, OnDestroy {
    contactId: string = '';
    policyId: string = '';
    contentType: number = CONTENT_TYPES.POLICY_ENDORSEMENTS_HISTORY.ID;
    contentTypeName: string = CONTENT_TYPES.POLICY_ENDORSEMENTS_HISTORY.NAME;
    contentSubtype: number = DEFAULT_CONTENT_FILTER_ID;
    contentSubtypeName: string = 'Aplicado';
    message: string = 'Valida el historial de endosos de la póliza';
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
