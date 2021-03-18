import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { PolicyService } from '@services/policy.service';

import { ModalConfirmRenewPolicyComponent } from './modal-confirm-renew-policy.component';
import { ModalConfirmRenewPolicyService } from './modal-confirm-renew-policy.service';

@NgModule({
  declarations: [ModalConfirmRenewPolicyComponent],
  exports: [ModalConfirmRenewPolicyComponent],
  imports: [
    CommonModule,
    ModalSelectContactTypeModule,
    RouterModule
  ],
  providers: [ModalConfirmRenewPolicyService, PolicyService]
})
export class ModalConfirmRenewPolicyModule { }
