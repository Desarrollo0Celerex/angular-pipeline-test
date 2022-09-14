import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module';
import { SinisterService } from '@services/sinister.service';

import { ButtonDownloadReportSinistersVehiclesComponent } from './button-download-report-sinisters-vehicles.component';

@NgModule({
  declarations: [
    ButtonDownloadReportSinistersVehiclesComponent
  ],
  exports: [
      ButtonDownloadReportSinistersVehiclesComponent
  ],
  imports: [
    CommonModule,
    ModalSelectReportFormatModule
  ],
  providers: [
      SinisterService
  ]
})
export class ButtonDownloadReportSinistersVehiclesModule { }
