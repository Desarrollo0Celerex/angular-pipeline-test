import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadService } from '@services/lead.service';

import { CardKpiTotalActiveLeadsComponent } from './card-kpi-total-active-leads.component';

@NgModule({
  declarations: [
    CardKpiTotalActiveLeadsComponent
  ],
  exports: [
      CardKpiTotalActiveLeadsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      LeadService
  ]
})
export class CardKpiTotalActiveLeadsModule { }
