import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrComponent } from './qr.component';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [
    QrComponent
  ],
  exports: [QrComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class QrModule { }
