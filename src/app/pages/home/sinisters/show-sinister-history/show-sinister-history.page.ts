import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';

@Component({
  selector: 'agt-show-sinister-history',
  templateUrl: './show-sinister-history.page.html',
  styles: [
  ]
})
export class ShowSinisterHistoryPage implements OnInit {
    contactId: string = '';
    policyId: string = '';
    sinisterId: string = '';
    sinisterData: SinisterDataSend | null = null;
    CONTENT_TYPES: any = CONTENT_TYPES;

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
        this.sinisterId = this._activatedRoute.snapshot.params.sinisterId;
        this.sinisterData = {
            contactId: this.contactId,
            policyId: this.policyId,
            sinisterId: this.sinisterId
        }
    }

}
