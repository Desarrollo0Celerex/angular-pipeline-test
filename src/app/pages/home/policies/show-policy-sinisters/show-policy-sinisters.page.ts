import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-show-policy-sinisters',
  templateUrl: './show-policy-sinisters.page.html',
  styles: [
  ]
})
export class ShowPolicySinistersPage implements OnInit {
    contactId: string = '';
    policyId: string = '';
    CONTENT_TYPES: any = CONTENT_TYPES;

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

}
