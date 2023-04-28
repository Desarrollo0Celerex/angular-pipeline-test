import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@services/loading.service';

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
    modalIdConfirmDeleteContact: string = 'cp-modal-confirm-delete-contact';
    modalIdShowContactDetails: string = 'cp-modal-show-contact-details';
    pageType: number = 0;

    constructor(
        public contactProfileService: ContactProfileService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    get canDeleteContact(): boolean {
        if(!!this.contactProfileService.contact && this.contactProfileService.contact.clientStatusId === null) {
            return true;
        }
        return false;
    }

    deleteContact(): void {
        this._loadingService.show();
        this.contactProfileService.deleteContact(this.contactId).subscribe(() => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.listContacts);
            AlertHelper.contactDeleted();
        })
    }

    goToSelectInsurer(): void {
        this._router.navigateByUrl(ROUTES_NAME.createPolicy(this.contactId));
    }

    goToUpdateContact(): void {
        this._router.navigateByUrl(ROUTES_NAME.showContactData(this.contactId))
    }

    showModalConfirmDeleteContact(): void {
        ModalPlugin.show(this.modalIdConfirmDeleteContact);
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
