import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PolicyService } from '@services/policy.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterTypeService } from '@services/sinister-type.service';

import { ModalCreateSinisterComponent } from './modal-create-sinister.component';

@NgModule({
  declarations: [ModalCreateSinisterComponent],
  exports: [ModalCreateSinisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      PolicyService,
      SinisterService,
      SinisterTypeService
  ]
})
export class ModalCreateSinisterModule { }
