import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PolicyService } from '@services/policy.service';

import { CardReportPendingRenewalsComponent } from './card-report-pending-renewals.component';

@NgModule({
  declarations: [
    CardReportPendingRenewalsComponent
  ],
  exports: [
      CardReportPendingRenewalsComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardReportPendingRenewalsModule { }
