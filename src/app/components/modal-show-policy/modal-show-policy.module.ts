import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ModalShowPolicyComponent } from './modal-show-policy.component';

@NgModule({
  declarations: [ModalShowPolicyComponent],
  exports: [ModalShowPolicyComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class ModalShowPolicyModule { }
