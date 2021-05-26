import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinisterEventService } from '@services/sinister-event.service';

import { ModalConfirmDeleteSinisterEventComponent } from './modal-confirm-delete-sinister-event.component';
import { ModalConfirmDeleteSinisterEventService } from './modal-confirm-delete-sinister-event.service';

@NgModule({
  declarations: [ModalConfirmDeleteSinisterEventComponent],
  exports: [ModalConfirmDeleteSinisterEventComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalConfirmDeleteSinisterEventService, SinisterEventService]
})
export class ModalConfirmDeleteSinisterEventModule { }
