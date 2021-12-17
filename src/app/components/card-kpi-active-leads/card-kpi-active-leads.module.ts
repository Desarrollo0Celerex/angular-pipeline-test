import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadService } from '@services/lead.service';

import { CardKpiActiveLeadsComponent } from './card-kpi-active-leads.component';

@NgModule({
  declarations: [
    CardKpiActiveLeadsComponent
  ],
  exports: [
      CardKpiActiveLeadsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      LeadService
  ]
})
export class CardKpiActiveLeadsModule { }
