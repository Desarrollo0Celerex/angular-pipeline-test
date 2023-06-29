import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploaderModule } from '@components/file-uploader/file-uploader.module';
import { SinisterEvidenceService } from '@services/sinister-evidence.service';
import { SinisterEvidenceTypeService } from '@services/sinister-evidence-type.service';

import { ModalUploadSinisterEvidenceComponent } from './modal-upload-sinister-evidence.component';

@NgModule({
    declarations: [ModalUploadSinisterEvidenceComponent],
    exports: [ModalUploadSinisterEvidenceComponent],
    imports: [
        CommonModule,
        FileUploaderModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [SinisterEvidenceService, SinisterEvidenceTypeService],
})
export class ModalUploadSinisterEvidenceModule {}
