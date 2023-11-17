import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '@services/policy.service';

import { AllPoliciesRoutingModule } from './all-policies-routing.module';
import { AllPoliciesPage } from './all-policies.page';

@NgModule({
    declarations: [AllPoliciesPage],
    imports: [CommonModule, AllPoliciesRoutingModule],
    providers: [PolicyService],
})
export class AllPoliciesModule {}
