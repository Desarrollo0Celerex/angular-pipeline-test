import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { ModalShowPolicyDetailsComponent } from './modal-show-policy-details.component';
import { ModalShowPolicyDetailsService } from './modal-show-policy-details.service';

@NgModule({
  declarations: [ModalShowPolicyDetailsComponent],
  exports: [ModalShowPolicyDetailsComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalShowPolicyDetailsService, PolicyService]
})
export class ModalShowPolicyDetailsModule { }
