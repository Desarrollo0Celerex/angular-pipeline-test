import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { ModalConfirmLinkPolicyComponent } from './modal-confirm-link-policy.component';

@NgModule({
  declarations: [
    ModalConfirmLinkPolicyComponent
  ],
  exports: [
      ModalConfirmLinkPolicyComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class ModalConfirmLinkPolicyModule { }
