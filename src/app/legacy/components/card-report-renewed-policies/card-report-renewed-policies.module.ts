import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PolicyService } from '@services/policy.service';

import { CardReportRenewedPoliciesComponent } from './card-report-renewed-policies.component';

@NgModule({
  declarations: [
    CardReportRenewedPoliciesComponent
  ],
  exports: [
      CardReportRenewedPoliciesComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardReportRenewedPoliciesModule { }
