import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardInsuranceModule } from '@components/card-insurance/card-insurance.module';
import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { ContactService } from '@services/contact.service';
import { InsuranceService } from '@services/insurance.service';

import { ContainerInsurancesMostUsedComponent } from './container-insurances-most-used.component';

@NgModule({
  declarations: [
    ContainerInsurancesMostUsedComponent
  ],
  exports: [
    ContainerInsurancesMostUsedComponent
  ],
  imports: [
    CardInsuranceModule,
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
    ContactService,
    InsuranceService
  ]
})
export class ContainerInsurancesMostUsedModule { }
