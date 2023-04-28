import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterEvidenceService } from '@services/sinister-evidence.service';
import { SinisterEvidenceTypeService } from '@services/sinister-evidence-type.service';

import { ModalUploadSinisterEvidenceComponent } from './modal-upload-sinister-evidence.component';

@NgModule({
  declarations: [
    ModalUploadSinisterEvidenceComponent
  ],
  exports: [
    ModalUploadSinisterEvidenceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SinisterEvidenceService,
    SinisterEvidenceTypeService
  ]
})
export class ModalUploadSinisterEvidenceModule { }
