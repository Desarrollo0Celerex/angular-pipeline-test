import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { FileUploaderModule } from '@components/file-uploader/file-uploader.module';
import { ContactFileService } from '@services/contact-file.service';
import { ContactFileTypeService } from '@services/contact-file-type.service';

import { UploadContactFileRoutingModule } from './upload-contact-file-routing.module';
import { UploadContactFilePage } from './upload-contact-file.page';

@NgModule({
  declarations: [UploadContactFilePage],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    FileUploaderModule,
    FormsModule,
    ReactiveFormsModule,
    UploadContactFileRoutingModule
  ],
  providers: [ContactFileService, ContactFileTypeService]
})
export class UploadContactFileModule { }
