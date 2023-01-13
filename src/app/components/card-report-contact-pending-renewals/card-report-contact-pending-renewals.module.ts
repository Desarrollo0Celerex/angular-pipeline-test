import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PolicyService } from '@services/policy.service';

import { CardReportContactPendingRenewalsComponent } from './card-report-contact-pending-renewals.component';

@NgModule({
  declarations: [
    CardReportContactPendingRenewalsComponent
  ],
  exports: [
    CardReportContactPendingRenewalsComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
    PolicyService
  ]
})
export class CardReportContactPendingRenewalsModule { }
