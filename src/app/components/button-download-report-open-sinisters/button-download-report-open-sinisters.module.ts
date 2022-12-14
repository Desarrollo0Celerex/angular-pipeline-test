import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module';
import { SinisterService } from '@services/sinister.service';

import { ButtonDownloadReportOpenSinistersComponent } from './button-download-report-open-sinisters.component';

@NgModule({
  declarations: [
    ButtonDownloadReportOpenSinistersComponent
  ],
  exports: [
    ButtonDownloadReportOpenSinistersComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
    SinisterService
  ]
})
export class ButtonDownloadReportOpenSinistersModule { }
