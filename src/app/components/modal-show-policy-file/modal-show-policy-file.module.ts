import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { PolicyService } from '@services/policy.service';

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
  ],
  providers: [
      PolicyService
  ]
})
export class ModalShowPolicyFileModule { }
