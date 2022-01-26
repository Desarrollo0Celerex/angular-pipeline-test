import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { CardReportActivePoliciesComponent } from './card-report-active-policies.component';

@NgModule({
  declarations: [
    CardReportActivePoliciesComponent
  ],
  exports: [
      CardReportActivePoliciesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardReportActivePoliciesModule { }
