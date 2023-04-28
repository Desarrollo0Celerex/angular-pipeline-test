import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
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
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardReportActivePoliciesModule { }
