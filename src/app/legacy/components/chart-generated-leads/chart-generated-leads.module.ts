import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { LeadService } from '@services/lead.service';

import { ChartGeneratedLeadsComponent } from './chart-generated-leads.component';

@NgModule({
  declarations: [
    ChartGeneratedLeadsComponent
  ],
  exports: [
      ChartGeneratedLeadsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      LeadService
  ]
})
export class ChartGeneratedLeadsModule { }
