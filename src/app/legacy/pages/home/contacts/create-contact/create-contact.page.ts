import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-create-contact',
  templateUrl: './create-contact.page.html',
  styles: [
  ]
})
export class CreateContactPage implements OnInit {
    contactTypeId: number;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
        this.contactTypeId = 0;
    }

    ngOnInit(): void {
        this._catchParams();
    }

    /**
     * Event contact created
     * @param contactId The created contact ID
     */
    onContactCreated(contactId: string): void {
        this._router.navigateByUrl(ROUTES_NAME.contactResume(contactId), { state: { contactSaved: true }});
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactTypeId = parseInt(this._activatedRoute.snapshot.params.contactTypeId);
    }

}
