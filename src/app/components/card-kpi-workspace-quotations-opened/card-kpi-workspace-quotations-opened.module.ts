import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiRangeModule } from '@components/card-kpi-range/card-kpi-range.module';
import { QuotationService } from '@services/quotation.service';

import { CardKpiWorkspaceQuotationsOpenedComponent } from './card-kpi-workspace-quotations-opened.component';
import { CardKpiWorkspaceQuotationsOpenedService } from './card-kpi-workspace-quotations-opened.service';

@NgModule({
  declarations: [
    CardKpiWorkspaceQuotationsOpenedComponent
  ],
  exports: [
    CardKpiWorkspaceQuotationsOpenedComponent
  ],
  imports: [
    CardKpiRangeModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspaceQuotationsOpenedService,
    QuotationService
  ]
})
export class CardKpiWorkspaceQuotationsOpenedModule { }
