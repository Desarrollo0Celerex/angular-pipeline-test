import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiPercentageModule } from '@components/card-kpi-percentage/card-kpi-percentage.module';
import { QuotationService } from '@services/quotation.service';

import { CardKpiWorkspaceQuotationsClosedComponent } from './card-kpi-workspace-quotations-closed.component';
import { CardKpiWorkspaceQuotationsClosedService } from './card-kpi-workspace-quotations-closed.service';

@NgModule({
  declarations: [
    CardKpiWorkspaceQuotationsClosedComponent
  ],
  exports: [
    CardKpiWorkspaceQuotationsClosedComponent
  ],
  imports: [
    CardKpiPercentageModule,
    CommonModule
  ],
  providers: [
    CardKpiWorkspaceQuotationsClosedService,
    QuotationService
  ]
})
export class CardKpiWorkspaceQuotationsClosedModule { }
