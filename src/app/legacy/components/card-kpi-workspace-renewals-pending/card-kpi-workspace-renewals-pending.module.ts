import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiRangeModule } from '@components/card-kpi-range/card-kpi-range.module';
import { PolicyService } from '@services/policy.service';

import { CardKpiWorkspaceRenewalsPendingComponent } from './card-kpi-workspace-renewals-pending.component';
import { CardKpiWorkspaceRenewalsPendingService } from './card-kpi-workspace-renewals-pending.service';

@NgModule({
  declarations: [
    CardKpiWorkspaceRenewalsPendingComponent
  ],
  exports: [
    CardKpiWorkspaceRenewalsPendingComponent
  ],
  imports: [
    CardKpiRangeModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspaceRenewalsPendingService,
    PolicyService
  ]
})
export class CardKpiWorkspaceRenewalsPendingModule { }
