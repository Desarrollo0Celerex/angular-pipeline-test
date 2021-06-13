import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ACTION_TYPES, CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { ChangeContactService } from './change-contact.service';

@Component({
  selector: 'agt-change-contact',
  templateUrl: './change-contact.page.html',
  styles: [
  ]
})
export class ChangeContactPage implements OnInit {
    actionType: number;
    contactId: string;
    contactTypeId: number;
    contentType: number;
    contentTypeName: string;
    policyId: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeContactService: ChangeContactService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.actionType = 0;
        this.contactTypeId = 0;
        this.contactId = '';
        this.contentType = CONTENT_TYPES.CONTACT.ID;
        this.contentTypeName = CONTENT_TYPES.CONTACT.NAME;
        this.policyId = '';
    }

    ngOnInit(): void {
        this._catchParams();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.actionType = parseInt(this._activatedRoute.snapshot.params.actionType) || 0;
        this.contactId = this._activatedRoute.snapshot.params.contactId || '';
        this.contactTypeId = parseInt(this._activatedRoute.snapshot.params.contactTypeId) || 0;
        this.policyId = this._activatedRoute.snapshot.params.policyId || '';
    }

    /**
     * Event contact created
     * @param contactId The created contact ID
     */
    onContactCreated(contactId: string): void {
        this._doAction(contactId);
    }

    /**
     * Do the action request
     * @param createdContactId The new contact ID
     */
    private _doAction(createdContactId: string): void {
        switch(this.actionType) {
            case ACTION_TYPES.RENEW_POLICY:
                this._loadingService.show();
                this._changeContactService.renewPolicy(this.contactId, this.policyId, createdContactId).subscribe( (res: HttpResponse) => {
                    this._loadingService.hide();
                    this._router.navigateByUrl(ROUTES_NAME.uploadPolicy(createdContactId, res.data), { state: { comesFromRenewalPolicy: true} });
                })
                break;

            case ACTION_TYPES.REISSUE_POLICY:
                this._loadingService.show();
                this._changeContactService.reissuePolicy(this.contactId, this.policyId, createdContactId).subscribe( (res: HttpResponse) => {
                    this._loadingService.hide();
                    this._router.navigate([ROUTES_NAME.uploadPolicy(createdContactId, res.data)]);
                })
                break;
        }
    }

}
