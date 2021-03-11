import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardContactModule } from '@components/card-contact/card-contact.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmActionModule } from '@components/modal-confirm-action/modal-confirm-action.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { PolicyService } from '@services/policy.service';
import { PolicyCancellationReasonService } from '@services/policy-cancellation-reason.service';

import { CancelPolicyRoutingModule } from './cancel-policy-routing.module';
import { CancelPolicyPage } from './cancel-policy.page';
import { CancelPolicyService } from './cancel-policy.service';

@NgModule({
  declarations: [CancelPolicyPage],
  imports: [
    CardContactModule,
    CommonModule,
    CancelPolicyRoutingModule,
    FormsModule,
    LoadingContentModule,
    ModalConfirmActionModule,
    ModalSelectFileModule,
    ModalShowPolicyModule,
    ReactiveFormsModule
  ],
  providers: [CancelPolicyService, PolicyService, PolicyCancellationReasonService]
})
export class CancelPolicyModule { }
