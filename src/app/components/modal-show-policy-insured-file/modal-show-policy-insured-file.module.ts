import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ModalShowPolicyInsuredFileComponent } from './modal-show-policy-insured-file.component';

@NgModule({
  declarations: [
    ModalShowPolicyInsuredFileComponent
  ],
  exports: [
    ModalShowPolicyInsuredFileComponent
  ],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class ModalShowPolicyInsuredFileModule { }
