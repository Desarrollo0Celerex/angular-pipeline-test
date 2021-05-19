import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalSelectPolicyModule } from '@components/modal-select-policy/modal-select-policy.module';
import { PolicyService } from '@services/policy.service';

import { ModalSearchPolicyComponent } from './modal-search-policy.component';
import { ModalSearchPolicyService } from './modal-search-policy.service';

@NgModule({
  declarations: [ModalSearchPolicyComponent],
  exports: [ModalSearchPolicyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalSelectPolicyModule,
    ReactiveFormsModule
  ],
  providers: [ModalSearchPolicyService, PolicyService]
})
export class ModalSearchPolicyModule { }
