import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiRangeModule } from '@components/card-kpi-range/card-kpi-range.module';
import { LeadService } from '@services/lead.service';

import { CardKpiWorkspaceLeadsConvertedComponent } from './card-kpi-workspace-leads-converted.component';
import { CardKpiWorkspaceLeadsConvertedService } from './card-kpi-workspace-leads-converted.service';

@NgModule({
  declarations: [
    CardKpiWorkspaceLeadsConvertedComponent
  ],
  exports: [
    CardKpiWorkspaceLeadsConvertedComponent
  ],
  imports: [
    CardKpiRangeModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspaceLeadsConvertedService,
    LeadService
  ]
})
export class CardKpiWorkspaceLeadsConvertedModule { }
