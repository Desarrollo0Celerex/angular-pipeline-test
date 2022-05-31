import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PolicyService } from '@services/policy.service';

import { CardGroupRenewalReportsComponent } from './card-group-renewal-reports.component';

@NgModule({
  declarations: [
    CardGroupRenewalReportsComponent
  ],
  exports: [
      CardGroupRenewalReportsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardGroupRenewalReportsModule { }
