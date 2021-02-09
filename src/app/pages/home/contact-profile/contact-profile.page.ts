import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContactProfileService } from './contact-profile.service';

@Component({
  selector: 'agt-contact-profile',
  templateUrl: './contact-profile.page.html',
  styles: [
  ]
})
export class ContactProfilePage implements OnInit {
    ROUTES_NAME: any;
    contactId: string;

    constructor(
        public contactProfileService: ContactProfileService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
        this.ROUTES_NAME = ROUTES_NAME;
        this.contactId = '';
    }

    ngOnInit(): void {
        this._catchParams();
        this.contactProfileService.loadContact(this.contactId);
    }

    /**
     * Click event to quote insurance
     */
    onClickQuoteInsurance(): void {
        this._router.navigateByUrl(ROUTES_NAME.listInsurances(this.contactId));
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = (!!this._activatedRoute.firstChild) ? this._activatedRoute.firstChild.snapshot.params.contactId : '';
    }

}
