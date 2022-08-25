import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterService } from '@services/sinister.service';

import { ModalUpdateSinisterComponent } from './modal-update-sinister.component';
import { ModalUpdateSinisterService } from './modal-update-sinister.service';

@NgModule({
  declarations: [ModalUpdateSinisterComponent],
  exports: [ModalUpdateSinisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      ModalUpdateSinisterService,
      SinisterService
  ]
})
export class ModalUpdateSinisterModule { }
