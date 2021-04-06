import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'agt-show-history-policy',
  templateUrl: './show-history-policy.page.html',
  styles: [
  ]
})
export class ShowHistoryPolicyPage implements OnInit {
    contactId: string = '';
    policyId: string = '';

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

}
