import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterEventService } from '@services/sinister-event.service';

import { ModalFinalizeSinisterEventComponent } from './modal-finalize-sinister-event.component';

@NgModule({
  declarations: [
    ModalFinalizeSinisterEventComponent
  ],
  exports: [
      ModalFinalizeSinisterEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      SinisterEventService
  ]
})
export class ModalFinalizeSinisterEventModule { }
