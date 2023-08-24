import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertScannerFailedModule } from '@components/alert-scanner-failed/alert-scanner-failed.module';
import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalBasePolicyDataLoadedModule } from '@components/modal-base-policy-data-loaded/modal-base-policy-data-loaded.module';
import { ModalInvalidExpiredPolicyModule } from '@components/modal-invalid-expired-policy/modal-invalid-expired-policy.module';
import { ModalInvalidHistoryPolicyModule } from '@components/modal-invalid-history-policy/modal-invalid-history-policy.module';
import { ModalNotifyPolicyAlreadyExistsModule } from '@components/modal-notify-policy-already-exists/modal-notify-policy-already-exists.module';
import { ModalPolicyAmountsDifferentModule } from '@components/modal-policy-amounts-different/modal-policy-amounts-different.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { ModalScanningPolicySuccessModule } from '@components/modal-scanning-policy-success/modal-scanning-policy-success.module';
import { ModalScanningPolicyFailedModule } from '@components/modal-scanning-policy-failed/modal-scanning-policy-failed.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { AtomScannService } from '@services/atom-scann.service';
import { ContactService } from '@core/services/contact/contact.service';
import { CurrencyService } from '@services/currency.service';
import { GendersService } from '@services/genders.service';
import { PartnerService } from '@services/partner.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';
import { ScannerLogService } from '@services/scanner-log.service';

import { CompletePolicyRoutingModule } from './complete-policy-routing.module';
import { CompletePolicyPage } from './complete-policy.page';
import { CompletePolicyService } from './complete-policy.service';
import { PoliciesModule } from '@policies/policies.module';

@NgModule({
    declarations: [CompletePolicyPage],
    imports: [
        AlertScannerFailedModule,
        ContainerContactDetailsModule,
        CommonModule,
        CompletePolicyRoutingModule,
        DropdownSelectPhoneCodeModule,
        FormsModule,
        LoadingContentModule,
        ModalBasePolicyDataLoadedModule,
        ModalInvalidExpiredPolicyModule,
        ModalInvalidHistoryPolicyModule,
        ModalNotifyPolicyAlreadyExistsModule,
        ModalPolicyAmountsDifferentModule,
        ModalSelectFileModule,
        ModalScanningPolicySuccessModule,
        ModalScanningPolicyFailedModule,
        ModalShowPolicyModule,
        PoliciesModule,
        ReactiveFormsModule,
    ],
    providers: [
        AtomScannService,
        CompletePolicyService,
        ContactService,
        CurrencyService,
        DatePipe,
        GendersService,
        PartnerService,
        PaymentMethodService,
        PaymentPlanService,
        PolicyService,
        PolicyInsuredService,
        ScannerLogService,
    ],
})
export class CompletePolicyModule {}
