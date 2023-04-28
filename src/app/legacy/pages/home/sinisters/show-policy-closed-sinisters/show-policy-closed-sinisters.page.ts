import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

@Component({
  selector: 'agt-show-policy-closed-sinisters',
  templateUrl: './show-policy-closed-sinisters.page.html',
  styles: [
  ]
})
export class ShowPolicyClosedSinistersPage implements OnInit {
    contactId: string = '';
    policyId: string = '';
    contentType: number = CONTENT_TYPES.POLICY_CLOSED_SINISTERS.ID;
    contentTypeName: string = CONTENT_TYPES.POLICY_CLOSED_SINISTERS.NAME;
    contentSubtype: number = DEFAULT_CONTENT_FILTER_ID;
    contentSubtypeName: string = 'Cerrado';
    message: string = 'Valida los siniestros cerrados de la póliza';

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

}
