import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterService } from '@services/sinister.service';

import { ModalUpdateSinisterTrackingComponent } from './modal-update-sinister-tracking.component';

@NgModule({
  declarations: [
    ModalUpdateSinisterTrackingComponent
  ],
  exports: [
      ModalUpdateSinisterTrackingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      SinisterService
  ]
})
export class ModalUpdateSinisterTrackingModule { }
