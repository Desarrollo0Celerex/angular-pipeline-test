import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiPercentageModule } from '@components/card-kpi-percentage/card-kpi-percentage.module';
import { PolicyService } from '@services/policy.service';

import { CardKpiWorkspacePoliciesRenewedComponent } from './card-kpi-workspace-policies-renewed.component';
import { CardKpiWorkspacePoliciesRenewedService } from './card-kpi-workspace-policies-renewed.service';

@NgModule({
  declarations: [
    CardKpiWorkspacePoliciesRenewedComponent
  ],
  exports: [
    CardKpiWorkspacePoliciesRenewedComponent
  ],
  imports: [
    CardKpiPercentageModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspacePoliciesRenewedService,
    PolicyService
  ]
})
export class CardKpiWorkspacePoliciesRenewedModule { }
