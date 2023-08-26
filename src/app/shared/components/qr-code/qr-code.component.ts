import { Component, Input } from '@angular/core';
import {
    NgxQrcodeElementTypes,
    NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';

@Component({
    selector: 'agt-qr-code',
    templateUrl: './qr-code.component.html',
    styles: [],
})
export class QrCodeComponent {
    @Input() link = '';
    @Input() height = 200;
    ngxCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    ngxElementType = NgxQrcodeElementTypes.URL;
}
