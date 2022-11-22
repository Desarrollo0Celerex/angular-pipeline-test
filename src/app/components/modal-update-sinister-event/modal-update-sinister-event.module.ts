import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';
import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { SinisterEventService } from '@services/sinister-event.service';
import { SinisterResolutionService } from '@services/sinister-resolution.service';

import { ModalUpdateSinisterEventComponent } from './modal-update-sinister-event.component';
import { ModalUpdateSinisterEventService } from './modal-update-sinister-event.service';

@NgModule({
  declarations: [ModalUpdateSinisterEventComponent],
  exports: [ModalUpdateSinisterEventComponent],
  imports: [
    CommonModule,
    DropdownSelectPhoneCodeModule,
    LoadingContentModule,
    FormsModule,
    ModalSelectEvidenceModule,
    ReactiveFormsModule
  ],
  providers: [
    CurrencyService,
    ModalUpdateSinisterEventService, 
    PaymentMethodService,
    SinisterEventService,
    SinisterResolutionService
  ]
})
export class ModalUpdateSinisterEventModule { }
