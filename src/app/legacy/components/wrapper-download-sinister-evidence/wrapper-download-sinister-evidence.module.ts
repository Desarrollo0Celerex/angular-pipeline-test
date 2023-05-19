import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalDownloadFileModule } from '@components/modal-download-file/modal-download-file.module';

import { WrapperDownloadSinisterEvidenceComponent } from './wrapper-download-sinister-evidence.component';

@NgModule({
  declarations: [
    WrapperDownloadSinisterEvidenceComponent
  ],
  exports: [
      WrapperDownloadSinisterEvidenceComponent
  ],
  imports: [
    CommonModule,
    ModalDownloadFileModule
  ]
})
export class WrapperDownloadSinisterEvidenceModule { }
