import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterService } from '@services/sinister.service';
import { SinisterTypeService } from '@services/sinister-type.service';

import { ModalCreateSinisterComponent } from './modal-create-sinister.component';
import { ModalCreateSinisterService } from './modal-create-sinister.service';

@NgModule({
  declarations: [ModalCreateSinisterComponent],
  exports: [ModalCreateSinisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ModalCreateSinisterService, SinisterService, SinisterTypeService]
})
export class ModalCreateSinisterModule { }
