import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

import { CONTACT_PROFILE_PAGE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { Policy } from '@interfaces/policy.interface';

import { ContactProfileService } from './contact-profile.service';

declare var ModalPlugin: any;

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
    modalIdConfirmCreateSinister: string = 'agt-confirm-create-sinister';
    modalIdCreateSinister: string = 'agt-create-sinister';
    modalIdSearchContactPolicy: string = 'agt-search-contact-policy';
    pageType: number = 0;
    searchContactPolicyMessage: string = 'Ingresa la póliza a la que deseas reportar el siniestro.';
    selectedPolicy: Policy | null = null;

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
     * Click event to create a sinister
     */
    onClickCreateSinister(): void {
        ModalPlugin.show(this.modalIdConfirmCreateSinister);
    }

    /**
     * Event to catch confirmation to create sinister
     */
    onCreateSinisterConfirmed(): void {
        ModalPlugin.show(this.modalIdSearchContactPolicy);
    }

    /**
     * Event to catch the found policy
     * @param policies The found policy
     */
    onPolicyFound(policy: Policy): void {
        this.selectedPolicy = policy;
        ModalPlugin.setFixed();
        ModalPlugin.show(this.modalIdCreateSinister);
    }

    /**
     * Event to catch notification of sinister created
     */
    onSinisterCreated(): void {
        this._reloadComponent();
    }

    /**
     * Reload the component
     */
    private _reloadComponent(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate([ROUTES_NAME.listContactSinisters(this.contactId)], { relativeTo: this._activatedRoute });
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
