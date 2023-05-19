import { Component, Input } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'agt-qr',
  templateUrl: './qr.component.html',
  styles: [
  ]
})
export class QrComponent {
    @Input() url: string = '';
    correctionLevel: any = NgxQrcodeErrorCorrectionLevels.HIGH;
    elementType: any = NgxQrcodeElementTypes.URL;

}
