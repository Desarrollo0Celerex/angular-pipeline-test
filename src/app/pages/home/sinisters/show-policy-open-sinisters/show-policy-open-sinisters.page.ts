import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES, DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

@Component({
  selector: 'agt-show-policy-open-sinisters',
  templateUrl: './show-policy-open-sinisters.page.html',
  styles: [
  ]
})
export class ShowPolicyOpenSinistersPage implements OnInit {
    contactId: string = '';
    policyId: string = '';
    contentType: number = CONTENT_TYPES.POLICY_OPEN_SINISTERS.ID;
    contentTypeName: string = CONTENT_TYPES.POLICY_OPEN_SINISTERS.NAME;
    contentSubtype: number = DEFAULT_CONTENT_FILTER_ID;
    contentSubtypeName: string = 'Abierto';
    message: string = 'Valida los siniestros abiertos de la póliza';

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

}
