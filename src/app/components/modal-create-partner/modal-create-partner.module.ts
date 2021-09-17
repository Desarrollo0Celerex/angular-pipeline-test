import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PartnerService } from '@services/partner.service';

import { ModalCreatePartnerComponent } from './modal-create-partner.component';

@NgModule({
  declarations: [
    ModalCreatePartnerComponent
  ],
  exports: [
      ModalCreatePartnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      PartnerService
  ]
})
export class ModalCreatePartnerModule { }
