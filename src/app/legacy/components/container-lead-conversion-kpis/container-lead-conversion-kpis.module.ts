import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiOneModule } from '@components/card-kpi-one/card-kpi-one.module';
import { QuotationService } from '@services/quotation.service';

import { ContainerLeadConversionKpisComponent } from './container-lead-conversion-kpis.component';

@NgModule({
  declarations: [
    ContainerLeadConversionKpisComponent
  ],
  exports: [
      ContainerLeadConversionKpisComponent
  ],
  imports: [
    CommonModule,
    CardKpiOneModule
  ],
  providers: [
      QuotationService
  ]
})
export class ContainerLeadConversionKpisModule { }
