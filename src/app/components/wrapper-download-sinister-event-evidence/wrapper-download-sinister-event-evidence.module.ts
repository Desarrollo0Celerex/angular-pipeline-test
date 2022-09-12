import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalDownloadFileModule } from '@components/modal-download-file/modal-download-file.module';

import { WrapperDownloadSinisterEventEvidenceComponent } from './wrapper-download-sinister-event-evidence.component';

@NgModule({
  declarations: [
    WrapperDownloadSinisterEventEvidenceComponent
  ],
  exports: [
      WrapperDownloadSinisterEventEvidenceComponent
  ],
  imports: [
    CommonModule,
    ModalDownloadFileModule
  ]
})
export class WrapperDownloadSinisterEventEvidenceModule { }
