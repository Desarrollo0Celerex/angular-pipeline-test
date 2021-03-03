import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { PolicyService } from '@services/policy.service';

import { ModalShowPolicyComponent } from './modal-show-policy.component';
import { ModalShowPolicyService } from './modal-show-policy.service';

@NgModule({
  declarations: [ModalShowPolicyComponent],
  exports: [ModalShowPolicyComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ],
  providers: [ModalShowPolicyService, PolicyService]
})
export class ModalShowPolicyModule { }
