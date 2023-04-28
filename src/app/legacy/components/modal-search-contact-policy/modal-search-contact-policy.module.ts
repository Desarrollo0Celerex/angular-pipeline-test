import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalSelectPolicyModule } from '@components/modal-select-policy/modal-select-policy.module';
import { PolicyService } from '@services/policy.service';

import { ModalSearchContactPolicyComponent } from './modal-search-contact-policy.component';
import { ModalSearchContactPolicyService } from './modal-search-contact-policy.service';

@NgModule({
  declarations: [ModalSearchContactPolicyComponent],
  exports: [ModalSearchContactPolicyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalSelectPolicyModule,
    ReactiveFormsModule
  ],
  providers: [ModalSearchContactPolicyService, PolicyService]
})
export class ModalSearchContactPolicyModule { }
