import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

import { CONTACT_PROFILE_PAGE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { ContactProfileService } from './contact-profile.service';

@Component({
  selector: 'agt-contact-profile',
  templateUrl: './contact-profile.page.html',
  styles: [
  ]
})
export class ContactProfilePage implements OnInit {
    CONTACT_PROFILE_PAGE_TYPES: any = CONTACT_PROFILE_PAGE_TYPES;
    ROUTES_NAME: any = ROUTES_NAME;
    contactId: string = '';
    pageType: number = 0;

    constructor(
        public contactProfileService: ContactProfileService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._catchParams();
        this._catchPageType();
        this.pageType = this.contactProfileService.getPageType(this._router.url);
        this.contactProfileService.loadContact(this.contactId);
    }

    /**
     * Click event to create a policy
     */
    onClickCreatePolicy(): void {
        this._router.navigateByUrl(ROUTES_NAME.createPolicy(this.contactId));
    }

    /**
     * Click event to create a quotation
     */
    onClickCreateQuotation(): void {
        this._router.navigateByUrl(ROUTES_NAME.createQuotation(this.contactId));
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = (!!this._activatedRoute.firstChild) ? this._activatedRoute.firstChild.snapshot.params.contactId : '';
    }

    /**
     * Catch the page type
     */
    private _catchPageType(): void {
        this._router.events.subscribe( (event: Event) => {
            if(event instanceof NavigationEnd) {
                this.pageType = this.contactProfileService.getPageType(event.url);
            }
        });
    }

}
