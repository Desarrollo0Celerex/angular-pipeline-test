import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module';
import { SinisterService } from '@services/sinister.service';

import { ButtonDownloadReportInsuranceSinistersComponent } from './button-download-report-insurance-sinisters.component';

@NgModule({
  declarations: [
    ButtonDownloadReportInsuranceSinistersComponent
  ],
  exports: [
      ButtonDownloadReportInsuranceSinistersComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      SinisterService
  ]
})
export class ButtonDownloadReportInsuranceSinistersModule { }
