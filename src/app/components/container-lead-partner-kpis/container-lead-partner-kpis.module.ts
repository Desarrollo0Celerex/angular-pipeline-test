import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiTwoModule } from '@components/card-kpi-two/card-kpi-two.module';
import { QuotationService } from '@services/quotation.service';

import { ContainerLeadPartnerKpisComponent } from './container-lead-partner-kpis.component';

@NgModule({
  declarations: [
    ContainerLeadPartnerKpisComponent
  ],
  exports: [
      ContainerLeadPartnerKpisComponent
  ],
  imports: [
    CommonModule,
    CardKpiTwoModule
  ],
  providers: [
      QuotationService
  ]
})
export class ContainerLeadPartnerKpisModule { }
