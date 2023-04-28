import { Injectable } from '@angular/core';

import { Contact } from '@interfaces/contact.interface';
import { ExpressTokenData } from '@interfaces/express-token-data.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { WorkspaceUser } from '@interfaces/workspace-user.interface';
import { ContactService } from '@services/contact.service';
import { ExpressTokenService } from '@services/express-token.service';
import { AuthService } from '@services/auth.service';
import { JwtService } from '@services/jwt.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

@Injectable()
export class ButtonSendWhatsappService {
    contact: Contact | null = null;
    user: WorkspaceUser | null = null;

    constructor(
        private _authService: AuthService,
        private _contactService: ContactService,
        private _expressTokenService: ExpressTokenService,
        private _jwtService: JwtService,
        private _workspaceUserService: WorkspaceUserService
    ) { }

    /**
     * Load the contact
     * @param contactId    The contact ID
     * @param expressToken The express token
     */
    loadContact(contactId: string): void {
        this.contact = null;
        const fields: string = 'phoneCode,phoneNumber,shortName,workspaceName';
        this._contactService.getContact(contactId, fields).subscribe( (res: HttpResponse) => {
            this.contact = res.data;
        })
    }

    /**
     * Load the express contact
     * @param expressToken The express token
     */
    loadExpressContact(expressToken: string): void {
        this.contact = null;
        const fields: string = 'phoneCode,phoneNumber,shortName,workspaceName';
        const expressTokenData: ExpressTokenData = this._decodeExpressToken(expressToken);
        this._expressTokenService.getExpressContact(expressTokenData.workspaceId, expressTokenData.contactId, expressToken, fields).subscribe( (res: HttpResponse) => {
            this.contact = res.data;
        });
    }

    /**
     * Load de user
     */
    loadUser(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName';
        this._workspaceUserService.getWorkspaceUser(userId, fields).subscribe( (res: HttpResponse) => {
            this.user = res.data;
        })
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
