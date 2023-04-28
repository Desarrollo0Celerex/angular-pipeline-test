import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmApplyCancellationModule } from '@components/modal-confirm-apply-cancellation/modal-confirm-apply-cancellation.module';
import { ModalConfirmDeletePolicyByCaptureErrorModule } from '@components/modal-confirm-delete-policy-by-capture-error/modal-confirm-delete-policy-by-capture-error.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { PolicyService } from '@services/policy.service';
import { PolicyCancellationReasonService } from '@services/policy-cancellation-reason.service';

import { CancelPolicyRoutingModule } from './cancel-policy-routing.module';
import { CancelPolicyPage } from './cancel-policy.page';
import { CancelPolicyService } from './cancel-policy.service';

@NgModule({
  declarations: [CancelPolicyPage],
  imports: [
    ContainerContactDetailsModule,
    CommonModule,
    CancelPolicyRoutingModule,
    FormsModule,
    LoadingContentModule,
    ModalConfirmApplyCancellationModule,
    ModalConfirmDeletePolicyByCaptureErrorModule,
    ModalSelectEvidenceModule,
    ModalShowPolicyModule,
    ReactiveFormsModule
  ],
  providers: [CancelPolicyService, PolicyService, PolicyCancellationReasonService]
})
export class CancelPolicyModule { }
