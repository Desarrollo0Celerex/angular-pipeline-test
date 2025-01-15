import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-qrcode',
    templateUrl: './qrcode.component.html',
    styles: [],
    standalone: false,
})
export class QrCodeComponent {
    @Input() link = '';
    @Input() QRWidth = 150;
    @Input() loadingHeight = 200;
}
