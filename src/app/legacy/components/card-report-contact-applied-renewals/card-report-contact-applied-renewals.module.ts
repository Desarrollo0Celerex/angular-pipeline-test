import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module'
import { PolicyService } from '@services/policy.service';

import { CardReportContactAppliedRenewalsComponent } from './card-report-contact-applied-renewals.component';

@NgModule({
  declarations: [
    CardReportContactAppliedRenewalsComponent
  ],
  exports: [
    CardReportContactAppliedRenewalsComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
    PolicyService
  ]
})
export class CardReportContactAppliedRenewalsModule { }
