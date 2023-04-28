import { Injectable } from '@angular/core';

import { ExpressTokenData } from '@interfaces/express-token-data.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';
import { ExpressTokenService } from '@services/express-token.service';
import { JwtService } from '@core/services/jwt.service';

@Injectable()
export class ButtonSendEmailService {
    email: string;

    constructor(
        private _contactService: ContactService,
        private _expressTokenService: ExpressTokenService,
        private _jwtService: JwtService
    ) {
        this.email = '';
    }

    /**
     * Load the contact
     * @param contactId    The contact ID
     */
    loadContact(contactId: string): void {
        this.email = '';
        const fields: string = 'email';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: HttpResponse) => {
                this.email = res.data.email;
            });
    }

    /**
     * Load the express contact
     * @param expressToken The express token
     */
    loadExpressContact(expressToken: string): void {
        this.email = '';
        const fields: string = 'email';
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
                this.email = res.data.email;
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
}
