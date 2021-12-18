import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { CardKpiRenewalsComponent } from './card-kpi-renewals.component';

@NgModule({
  declarations: [
    CardKpiRenewalsComponent
  ],
  exports: [
      CardKpiRenewalsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class CardKpiRenewalsModule { }
