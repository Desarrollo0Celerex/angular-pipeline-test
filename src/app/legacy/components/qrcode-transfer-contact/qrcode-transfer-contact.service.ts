import { Injectable } from '@angular/core';
import {
    NgxQrcodeErrorCorrectionLevels,
    NgxQrcodeElementTypes,
} from '@techiediaries/ngx-qrcode';

import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ExpressTokenService } from '@services/express-token.service';

@Injectable()
export class QrcodeTransferContactService {
    contactUrl: string;
    correctionLevel: any;
    elementType: any;

    constructor(private _expressTokenService: ExpressTokenService) {
        this.elementType = NgxQrcodeElementTypes.URL;
        this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
        this.contactUrl = '';
    }

    /**
     * Create a QR code to transfer contact.
     * @param contactId The contact ID
     */
    createQrcode(contactId: string): void {
        this._expressTokenService
            .getExpressToken(contactId)
            .subscribe((res: HttpResponse) => {
                this.contactUrl = `${
                    environment.appAgenthosUrl
                }/${ROUTES_NAME.expressContact(res.data)}`;
            });
    }
}
