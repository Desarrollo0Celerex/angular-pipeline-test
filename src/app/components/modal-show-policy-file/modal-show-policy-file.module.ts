import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ModalShowPolicyFileComponent } from './modal-show-policy-file.component';

@NgModule({
  declarations: [
    ModalShowPolicyFileComponent
  ],
  exports: [
      ModalShowPolicyFileComponent
  ],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class ModalShowPolicyFileModule { }
