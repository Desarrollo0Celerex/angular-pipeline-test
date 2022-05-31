import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PartnerService } from '@services/partner.service';

import { ModalUpdateGroupComponent } from './modal-update-group.component';

@NgModule({
  declarations: [
    ModalUpdateGroupComponent
  ],
  exports: [
      ModalUpdateGroupComponent
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
export class ModalUpdateGroupModule { }
