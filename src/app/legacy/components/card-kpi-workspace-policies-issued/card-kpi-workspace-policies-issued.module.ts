import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiRangeModule } from '@components/card-kpi-range/card-kpi-range.module';
import { PolicyService } from '@services/policy.service';

import { CardKpiWorkspacePoliciesIssuedComponent } from './card-kpi-workspace-policies-issued.component';
import { CardKpiWorkspacePoliciesIssuedService } from './card-kpi-workspace-policies-issued.service';

@NgModule({
  declarations: [
    CardKpiWorkspacePoliciesIssuedComponent
  ],
  exports: [
    CardKpiWorkspacePoliciesIssuedComponent
  ],
  imports: [
    CardKpiRangeModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspacePoliciesIssuedService,
    PolicyService
  ]
})
export class CardKpiWorkspacePoliciesIssuedModule { }
