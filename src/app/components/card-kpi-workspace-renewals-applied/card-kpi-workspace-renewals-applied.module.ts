import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiPercentageModule } from '@components/card-kpi-percentage/card-kpi-percentage.module';
import { PolicyService } from '@services/policy.service';

import { CardKpiWorkspaceRenewalsAppliedComponent } from './card-kpi-workspace-renewals-applied.component';

@NgModule({
  declarations: [
    CardKpiWorkspaceRenewalsAppliedComponent
  ],
  exports: [
    CardKpiWorkspaceRenewalsAppliedComponent
  ],
  imports: [
    CardKpiPercentageModule,
    CommonModule
  ],
  providers: [
    PolicyService
  ]
})
export class CardKpiWorkspaceRenewalsAppliedModule { }
