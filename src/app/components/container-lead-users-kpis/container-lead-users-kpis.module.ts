import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiTwoModule } from '@components/card-kpi-two/card-kpi-two.module';
import { QuotationService } from '@services/quotation.service';

import { ContainerLeadUsersKpisComponent } from './container-lead-users-kpis.component';

@NgModule({
  declarations: [
    ContainerLeadUsersKpisComponent
  ],
  exports: [
      ContainerLeadUsersKpisComponent
  ],
  imports: [
    CommonModule,
    CardKpiTwoModule
  ],
  providers: [
      QuotationService
  ]
})
export class ContainerLeadUsersKpisModule { }
