import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadService } from '@services/lead.service';

import { CardKpiTotalLeadsComponent } from './card-kpi-total-leads.component';

@NgModule({
  declarations: [
    CardKpiTotalLeadsComponent
  ],
  exports: [
      CardKpiTotalLeadsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      LeadService
  ]
})
export class CardKpiTotalLeadsModule { }
