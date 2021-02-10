import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InsuranceTypeService } from '@services/insurance-type.service';
import { QuotationService } from '@services/quotation.service';

import { ModalCreateQuotationComponent } from './modal-create-quotation.component';
import { ModalCreateQuotationService } from './modal-create-quotation.service';

@NgModule({
  declarations: [ModalCreateQuotationComponent],
  exports: [ModalCreateQuotationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [InsuranceTypeService, ModalCreateQuotationService, QuotationService]
})
export class ModalCreateQuotationModule { }
