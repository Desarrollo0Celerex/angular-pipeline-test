import { Injectable } from '@angular/core';
import { VCard } from 'ngx-vcard';

import { Contact } from '@core/interfaces/contact.interface';
import { ExpressTokenData } from '@interfaces/express-token-data.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { ExpressTokenService } from '@services/express-token.service';
import { JwtService } from '@core/services/jwt/jwt.service';

@Injectable()
export class ButtonDownloadContactService {
    vCard: VCard;

    constructor(
        private _contactService: ContactService,
        private _expressTokenService: ExpressTokenService,
        private _jwtService: JwtService
    ) {
        this.vCard = {};
    }

    /**
     * Load the contact data
     * @param contactId    The contact ID
     * @param expressToken The express token
     */
    loadContact(contactId: string): void {
        this.vCard = {};
        const fields: string = 'contactName,phoneNumber,email';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: Contact) => {
                this._generateVcard(res);
            });
    }

    /**
     * Load the express contact
     * @param expressToken The express token
     */
    loadExpressContact(expressToken: string): void {
        this.vCard = {};
        const fields: string = 'contactName,phoneNumber,email';
        const expressTokenData: ExpressTokenData =
            this._decodeExpressToken(expressToken);
        this._expressTokenService
            .getExpressContact(
                expressTokenData.workspaceId,
                expressTokenData.contactId,
                expressToken,
                fields
            )
            .subscribe((res: HttpResponse) => {
                this._generateVcard(res.data);
            });
    }

    /**
     * Generate the vCard
     * @param contact The contact data
     */
    private _generateVcard(contact: Contact): void {
        this.vCard = {
            name: {
                firstNames: contact.contactName,
                lastNames: '',
            },
            email: [contact.email],
            telephone: [contact.phoneNumber],
            organization: 'Agenthos',
            url: {
                work: 'https://agenthos.com',
                home: '',
            },
        };
    }

    /**
     * Decode the express contact
     * @param  expressToken The express token
     * @return              The express token data
     */
    private _decodeExpressToken(expressToken: string): ExpressTokenData {
        return this._jwtService.decodeToken(expressToken);
    }
}
