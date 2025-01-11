import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BUTTON_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { ExpressTokenData } from '@interfaces/express-token-data.interface';

import { ExpressContactService } from './express-contact.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-express-contact',
    templateUrl: './express-contact.page.html',
    styles: [],
    standalone: false
})
export class ExpressContactPage implements OnInit {
    BUTTON_TYPES: any;
    expressToken: string;
    incompleteContactDataModalId: string;

    constructor(
        public expressContactService: ExpressContactService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
        this.BUTTON_TYPES = BUTTON_TYPES;
        this.expressToken = '';
        this.incompleteContactDataModalId = 'agt-incomplete-contact-data';
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadExpressContact(this.expressToken);
    }

    /**
     * Event to notify if the connection failed
     */
    onContactActionFailed(): void {
        ModalPlugin.show(this.incompleteContactDataModalId);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.expressToken = this._activatedRoute.snapshot.params.expressToken;
    }

    /**
     * Load the express contact
     * @param expressToken The express token
     */
    private _loadExpressContact(expressToken: string): void {
        const expressTokenData: ExpressTokenData = this.expressContactService.decodeExpressToken(expressToken);
        if(!!expressTokenData) {
            this.expressContactService.loadExpressContact(expressTokenData.workspaceId, expressTokenData.contactId, expressToken);
        } else {
            this._router.navigateByUrl(ROUTES_NAME.invalidExpressToken);
        }
    }

}
