import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';

import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterEventService } from '@services/sinister-event.service';
import { SinisterEventTypeService } from '@services/sinister-event-type.service';
import { SinisterResolutionService } from '@services/sinister-resolution.service';

import { ContainerReportEventComponent } from './container-report-event.component';
import { ContainerReportEventService } from './container-report-event.service';

@NgModule({
  declarations: [ContainerReportEventComponent],
  exports: [ContainerReportEventComponent],
  imports: [
    CommonModule,
    DropdownSelectPhoneCodeModule,
    FormsModule,
    ModalSelectEvidenceModule,
    ReactiveFormsModule
  ],
  providers: [
    ContainerReportEventService,
    CurrencyService, 
    PaymentMethodService,
    SinisterService, 
    SinisterEventService, 
    SinisterEventTypeService,
    SinisterResolutionService
  ]
})
export class ContainerReportEventModule { }
