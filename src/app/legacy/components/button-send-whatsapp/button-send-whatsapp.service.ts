import { Injectable } from '@angular/core';

import { Contact } from '@core/interfaces/contact.interface';
import { ExpressTokenData } from '@interfaces/express-token-data.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { ExpressTokenService } from '@services/express-token.service';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { JwtService } from '@core/services/jwt/jwt.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';

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
    ) {}

    /**
     * Load the contact
     * @param contactId    The contact ID
     * @param expressToken The express token
     */
    loadContact(contactId: string): void {
        this.contact = null;
        const fields: string = 'phoneCode,phoneNumber,shortName,workspaceName';
        this._contactService
            .getContact(contactId, fields)
            .subscribe((res: Contact) => {
                this.contact = res;
            });
    }

    /**
     * Load the express contact
     * @param expressToken The express token
     */
    loadExpressContact(expressToken: string): void {
        this.contact = null;
        const fields: string = 'phoneCode,phoneNumber,shortName,workspaceName';
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
                this.contact = res.data;
            });
    }

    /**
     * Load de user
     */
    loadUser(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName';
        this._workspaceUserService
            .getLoggedWorkspaceUser(fields)
            .subscribe((res: WorkspaceUser) => {
                this.user = res;
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
