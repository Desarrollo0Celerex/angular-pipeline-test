import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterService } from '@services/sinister.service';
import { SinisterTypeService } from '@services/sinister-type.service';

import { ModalUpdateSinisterDetailsComponent } from './modal-update-sinister-details.component';

@NgModule({
  declarations: [
    ModalUpdateSinisterDetailsComponent
  ],
  exports: [
      ModalUpdateSinisterDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      SinisterService,
      SinisterTypeService
  ]
})
export class ModalUpdateSinisterDetailsModule { }
