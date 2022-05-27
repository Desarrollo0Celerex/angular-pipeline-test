import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PartnerService } from '@services/partner.service';

import { ModalUpdatePartnerComponent } from './modal-update-partner.component';

@NgModule({
  declarations: [
    ModalUpdatePartnerComponent
  ],
  exports: [
      ModalUpdatePartnerComponent
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
export class ModalUpdatePartnerModule { }
