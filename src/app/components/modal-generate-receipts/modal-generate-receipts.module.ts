import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';

import { ModalGenerateReceiptsComponent } from './modal-generate-receipts.component';
import { ModalGenerateReceiptsService } from './modal-generate-receipts.service';

@NgModule({
  declarations: [ModalGenerateReceiptsComponent],
  exports: [ModalGenerateReceiptsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ModalGenerateReceiptsService, PaymentMethodService, PaymentPlanService]
})
export class ModalGenerateReceiptsModule { }
