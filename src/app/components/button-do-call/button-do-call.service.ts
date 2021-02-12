import { Injectable } from '@angular/core';

import { Phone } from '@interfaces/phone.interface';
import { ExpressTokenData } from '@interfaces/express-token-data.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';
import { ExpressTokenService } from '@services/express-token.service';
import { JwtService } from '@services/jwt.service';

@Injectable()
export class ButtonDoCallService {
    phone: Phone;

    constructor(
        private _contactService: ContactService,
        private _expressTokenService: ExpressTokenService,
        private _jwtService: JwtService
    ) {
        this.phone = {
            phoneCode: '',
            phoneNumber: ''
        };
    }

    /**
     * Load the contact
     * @param contactId    The contact ID
     * @param expressToken The express token
     */
    loadContact(contactId: string): void {
        this._initPhone();
        const fields: string = 'phoneCode,phoneNumber';
        this._contactService.getContact(contactId, fields).subscribe( (res: HttpResponse) => {
            this.phone = res.data;
        })
    }

    /**
     * Load the express contact
     * @param expressToken The express token
     */
    loadExpressContact(expressToken: string): void {
        this._initPhone();
        const fields: string = 'phoneCode,phoneNumber';
        const expressTokenData: ExpressTokenData = this._decodeExpressToken(expressToken);
        this._expressTokenService.getExpressContact(expressTokenData.workspaceId, expressTokenData.contactId, expressToken, fields).subscribe( (res: HttpResponse) => {
            this.phone = res.data;
        });
    }

    /**
     * Decode the express contact
     * @param  expressToken The express token
     * @return              The express token data
     */
    private _decodeExpressToken(expressToken: string): ExpressTokenData {
        return this._jwtService.decodeToken(expressToken);
    }

    private _initPhone(): void {
        this.phone = {
            phoneCode: '',
            phoneNumber: ''
        };
    }
}
