import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiOneModule } from '@components/card-kpi-one/card-kpi-one.module';
import { ContactSourceService } from '@services/contact-source.service';
import { ContactSourceTypeService } from '@services/contact-source-type.service';
import { LeadService } from '@services/lead.service';

import { ContainerLeadChannelsKpisComponent } from './container-lead-channels-kpis.component';

@NgModule({
  declarations: [
    ContainerLeadChannelsKpisComponent
  ],
  exports: [
     ContainerLeadChannelsKpisComponent,
 ],
  imports: [
    CommonModule,
    CardKpiOneModule
 ],
 providers: [
     ContactSourceService,
     ContactSourceTypeService,
     LeadService
 ]
})
export class ContainerLeadChannelsKpisModule { }
