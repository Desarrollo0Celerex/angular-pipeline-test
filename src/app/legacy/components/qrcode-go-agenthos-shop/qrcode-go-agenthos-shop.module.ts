import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { QrcodeGoAgenthosShopComponent } from './qrcode-go-agenthos-shop.component';

@NgModule({
  declarations: [QrcodeGoAgenthosShopComponent],
  exports: [QrcodeGoAgenthosShopComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class QrcodeGoAgenthosShopModule { }
