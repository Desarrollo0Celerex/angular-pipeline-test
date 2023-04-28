import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalUploadSinisterEvidenceModule } from '@components/modal-upload-sinister-evidence/modal-upload-sinister-evidence.module';
import { WrapperDownloadSinisterEvidenceModule } from '@components/wrapper-download-sinister-evidence/wrapper-download-sinister-evidence.module';
import { SinisterEvidenceService } from '@services/sinister-evidence.service';

import { ModalShowSinisterEvidencesPage } from './modal-show-sinister-evidences.page';

@NgModule({
  declarations: [
    ModalShowSinisterEvidencesPage
  ],
  exports: [
    ModalShowSinisterEvidencesPage
  ],
  imports: [
    CommonModule,
    ModalUploadSinisterEvidenceModule,
    WrapperDownloadSinisterEvidenceModule
  ],
  providers: [
    SinisterEvidenceService
  ]
})
export class ModalShowSinisterEvidencesModule { }
