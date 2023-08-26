import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmDeleteInsuredModule } from '@components/modal-confirm-delete-insured/modal-confirm-delete-insured.module';
import { ModalPolicyAmountsDifferentModule } from '@components/modal-policy-amounts-different/modal-policy-amounts-different.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';

import { UpdateCompletePolicyRoutingModule } from './update-complete-policy-routing.module';
import { UpdateCompletePolicyPage } from './update-complete-policy.page';

import { CurrencyService } from '@services/currency.service';
import { GendersService } from '@services/genders.service';
import { InsurerService } from '@services/insurer.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceGroupService } from '@services/insurance-group.service';
import { InsuranceTypeService } from '@services/insurance-type.service';
import { PartnerService } from '@services/partner.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';
import { SellerCommissionSuggestionsModule } from '@seller-commission-suggestions/seller-commission-suggestions.module';

@NgModule({
    declarations: [UpdateCompletePolicyPage],
    imports: [
        CommonModule,
        ContainerContactDetailsModule,
        DropdownSelectPhoneCodeModule,
        FormsModule,
        LoadingContentModule,
        ModalConfirmDeleteInsuredModule,
        ModalPolicyAmountsDifferentModule,
        ModalSelectFileModule,
        ModalShowPolicyModule,
        ModalShowPolicyFileModule,
        ReactiveFormsModule,
        SellerCommissionSuggestionsModule,
        UpdateCompletePolicyRoutingModule,
    ],
    providers: [
        CurrencyService,
        GendersService,
        InsurerService,
        InsuranceService,
        InsuranceGroupService,
        InsuranceTypeService,
        DatePipe,
        PartnerService,
        PaymentMethodService,
        PaymentPlanService,
        PolicyService,
        PolicyInsuredService,
    ],
})
export class UpdateCompletePolicyModule {}
