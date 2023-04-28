import { Component } from '@angular/core';
import { NgxQrcodeErrorCorrectionLevels, NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'agt-qrcode-go-agenthos-shop',
  templateUrl: './qrcode-go-agenthos-shop.component.html',
  styles: [
  ]
})
export class QrcodeGoAgenthosShopComponent {
    correctionLevel: any;
    elementType: any;
    url: string;

    constructor() {
        this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
        this.elementType = NgxQrcodeElementTypes.URL;
        this.url = 'https://agenthos.com';
    }

}
