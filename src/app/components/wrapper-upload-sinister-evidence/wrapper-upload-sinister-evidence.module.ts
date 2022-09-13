import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { SinisterService } from '@services/sinister.service';

import { WrapperUploadSinisterEvidenceComponent } from './wrapper-upload-sinister-evidence.component';

@NgModule({
  declarations: [
    WrapperUploadSinisterEvidenceComponent
  ],
  exports: [
      WrapperUploadSinisterEvidenceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalSelectFileModule,
    ReactiveFormsModule
  ],
  providers: [
      SinisterService
  ]
})
export class WrapperUploadSinisterEvidenceModule { }
