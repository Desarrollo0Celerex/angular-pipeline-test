import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterEventService } from '@services/sinister-event.service';
import { SinisterEventTypeService } from '@services/sinister-event-type.service';

import { ModalUpdateSinisterEventComponent } from './modal-update-sinister-event.component';
import { ModalUpdateSinisterEventService } from './modal-update-sinister-event.service';

@NgModule({
  declarations: [ModalUpdateSinisterEventComponent],
  exports: [ModalUpdateSinisterEventComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ModalUpdateSinisterEventService, SinisterEventService, SinisterEventTypeService]
})
export class ModalUpdateSinisterEventModule { }
