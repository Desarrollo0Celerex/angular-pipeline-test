import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContactProfileService } from './contact-profile.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-contact-profile',
  templateUrl: './contact-profile.page.html',
  styles: [
  ],
  providers: [ContactProfileService]
})
export class ContactProfilePage implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    contactId: string = '';
    modalIdShowContactDetails: string = 'cp-modal-show-contact-details';
    pageType: number = 0;

    constructor(
        public contactProfileService: ContactProfileService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    goToSelectInsurer(): void {

    }

    goToUpdateContact(): void {
        this._router.navigateByUrl(ROUTES_NAME.showContactData(this.contactId))
    }

    showModalConfirmDeleteContact(): void {

    }

    showModalContactDetails(): void {
        ModalPlugin.show(this.modalIdShowContactDetails);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        if(!!this._activatedRoute.firstChild) {
            this._activatedRoute.firstChild.paramMap.subscribe((res: any) => {
                this.contactId = res.get('contactId');
                this.contactProfileService.loadContact(this.contactId);
                this._catchPageType();
                this.pageType = this.contactProfileService.getPageType(this._router.url);
            });
        }
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
