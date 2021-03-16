import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PolicyService } from '@services/policy.service';

import { ModalConfirmRenewPolicyComponent } from './modal-confirm-renew-policy.component';
import { ModalConfirmRenewPolicyService } from './modal-confirm-renew-policy.service';

@NgModule({
  declarations: [ModalConfirmRenewPolicyComponent],
  exports: [ModalConfirmRenewPolicyComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [ModalConfirmRenewPolicyService, PolicyService]
})
export class ModalConfirmRenewPolicyModule { }
