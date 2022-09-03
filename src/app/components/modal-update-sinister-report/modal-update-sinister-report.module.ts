import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterService } from '@services/sinister.service';

import { ModalUpdateSinisterReportComponent } from './modal-update-sinister-report.component';

@NgModule({
  declarations: [ModalUpdateSinisterReportComponent],
  exports: [ModalUpdateSinisterReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      SinisterService
  ]
})
export class ModalUpdateSinisterReportModule { }
