import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContainerLastContactsService } from './container-last-contacts.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-last-contacts',
  templateUrl: './container-last-contacts.component.html',
  styles: [
  ],
  providers: [ContainerLastContactsService]
})
export class ContainerLastContactsComponent implements OnInit {
    modalIdShowContactData: string = 'agt-show-contact-data';
    selectedContactId: string = '';

    constructor(
        public containerLastContactsService: ContainerLastContactsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.containerLastContactsService.loadLastContacts();
    }

    goToContactProfile(contactId: string): void {
        this._router.navigateByUrl(ROUTES_NAME.contactResume(contactId));
    }

    showContactDataModal(contactId: string): void {
        this.selectedContactId = contactId;
        ModalPlugin.show(this.modalIdShowContactData);
    }
}
