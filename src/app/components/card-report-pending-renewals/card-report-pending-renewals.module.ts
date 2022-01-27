import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardReportPendingRenewalsModule { }
