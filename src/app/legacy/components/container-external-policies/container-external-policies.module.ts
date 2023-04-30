import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardExternalPolicyModule } from '@components/card-external-policy/card-external-policy.module';
import { ModalConfirmValidateExternalPolicyModule } from '@components/modal-confirm-validate-external-policy/modal-confirm-validate-external-policy.module';
import { ModalConfirmUpdateExternalPolicyModule } from '@components/modal-confirm-update-external-policy/modal-confirm-update-external-policy.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ExternalPolicyService } from '@services/external-policy.service';
import { ModalShowExternalPolicyDetailsModule } from '@components/modal-show-external-policy-details/modal-show-external-policy-details.module';
import { SharedModule } from '@shared/shared.module';

import { ContainerExternalPoliciesComponent } from './container-external-policies.component';

@NgModule({
    declarations: [ContainerExternalPoliciesComponent],
    exports: [ContainerExternalPoliciesComponent],
    imports: [
        CommonModule,
        SharedModule,
        CardExternalPolicyModule,
        ModalConfirmValidateExternalPolicyModule,
        ModalConfirmUpdateExternalPolicyModule,
        ModalShowPolicyFileModule,
        ModalShowExternalPolicyDetailsModule,
    ],
    providers: [ExternalPolicyService],
})
export class ContainerExternalPoliciesModule {}
