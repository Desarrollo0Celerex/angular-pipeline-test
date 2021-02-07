import { Injectable } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ExpressTokenService } from '@services/express-token.service';

@Injectable()
export class QrcodeTransferContactService {
    public contactUrl: string;
    public correctionLevel: any;
    public elementType: any;

    constructor(
        private _expressTokenService: ExpressTokenService
    ) {
        this.elementType = NgxQrcodeElementTypes.URL;
        this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
        this.contactUrl = '';
    }

    /**
     * Create a QR code to transfer contact.
     * @param contactId The contact ID
     */
    public createQrcode(contactId: string): void {
        this._expressTokenService.getExpressToken(contactId).subscribe( (res: HttpResponse) => {
            this.contactUrl = environment.appAgenthosUrl + '/express/contact/' + res.data;
        })
    }
}
