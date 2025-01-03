import { Component, Input } from '@angular/core';
import { QRCodeErrorCorrectionLevel } from 'qrcode';
import { QRCodeElementType } from 'angularx-qrcode';

@Component({
    selector: 'agt-qrcode',
    templateUrl: './qrcode.component.html',
    styles: [],
})
export class QrCodeComponent {
    @Input() link = '';
    @Input() QRWidth = 150;
    @Input() loadingHeight = 200;
    errorCorrectionLevel: QRCodeErrorCorrectionLevel = 'H';
    elementType: QRCodeElementType = 'url';
}
