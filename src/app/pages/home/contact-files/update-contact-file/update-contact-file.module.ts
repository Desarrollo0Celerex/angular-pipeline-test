import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { FileUploaderModule } from '@components/file-uploader/file-uploader.module';
import { ContactFileService } from '@services/contact-file.service';
import { ContactFileTypeService } from '@services/contact-file-type.service';

import { UpdateContactFileRoutingModule } from './update-contact-file-routing.module';
import { UpdateContactFilePage } from './update-contact-file.page';

@NgModule({
  declarations: [UpdateContactFilePage],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    FileUploaderModule,
    FormsModule,
    ReactiveFormsModule,
    UpdateContactFileRoutingModule
  ],
  providers: [ContactFileService, ContactFileTypeService]
})
export class UpdateContactFileModule { }
