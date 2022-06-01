import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PolicyService } from '@services/policy.service';

import { CardContactRenewalReportsComponent } from './card-contact-renewal-reports.component';

@NgModule({
  declarations: [
    CardContactRenewalReportsComponent
  ],
  exports: [
      CardContactRenewalReportsComponent
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
export class CardContactRenewalReportsModule { }
