import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ExpressTokenService } from '@services/express-token.service';

import { QrcodeTransferContactComponent } from './qrcode-transfer-contact.component';
import { QrcodeTransferContactService } from './qrcode-transfer-contact.service';

@NgModule({
  declarations: [QrcodeTransferContactComponent],
  exports: [QrcodeTransferContactComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ],
  providers: [ExpressTokenService, QrcodeTransferContactService]
})
export class QrcodeTransferContactModule { }
