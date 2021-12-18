import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { CardKpiTotalLastRenewalsComponent } from './card-kpi-total-last-renewals.component';

@NgModule({
  declarations: [
    CardKpiTotalLastRenewalsComponent
  ],
  exports: [
      CardKpiTotalLastRenewalsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardKpiTotalLastRenewalsModule { }
