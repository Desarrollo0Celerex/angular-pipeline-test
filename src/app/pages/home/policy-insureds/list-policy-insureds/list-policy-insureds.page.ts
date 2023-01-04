import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-list-policy-insureds',
  templateUrl: './list-policy-insureds.page.html',
  styles: [
  ]
})
export class ListPolicyInsuredsPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    contactId: string = '';
    policyId: string = '';

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }
    
}
