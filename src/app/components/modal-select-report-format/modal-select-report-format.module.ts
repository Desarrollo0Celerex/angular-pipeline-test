import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatComponent } from './modal-select-report-format.component';

@NgModule({
  declarations: [
    ModalSelectReportFormatComponent
  ],
  exports: [
      ModalSelectReportFormatComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalSelectReportFormatModule { }
