import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@core/services/loading.service';

import { ContainerLastContactsService } from './container-last-contacts.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-last-contacts',
    templateUrl: './container-last-contacts.component.html',
    styles: [],
    providers: [ContainerLastContactsService],
})
export class ContainerLastContactsComponent implements OnInit {
    modalIdConfirmDeleteContact: string = 'agt-confirm-delete-contact';
    modalIdShowContactData: string = 'agt-show-contact-data';
    selectedContactId: string = '';
    selectedContactIdToDelete: string = '';

    constructor(
        public containerLastContactsService: ContainerLastContactsService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.containerLastContactsService.loadLastContacts();
    }

    deleteContact(): void {
        this._loadingService.show();
        this.containerLastContactsService
            .deleteContact(this.selectedContactIdToDelete)
            .subscribe(() => {
                this._loadingService.hide();
                this._reloadPage(ROUTES_NAME.dashboard);
                AlertHelper.contactDeleted();
            });
    }

    goToContactProfile(contactId: string): void {
        this._router.navigateByUrl(ROUTES_NAME.contactResume(contactId));
    }

    goToListContacts(): void {
        this._router.navigateByUrl(ROUTES_NAME.listContacts);
    }

    showContactDataModal(contactId: string): void {
        this.selectedContactId = contactId;
        ModalPlugin.show(this.modalIdShowContactData);
    }

    showModalToConfirmDeleteContact(contactId: string): void {
        this.selectedContactIdToDelete = contactId;
        ModalPlugin.show(this.modalIdConfirmDeleteContact);
    }

    private _reloadPage(pageUrl: string): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/' + pageUrl], {
            relativeTo: this._activatedRoute,
        });
    }
}
