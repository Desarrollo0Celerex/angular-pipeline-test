import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalPolicyService } from '@services/external-policy.service';

import { ModalShowExternalPolicyDetailsComponent } from './modal-show-external-policy-details.component';

@NgModule({
  declarations: [
    ModalShowExternalPolicyDetailsComponent
  ],
  exports: [
      ModalShowExternalPolicyDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      ExternalPolicyService
  ]
})
export class ModalShowExternalPolicyDetailsModule { }
