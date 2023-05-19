import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiRangeModule } from '@components/card-kpi-range/card-kpi-range.module';
import { PolicyService } from '@services/policy.service';

import { CardKpiWorkspacePoliciesCancelledComponent } from './card-kpi-workspace-policies-cancelled.component';
import { CardKpiWorkspacePoliciesCancelledService } from './card-kpi-workspace-policies-cancelled.service';

@NgModule({
  declarations: [
    CardKpiWorkspacePoliciesCancelledComponent
  ],
  exports: [
    CardKpiWorkspacePoliciesCancelledComponent
  ],
  imports: [
    CardKpiRangeModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspacePoliciesCancelledService,
    PolicyService
  ]
})
export class CardKpiWorkspacePoliciesCancelledModule { }
