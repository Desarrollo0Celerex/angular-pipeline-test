import { Injectable } from '@angular/core';

import { Contact } from '@interfaces/contact.interface';
import { ExpressTokenData } from '@interfaces/express-token-data.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { VcardData } from '@interfaces/vcard-data.interface';
import { ExpressTokenService } from '@services/express-token.service';
import { JwtService } from '@services/jwt.service';

@Injectable()
export class ExpressContactService {
    contact: Contact | null;
    vcardData: VcardData | null;

    constructor(
        private _expressTokenService: ExpressTokenService,
        private _jwtService: JwtService
    ) {
        this.contact = null;
        this.vcardData = null;
    }

    /**
     * Decode an express token
     * @param  expressToken The express token to decode
     * @return              The express token data
     */
    decodeExpressToken(expressToken: string): ExpressTokenData {
        const expressTokenData: ExpressTokenData = this._jwtService.decodeToken(expressToken);
        return expressTokenData;
    }

    /**
     * Get the express contact
     * @param workspaceId  The contact workspace ID
     * @param contactId    The contact ID
     * @param expressToken The express contact
     */
    loadExpressContact(workspaceId: string, contactId: string, expressToken: string): void {
        const fields: string = 'contactName,avatarUrl,phoneCode,phoneNumber,email';
        this._expressTokenService.getExpressContact(workspaceId, contactId, expressToken, fields).subscribe( (res: HttpResponse) => {
            this.contact = res.data;
            this.loadVcardData();
        });
    }

    /**
     * Load the vcard data
     */
    loadVcardData(): void {
        if(!! this.contact) {
            this.vcardData = {
                contactName: this.contact.contactName,
                email: this.contact.email,
                phoneNumber: this.contact.phoneNumber
            }
        }
    }
}
