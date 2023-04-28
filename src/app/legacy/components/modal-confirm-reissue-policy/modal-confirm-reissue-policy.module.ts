import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { ModalConfirmReissuePolicyComponent } from './modal-confirm-reissue-policy.component';
import { ModalConfirmReissuePolicyService } from './modal-confirm-reissue-policy.service';

@NgModule({
  declarations: [ModalConfirmReissuePolicyComponent],
  exports: [ModalConfirmReissuePolicyComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalConfirmReissuePolicyService, PolicyService]
})
export class ModalConfirmReissuePolicyModule { }
